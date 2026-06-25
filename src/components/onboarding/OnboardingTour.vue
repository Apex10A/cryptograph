<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useOnboardingStore } from '../../stores/onboardingStore'

const onboarding = useOnboardingStore()
const { active, currentStep, stepIndex, steps, isLastStep } = storeToRefs(onboarding)

const spotlightStyle = ref<Record<string, string>>({})
const tooltipStyle = ref<Record<string, string>>({})

function updatePositions() {
  if (!active.value || !currentStep.value) return

  const el = document.querySelector(currentStep.value.selector)
  if (!el) return

  const rect = el.getBoundingClientRect()
  const padding = 8

  spotlightStyle.value = {
    position: 'fixed',
    top: `${rect.top - padding}px`,
    left: `${rect.left - padding}px`,
    width: `${rect.width + padding * 2}px`,
    height: `${rect.height + padding * 2}px`,
    zIndex: '60',
    pointerEvents: 'none',
  }

  const tooltipTop = rect.bottom + 16
  const fitsBelow = tooltipTop + 160 < window.innerHeight

  tooltipStyle.value = {
    position: 'fixed',
    left: `${Math.min(Math.max(rect.left, 16), window.innerWidth - 320)}px`,
    top: fitsBelow ? `${tooltipTop}px` : `${rect.top - 160}px`,
    zIndex: '70',
    width: 'min(300px, calc(100vw - 32px))',
  }
}

watch([active, stepIndex], async () => {
  if (!active.value) return
  await nextTick()
  updatePositions()
})

onMounted(() => {
  window.addEventListener('resize', updatePositions)
  window.addEventListener('scroll', updatePositions, true)
  if (active.value) updatePositions()
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePositions)
  window.removeEventListener('scroll', updatePositions, true)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="active" class="fixed inset-0 z-[55]">
      <div class="onboarding-spotlight" :style="spotlightStyle" />

      <div class="terminal-panel p-4 shadow-xl" :style="tooltipStyle">
        <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand mb-1">
          Step {{ stepIndex + 1 }} / {{ steps.length }}
        </p>
        <h3 class="font-display font-bold text-content">{{ currentStep?.title }}</h3>
        <p class="mt-2 text-sm text-content-muted leading-relaxed">{{ currentStep?.body }}</p>

        <div class="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            @click="onboarding.skip"
            class="text-xs font-semibold text-content-muted hover:text-content transition-colors"
          >
            Skip tour
          </button>
          <button
            type="button"
            @click="onboarding.next"
            class="px-4 py-2 rounded-full bg-brand text-white text-xs font-semibold hover:opacity-90 glow-ring"
          >
            {{ isLastStep ? 'Done' : 'Next' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
