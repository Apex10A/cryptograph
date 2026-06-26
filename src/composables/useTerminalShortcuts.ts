import { ref, onMounted, onUnmounted } from 'vue'
import { COIN_SEEDS, DEFAULT_COIN_IDS } from '../config/coins'
import { useDashboardStore } from '../stores/dashboardStore'

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable
}

export const TERMINAL_SHORTCUTS = [
  { keys: '1 – 6', action: 'Toggle coin on charts' },
  { keys: 'Space', action: 'Pause / resume live stream' },
  { keys: 'R', action: 'Reset view (coins + 5m timeframe)' },
  { keys: '?', action: 'Show / hide this shortcut list' },
  { keys: 'Esc', action: 'Close shortcut list' },
] as const

export function useTerminalShortcuts() {
  const store = useDashboardStore()
  const shortcutsOpen = ref(false)

  function resetView() {
    store.selectedCoins = [...DEFAULT_COIN_IDS]
    store.setTimeRange('5m')
  }

  function toggleCoinByIndex(index: number) {
    const coin = COIN_SEEDS[index]
    if (coin) store.toggleCoin(coin.id)
  }

  function handleKeydown(event: KeyboardEvent) {
    if (isTypingTarget(event.target)) return

    if (event.key === '?' || (event.key === '/' && event.shiftKey)) {
      event.preventDefault()
      shortcutsOpen.value = !shortcutsOpen.value
      return
    }

    if (event.key === 'Escape' && shortcutsOpen.value) {
      shortcutsOpen.value = false
      return
    }

    if (shortcutsOpen.value) return

    if (event.key === ' ') {
      event.preventDefault()
      store.toggleStream()
      return
    }

    if (event.key === 'r' || event.key === 'R') {
      if (!event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        resetView()
      }
      return
    }

    const digit = Number.parseInt(event.key, 10)
    if (digit >= 1 && digit <= COIN_SEEDS.length && !event.metaKey && !event.ctrlKey) {
      event.preventDefault()
      toggleCoinByIndex(digit - 1)
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  return { shortcutsOpen }
}
