<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { ORACLE_WHISPERS } from '../../data/oracleLines'
import { useOracleMode } from '../../composables/useOracleMode'

const { isOracleActive } = useOracleMode()

const whisper = ref(ORACLE_WHISPERS[0])
let intervalId: ReturnType<typeof setInterval> | null = null

function pickWhisper() {
  const index = Math.floor(Math.random() * ORACLE_WHISPERS.length)
  whisper.value = ORACLE_WHISPERS[index] ?? ORACLE_WHISPERS[0]
}

onMounted(() => {
  pickWhisper()
  intervalId = setInterval(pickWhisper, 12000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

watch(isOracleActive, (active) => {
  if (active) pickWhisper()
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOracleActive"
      class="oracle-whisper fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-lg px-5 py-3 rounded-full border border-brand/30 marketing-card-glass pointer-events-none"
    >
      <p class="text-center text-xs font-medium text-content-muted italic">
        “{{ whisper }}”
      </p>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
