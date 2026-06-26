<script setup lang="ts">
import { DEFAULT_COIN_IDS } from '../../config/coins'
import { useDashboardStore } from '../../stores/dashboardStore'
import { useOracleMode } from '../../composables/useOracleMode'
import type { TimeRange } from '../../types'
import ThemeToggle from '../controls/ThemeToggle.vue'
import AppLogo from '../marketing/AppLogo.vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon } from '@heroicons/vue/24/outline'

defineProps<{
  onOpenNav?: () => void
  onOpenShortcuts?: () => void
}>()

const store = useDashboardStore()
const { oracleText } = useOracleMode()

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
  <header
    class="shrink-0 border-b border-surface-border marketing-card-glass backdrop-blur-md sticky top-0 z-40"
  >
    <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-5">
      <div class="flex items-center gap-3 min-w-0">
        <button
          type="button"
          class="lg:hidden p-2 rounded-lg border border-surface-border text-content-muted hover:text-brand hover:border-brand/30 transition-colors shrink-0"
          aria-label="Open navigation"
          @click="onOpenNav?.()"
        >
          <Bars3Icon class="w-5 h-5" />
        </button>

        <AppLogo to="/" size="sm" class="lg:hidden shrink-0" />

        <div class="min-w-0">
          <h1 class="font-display text-lg font-bold text-content truncate">
            {{ oracleText('Terminal', 'The Observatory') }}
          </h1>
          <p v-if="store.pricesError" class="text-[10px] text-warning font-semibold truncate">
            {{ store.pricesError }}
          </p>
        </div>

        <div
          data-tour="stream-status"
          class="lg:hidden flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface border border-surface-border shrink-0"
        >
          <span
            :class="[
              'w-2 h-2 rounded-full',
              store.streamStatus === 'live'
                ? 'bg-brand animate-pulse-brand'
                : store.streamStatus === 'reconnecting'
                  ? 'bg-warning animate-pulse'
                  : store.streamStatus === 'error'
                    ? 'bg-danger'
                    : 'bg-content-muted',
            ]"
          />
          <span class="text-[10px] font-semibold uppercase tracking-widest text-content-muted">
            {{ store.streamStatus }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          class="p-2 rounded-lg border border-surface-border text-content-muted hover:text-brand hover:border-brand/30 transition-colors text-xs font-mono font-bold"
          title="Keyboard shortcuts"
          @click="onOpenShortcuts?.()"
        >
          ?
        </button>
        <RouterLink
          to="/features"
          class="text-xs font-semibold text-content-muted hover:text-brand transition-colors"
        >
          Features
        </RouterLink>
        <ThemeToggle />
      </div>
    </div>

    <div
      data-tour="controls"
      class="flex flex-wrap items-center justify-between gap-3 px-4 pb-3 lg:px-5 border-t border-surface-border/60 pt-3"
    >
      <div class="flex items-center gap-2">
        <button
          @click="toggleStream"
          :class="[
            'px-3 py-1.5 rounded-lg font-semibold text-xs transition-all',
            isStreamActive()
              ? 'bg-danger text-white hover:opacity-90'
              : 'bg-brand text-white hover:opacity-90 glow-ring',
          ]"
        >
          {{ oracleText(isStreamActive() ? 'PAUSE STREAM' : 'RESUME STREAM') }}
        </button>
        <button
          @click="resetView"
          class="px-3 py-1.5 rounded-lg bg-surface-hover border border-surface-border text-content hover:bg-surface transition-all text-xs font-semibold"
        >
          {{ oracleText('RESET VIEW') }}
        </button>
        <button
          type="button"
          class="px-2.5 py-1.5 rounded-lg border border-surface-border text-content-muted hover:text-brand hover:border-brand/30 transition-colors text-xs font-mono font-bold"
          title="Keyboard shortcuts (?)"
          @click="onOpenShortcuts?.()"
        >
          ?
        </button>
      </div>

      <div class="flex items-center bg-surface p-1 rounded-lg border border-surface-border">
        <button
          v-for="range in timeRanges"
          :key="range"
          @click="store.setTimeRange(range)"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition-all',
            store.timeRange === range
              ? 'bg-brand text-white glow-ring'
              : 'text-content-muted hover:text-content',
          ]"
        >
          {{ range }}
        </button>
      </div>
    </div>
  </header>
</template>
