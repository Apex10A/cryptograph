import { computed } from 'vue'
import { useAppTheme } from './useAppTheme'
import { usePreferencesStore } from '../stores/preferencesStore'
import { ORACLE_LABELS } from '../data/oracleLines'

export function useOracleMode() {
  const { isDark } = useAppTheme()
  const prefs = usePreferencesStore()

  const isNight = computed(() => {
    const hour = new Date().getHours()
    return hour >= 22 || hour < 6
  })

  const isOracleActive = computed(
    () => isDark.value && (prefs.oracleEnabled || isNight.value),
  )

  function oracleText(normal: string, oracle?: string): string {
    if (!isOracleActive.value) return normal
    return oracle ?? ORACLE_LABELS[normal] ?? normal
  }

  return {
    isOracleActive,
    isNight,
    oracleEnabled: computed(() => prefs.oracleEnabled),
    toggleOracle: prefs.toggleOracle,
    oracleText,
  }
}
