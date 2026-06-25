<script setup lang="ts">
import { useMarketTicker } from '../../composables/useMarketTicker'

const { coins, isLoading } = useMarketTicker()

const formatPrice = (price: number) => {
  const digits = price < 1 ? 4 : 2
  return price.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })
}
</script>

<template>
  <div class="border-y border-surface-border bg-surface-card/50 overflow-hidden">
    <div v-if="isLoading" class="py-3 text-center text-xs text-content-muted uppercase tracking-widest">
      Loading live prices…
    </div>
    <div v-else class="relative flex overflow-hidden py-3">
      <div class="marketing-ticker-track flex shrink-0 items-center gap-10 px-6">
        <template v-for="repeat in 2" :key="repeat">
          <div
            v-for="coin in coins"
            :key="`${repeat}-${coin.id}`"
            class="flex items-center gap-3 shrink-0 font-mono text-sm"
          >
            <span class="font-semibold text-content">{{ coin.symbol }}</span>
            <span class="text-content-muted">${{ formatPrice(coin.price) }}</span>
            <span :class="coin.changePercent24h >= 0 ? 'text-up' : 'text-down'">
              {{ coin.changePercent24h >= 0 ? '+' : '' }}{{ coin.changePercent24h.toFixed(2) }}%
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
