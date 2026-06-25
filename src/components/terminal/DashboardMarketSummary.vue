<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../../stores/dashboardStore'
import { formatCompactUsd } from '../../utils/format'

const store = useDashboardStore()

const selectedCoins = computed(() =>
  store.coins.filter((coin) => store.selectedCoins.includes(coin.id)),
)

const totalMarketCap = computed(() =>
  selectedCoins.value.reduce((sum, coin) => sum + coin.marketCap, 0),
)

const avgChange = computed(() => {
  if (selectedCoins.value.length === 0) return 0
  const total = selectedCoins.value.reduce((sum, coin) => sum + coin.changePercent24h, 0)
  return total / selectedCoins.value.length
})
</script>

<template>
  <div class="terminal-panel p-4 flex flex-col gap-3">
    <h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-content-muted">
      Selection pulse
    </h2>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <p class="text-[10px] text-content-muted uppercase tracking-wider">Watching</p>
        <p class="text-lg font-mono font-bold text-content">{{ selectedCoins.length }}</p>
      </div>
      <div>
        <p class="text-[10px] text-content-muted uppercase tracking-wider">Avg 24h</p>
        <p
          :class="[
            'text-lg font-mono font-bold',
            avgChange >= 0 ? 'text-up' : 'text-down',
          ]"
        >
          {{ avgChange >= 0 ? '+' : '' }}{{ avgChange.toFixed(2) }}%
        </p>
      </div>
    </div>

    <div>
      <p class="text-[10px] text-content-muted uppercase tracking-wider">Combined mcap</p>
      <p class="text-sm font-mono font-semibold text-content">{{ formatCompactUsd(totalMarketCap) }}</p>
    </div>

    <p class="text-[10px] text-content-muted leading-relaxed">
      Window: <span class="font-mono text-content">{{ store.timeRange }}</span>
      · Stream:
      <span class="font-mono text-brand">{{ store.streamStatus }}</span>
    </p>
  </div>
</template>
