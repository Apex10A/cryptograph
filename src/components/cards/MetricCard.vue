<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useDashboardStore } from '../../stores/dashboardStore'
import { usePriceTickFlash } from '../../composables/usePriceTickFlash'
import CoinIcon from '../coins/CoinIcon.vue'
import type { CoinData } from '../../types'

const props = defineProps<{
  coin: CoinData
}>()

const store = useDashboardStore()

const isSelected = computed(() => store.selectedCoins.includes(props.coin.id))
const isPositive = computed(() => props.coin.change24h >= 0)
const streamLive = computed(
  () => store.streamStatus === 'live' || store.streamStatus === 'reconnecting',
)

const { tickDirection } = usePriceTickFlash(toRef(props.coin, 'price'), streamLive)

const formatNumber = (num: number, digits: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(num)
}

const pricePoints = computed(() => store.getFilteredChartData(props.coin.id).slice(-20))

const sparklinePoints = computed(() => {
  if (pricePoints.value.length < 2) return ''
  const prices = pricePoints.value.map((p) => p.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1

  const width = 100
  const height = 30

  return prices
    .map((p, i) => {
      const x = (i / (prices.length - 1)) * width
      const y = height - ((p - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')
})
</script>

<template>
  <div
    @click="store.toggleCoin(coin.id)"
    :class="[
      'relative overflow-hidden cursor-pointer p-4 rounded-xl transition-all duration-300 border',
      isSelected
        ? 'border-brand/40 bg-brand/8 ring-1 ring-brand/25'
        : 'border-surface-border bg-surface-card/80 marketing-card-glass hover:border-brand/25 hover:bg-surface-hover',
      tickDirection === 'up' ? 'price-tick-up' : '',
      tickDirection === 'down' ? 'price-tick-down' : '',
    ]"
  >
    <div class="flex justify-between items-start mb-2 gap-2">
      <div class="flex items-start gap-2.5 min-w-0">
        <CoinIcon :coin-id="coin.id" :symbol="coin.symbol" size="sm" />
        <div class="min-w-0">
          <h3 class="text-content-muted text-xs font-semibold uppercase tracking-[0.15em]">
            {{ coin.symbol }}
          </h3>
          <p
            :class="[
              'text-xl font-mono font-bold text-content',
              store.isLoadingPrices ? 'text-content-muted animate-pulse' : '',
              tickDirection === 'up' ? 'text-up' : '',
              tickDirection === 'down' ? 'text-down' : '',
            ]"
          >
            ${{ formatNumber(coin.price, coin.price < 1 ? 4 : 2) }}
          </p>
        </div>
      </div>
      <div :class="['text-sm font-mono font-semibold shrink-0', isPositive ? 'text-up' : 'text-down']">
        {{ isPositive ? '+' : '' }}{{ formatNumber(coin.changePercent24h) }}%
      </div>
    </div>

    <div class="flex items-end justify-between gap-4">
      <div class="text-[10px] text-content-muted font-mono">
        <p>VOL: ${{ (coin.volume / 1e9).toFixed(1) }}B</p>
        <p>MCAP: ${{ (coin.marketCap / 1e9).toFixed(1) }}B</p>
      </div>

      <div class="w-24 h-8">
        <svg v-if="sparklinePoints" viewBox="0 0 100 30" class="w-full h-full">
          <polyline
            fill="none"
            :stroke="isPositive ? 'var(--cf-up)' : 'var(--cf-down)'"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :points="sparklinePoints"
          />
        </svg>
      </div>
    </div>

    <div v-if="isSelected && store.streamStatus === 'live'" class="absolute top-2 right-2">
      <div class="w-2 h-2 rounded-full bg-brand animate-pulse-brand" />
    </div>
  </div>
</template>
