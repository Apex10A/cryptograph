import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export interface TourStep {
  id: string
  selector: string
  title: string
  body: string
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'stream',
    selector: '[data-tour="stream-status"]',
    title: 'Live pulse',
    body: 'This badge shows whether Binance trades are flowing in. Green means the stream is alive.',
  },
  {
    id: 'metrics',
    selector: '[data-tour="metrics"]',
    title: 'Asset radar',
    body: 'Tap any card to include or exclude a coin from your charts. Selected coins glow violet.',
  },
  {
    id: 'controls',
    selector: '[data-tour="controls"]',
    title: 'Time & stream',
    body: 'Pause the feed, reset your view, or switch chart timeframes from here.',
  },
  {
    id: 'charts',
    selector: '[data-tour="charts"]',
    title: 'Chart constellation',
    body: 'Line, area, bar, and candlestick views all react to your coin selection and timeframe.',
  },
  {
    id: 'feed',
    selector: '[data-tour="feed"]',
    title: 'Trade whispers',
    body: 'Large Binance trades ($25k+) land here in real time. Filter by coin or type.',
  },
]

export const useOnboardingStore = defineStore('onboarding', () => {
  const completed = useStorage('cryptoflow-onboarding-done', false)
  const active = ref(false)
  const stepIndex = ref(0)

  const currentStep = computed(() => TOUR_STEPS[stepIndex.value])
  const isLastStep = computed(() => stepIndex.value >= TOUR_STEPS.length - 1)

  function startTour() {
    stepIndex.value = 0
    active.value = true
  }

  function next() {
    if (isLastStep.value) {
      finish()
    } else {
      stepIndex.value += 1
    }
  }

  function skip() {
    finish()
  }

  function finish() {
    active.value = false
    completed.value = true
  }

  function maybeAutoStart() {
    if (!completed.value) {
      setTimeout(() => {
        active.value = true
      }, 800)
    }
  }

  return {
    steps: TOUR_STEPS,
    completed,
    active,
    stepIndex,
    currentStep,
    isLastStep,
    startTour,
    next,
    skip,
    maybeAutoStart,
  }
})
