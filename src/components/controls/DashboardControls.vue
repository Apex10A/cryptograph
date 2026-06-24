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
    <!-- Stream Controls -->
    <div class="flex items-center gap-2">
      <button
        @click="toggleStream"
        :class="[
          'px-4 py-2 rounded-md font-bold transition-all',
          isStreamActive() ? 'bg-danger text-white hover:bg-red-600' : 'bg-brand text-black hover:bg-opacity-80'
        ]"
      >
        {{ isStreamActive() ? 'PAUSE STREAM' : 'RESUME STREAM' }}
      </button>
      <button
        @click="resetView"
        class="px-4 py-2 rounded-md bg-surface-border text-white hover:bg-surface-hover transition-all"
      >
        RESET VIEW
      </button>
    </div>

    <!-- Time Range Selector -->
    <div class="flex items-center bg-surface p-1 rounded-lg border border-surface-border">
      <button
        v-for="range in timeRanges"
        :key="range"
        @click="store.setTimeRange(range)"
        :class="[
          'px-3 py-1 rounded-md text-sm font-medium transition-all',
          store.timeRange === range ? 'bg-brand text-black' : 'text-gray-400 hover:text-white'
        ]"
      >
        {{ range }}
      </button>
    </div>

    <!-- Coin Filter -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="coin in COIN_OPTIONS"
        :key="coin.id"
        @click="store.toggleCoin(coin.id)"
        :class="[
          'px-3 py-1 rounded-md text-xs font-bold border transition-all',
          store.selectedCoins.includes(coin.id)
            ? 'border-brand bg-brand bg-opacity-10 text-brand'
            : 'border-surface-border text-gray-500 hover:border-gray-400'
        ]"
      >
        {{ coin.symbol }}
      </button>
    </div>
  </div>
</template>
