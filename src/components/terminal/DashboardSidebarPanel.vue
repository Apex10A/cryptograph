<script setup lang="ts">
import { computed } from 'vue'
import { COIN_SEEDS } from '../../config/coins'
import { useDashboardStore } from '../../stores/dashboardStore'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { useOracleMode } from '../../composables/useOracleMode'
import AppLogo from '../marketing/AppLogo.vue'
import ThemeToggle from '../controls/ThemeToggle.vue'
import PreferenceToggles from './PreferenceToggles.vue'
import CoinIcon from '../coins/CoinIcon.vue'
import {
  Squares2X2Icon,
  SparklesIcon,
  InformationCircleIcon,
  AcademicCapIcon,
} from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'

defineProps<{
  onNavigate?: () => void
}>()

const store = useDashboardStore()
const onboarding = useOnboardingStore()
const { oracleText } = useOracleMode()

const statusDotClass = computed(() => {
  switch (store.streamStatus) {
    case 'live':
      return 'bg-brand animate-pulse-brand'
    case 'reconnecting':
      return 'bg-warning animate-pulse'
    case 'error':
      return 'bg-danger'
    default:
      return 'bg-content-muted'
  }
})

function handleTourStart() {
  onboarding.startTour()
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-4 border-b border-surface-border">
      <AppLogo to="/" size="md" />
      <p class="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-content-muted">
        {{ oracleText('Command deck', 'Observatory') }}
      </p>
    </div>

    <nav class="p-3 space-y-1 border-b border-surface-border">
      <RouterLink
        to="/terminal"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-brand/10 text-brand border border-brand/25"
        @click="onNavigate?.()"
      >
        <Squares2X2Icon class="w-4 h-4" />
        {{ oracleText('Terminal', 'The Observatory') }}
      </RouterLink>
      <RouterLink
        to="/features"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-content-muted hover:text-content hover:bg-surface-hover transition-colors"
        @click="onNavigate?.()"
      >
        <SparklesIcon class="w-4 h-4" />
        Machinery
      </RouterLink>
      <RouterLink
        to="/about"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-content-muted hover:text-content hover:bg-surface-hover transition-colors"
        @click="onNavigate?.()"
      >
        <InformationCircleIcon class="w-4 h-4" />
        Origin
      </RouterLink>
    </nav>

    <div class="p-3 flex-1 overflow-y-auto">
      <p class="px-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-content-muted">
        Assets
      </p>
      <div class="flex flex-col gap-1.5">
        <button
          v-for="coin in COIN_SEEDS"
          :key="coin.id"
          @click="store.toggleCoin(coin.id)"
          :class="[
            'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold border text-left transition-all',
            store.selectedCoins.includes(coin.id)
              ? 'border-brand/40 bg-brand/10 text-brand'
              : 'border-surface-border text-content-muted hover:border-brand/25 hover:text-content',
          ]"
        >
          <CoinIcon :coin-id="coin.id" :symbol="coin.symbol" size="xs" />
          <span>
            {{ coin.symbol }}
            <span class="block text-[10px] font-normal opacity-70">{{ coin.name }}</span>
          </span>
        </button>
      </div>
    </div>

    <div class="p-3 border-t border-surface-border space-y-3">
      <div
        data-tour="stream-status"
        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-surface-border"
      >
        <span :class="['w-2 h-2 rounded-full shrink-0', statusDotClass]" />
        <span class="text-[10px] font-semibold uppercase tracking-widest text-content-muted">
          {{ store.streamStatus }}
        </span>
      </div>

      <PreferenceToggles />

      <div class="flex items-center justify-between gap-2">
        <ThemeToggle />
        <button
          type="button"
          @click="handleTourStart"
          class="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-surface-border text-[10px] font-semibold uppercase tracking-wider text-content-muted hover:text-brand hover:border-brand/30 transition-colors"
          title="Restart tour"
        >
          <AcademicCapIcon class="w-4 h-4" />
          Tour
        </button>
      </div>
    </div>
  </div>
</template>
