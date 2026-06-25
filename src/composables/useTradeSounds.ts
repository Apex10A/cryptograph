import { watch } from 'vue'
import { usePreferencesStore } from '../stores/preferencesStore'
import { useDashboardStore } from '../stores/dashboardStore'
import type { TradeEvent } from '../types'

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

export async function unlockAudio() {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }
}

export function playTradeSound(severity: TradeEvent['severity']) {
  const prefs = usePreferencesStore()
  if (!prefs.soundEnabled) return

  const ctx = getAudioContext()
  if (ctx.state === 'suspended') return

  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  const frequency = severity === 'high' ? 880 : severity === 'medium' ? 660 : 520
  const duration = severity === 'high' ? 0.18 : 0.12
  const volume = severity === 'high' ? 0.1 : 0.06

  oscillator.type = 'sine'
  oscillator.frequency.value = frequency
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start()
  oscillator.stop(ctx.currentTime + duration + 0.02)
}

export function useTradeSoundWatcher() {
  const store = useDashboardStore()
  let lastTradeId = ''

  watch(
    () => store.activityFeed[0]?.id,
    (id) => {
      if (!id || id === lastTradeId) return
      lastTradeId = id
      const trade = store.activityFeed[0]
      if (trade && trade.severity !== 'low') {
        playTradeSound(trade.severity)
      }
    },
  )
}
