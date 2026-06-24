<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../../stores/dashboardStore'
import type { CoinData } from '../../types'

const props = defineProps<{
  coin: CoinData
}>()

const store = useDashboardStore()

const isSelected = computed(() => store.selectedCoins.includes(props.coin.id))
const isPositive = computed(() => props.coin.change24h >= 0)

const formatNumber = (num: number, digits: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(num)
}

const pricePoints = computed(() => {
  return store.getFilteredChartData(props.coin.id).slice(-20)
})

const sparklinePoints = computed(() => {
  if (pricePoints.value.length < 2) return ''
  const prices = pricePoints.value.map(p => p.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1
  
  const width = 100
  const height = 30
  
  return prices.map((p, i) => {
    const x = (i / (prices.length - 1)) * width
    const y = height - ((p - min) / range) * height
    return `${x},${y}`
  }).join(' ')
})
</script>

<template>
  <div
    @click="store.toggleCoin(coin.id)"
    :class="[
      'relative overflow-hidden cursor-pointer p-4 rounded-xl transition-all duration-300 border-2',
      isSelected ? 'border-brand bg-brand bg-opacity-5 shadow-[0_0_15px_rgba(0,255,136,0.2)]' : 'border-surface-border bg-surface-card hover:bg-surface-hover hover:border-gray-600'
    ]"
  >
    <div class="flex justify-between items-start mb-2">
      <div>
        <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wider">{{ coin.symbol }}</h3>
        <p class="text-xl font-bold animate-number-tick">${{ formatNumber(coin.price, coin.price < 1 ? 4 : 2) }}</p>
      </div>
      <div :class="['text-sm font-bold', isPositive ? 'text-brand' : 'text-danger']">
        {{ isPositive ? '+' : '' }}{{ formatNumber(coin.changePercent24h) }}%
      </div>
    </div>

    <div class="flex items-end justify-between gap-4">
      <div class="text-[10px] text-gray-500">
        <p>VOL: ${{ (coin.volume / 1e9).toFixed(1) }}B</p>
        <p>MCAP: ${{ (coin.marketCap / 1e9).toFixed(1) }}B</p>
      </div>
      
      <!-- Sparkline -->
      <div class="w-24 h-8">
        <svg v-if="sparklinePoints" viewBox="0 0 100 30" class="w-full h-full">
          <polyline
            fill="none"
            :stroke="isPositive ? '#00ff88' : '#ff4d4d'"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :points="sparklinePoints"
          />
        </svg>
      </div>
    </div>

    <!-- Live Dot -->
    <div v-if="isSelected && store.streamStatus === 'live'" class="absolute top-2 right-2">
      <div class="w-2 h-2 rounded-full bg-brand animate-pulse-green"></div>
    </div>
  </div>
</template>
