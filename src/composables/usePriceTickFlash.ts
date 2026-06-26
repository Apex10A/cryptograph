import { ref, watch, type Ref } from 'vue'

export type PriceTickDirection = 'up' | 'down' | null

export function usePriceTickFlash(price: Ref<number>, streamLive: Ref<boolean>) {
  const tickDirection = ref<PriceTickDirection>(null)
  let resetTimer: ReturnType<typeof setTimeout> | null = null

  watch(price, (next, prev) => {
    if (!streamLive.value || prev === next) return

    tickDirection.value = next > prev ? 'up' : 'down'

    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      tickDirection.value = null
    }, 450)
  })

  return { tickDirection }
}
