import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const usePreferencesStore = defineStore('preferences', () => {
  const soundEnabled = useStorage('cryptoflow-sound', false)
  const oracleEnabled = useStorage('cryptoflow-oracle', false)

  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
  }

  function toggleOracle() {
    oracleEnabled.value = !oracleEnabled.value
  }

  return {
    soundEnabled,
    oracleEnabled,
    toggleSound,
    toggleOracle,
  }
})
