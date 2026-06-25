<script setup lang="ts">
import { COIN_OPTIONS, DEFAULT_COIN_IDS } from '../../config/coins'
import { useDashboardStore } from '../../stores/dashboardStore'
import type { TimeRange } from '../../types'

const store = useDashboardStore()

const timeRanges: TimeRange[] = ['1m', '5m', '15m', '1h', '4h', '1d']

const resetView = () => {
  store.selectedCoins = [...DEFAULT_COIN_IDS]
  store.setTimeRange('5m')
}

const isStreamActive = () =>
  store.streamStatus === 'live' || store.streamStatus === 'reconnecting'

const toggleStream = () => {
  store.toggleStream()
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface-card border-b border-surface-border">
    <div class="flex items-center gap-2">
      <button
        @click="toggleStream"
        :class="[
          'px-4 py-2 rounded-md font-semibold text-sm transition-all',
          isStreamActive()
            ? 'bg-danger text-white hover:opacity-90'
            : 'bg-brand text-white hover:opacity-90 glow-ring',
        ]"
      >
        {{ isStreamActive() ? 'PAUSE STREAM' : 'RESUME STREAM' }}
      </button>
      <button
        @click="resetView"
        class="px-4 py-2 rounded-md bg-surface-hover border border-surface-border text-content hover:bg-surface transition-all text-sm font-semibold"
      >
        RESET VIEW
      </button>
    </div>

    <div class="flex items-center bg-surface p-1 rounded-lg border border-surface-border">
      <button
        v-for="range in timeRanges"
        :key="range"
        @click="store.setTimeRange(range)"
        :class="[
          'px-3 py-1 rounded-md text-sm font-medium transition-all',
          store.timeRange === range
            ? 'bg-brand text-white glow-ring'
            : 'text-content-muted hover:text-content',
        ]"
      >
        {{ range }}
      </button>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="coin in COIN_OPTIONS"
        :key="coin.id"
        @click="store.toggleCoin(coin.id)"
        :class="[
          'px-3 py-1 rounded-md text-xs font-semibold border transition-all',
          store.selectedCoins.includes(coin.id)
            ? 'border-brand/50 bg-brand/10 text-brand'
            : 'border-surface-border text-content-muted hover:border-brand/30 hover:text-content',
        ]"
      >
        {{ coin.symbol }}
      </button>
    </div>
  </div>
</template>
