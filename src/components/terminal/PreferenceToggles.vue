<script setup lang="ts">
import { computed } from 'vue'
import { SpeakerWaveIcon, SpeakerXMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { usePreferencesStore } from '../../stores/preferencesStore'
import { useOracleMode } from '../../composables/useOracleMode'
import { unlockAudio } from '../../composables/useTradeSounds'

const prefs = usePreferencesStore()
const { isOracleActive, isNight, oracleEnabled } = useOracleMode()

const soundLabel = computed(() => (prefs.soundEnabled ? 'Sounds on' : 'Sounds off'))
const oracleLabel = computed(() => {
  if (!oracleEnabled.value && isNight.value) return 'Oracle (night)'
  return isOracleActive.value ? 'Oracle on' : 'Oracle off'
})

async function onToggleSound() {
  prefs.toggleSound()
  if (prefs.soundEnabled) {
    await unlockAudio()
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      @click="onToggleSound"
      :class="[
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold uppercase tracking-wider transition-colors',
        prefs.soundEnabled
          ? 'border-brand/40 bg-brand/10 text-brand'
          : 'border-surface-border text-content-muted hover:border-brand/25',
      ]"
      :title="soundLabel"
    >
      <SpeakerWaveIcon v-if="prefs.soundEnabled" class="w-3.5 h-3.5" />
      <SpeakerXMarkIcon v-else class="w-3.5 h-3.5" />
      Sound
    </button>

    <button
      type="button"
      @click="prefs.toggleOracle()"
      :class="[
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold uppercase tracking-wider transition-colors',
        isOracleActive
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-surface-border text-content-muted hover:border-accent/25',
      ]"
      :title="oracleLabel"
    >
      <EyeIcon v-if="isOracleActive" class="w-3.5 h-3.5" />
      <EyeSlashIcon v-else class="w-3.5 h-3.5" />
      Oracle
    </button>
  </div>
</template>
