<script setup lang="ts">
import { TERMINAL_SHORTCUTS } from '../../composables/useTerminalShortcuts'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[90] flex items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <div
          class="terminal-panel w-full max-w-md p-6 shadow-2xl"
          role="dialog"
          aria-labelledby="shortcuts-title"
          aria-modal="true"
        >
          <div class="flex items-start justify-between gap-4 mb-4">
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand mb-1">
                Terminal
              </p>
              <h2 id="shortcuts-title" class="font-display text-lg font-bold text-content">
                Keyboard shortcuts
              </h2>
            </div>
            <button
              type="button"
              class="text-content-muted hover:text-content text-sm font-semibold"
              @click="emit('close')"
            >
              Esc
            </button>
          </div>

          <ul class="space-y-2">
            <li
              v-for="item in TERMINAL_SHORTCUTS"
              :key="item.keys"
              class="flex items-center justify-between gap-4 py-2 border-b border-surface-border/60 last:border-0"
            >
              <span class="text-sm text-content-muted">{{ item.action }}</span>
              <kbd
                class="px-2 py-1 rounded-md border border-surface-border bg-surface text-xs font-mono font-semibold text-content shrink-0"
              >
                {{ item.keys }}
              </kbd>
            </li>
          </ul>

          <p class="mt-4 text-[11px] text-content-muted">
            Shortcuts are disabled while typing in the activity feed filter.
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
