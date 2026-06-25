<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    highlighted?: boolean
  }>(),
  { highlighted: false },
)
</script>

<template>
  <div class="terminal-panel p-5 h-full min-h-[400px] flex flex-col">
    <h2
      :class="[
        highlighted
          ? 'text-sm font-display font-bold mb-3 flex items-center gap-2 text-content'
          : 'text-[10px] font-semibold text-content-muted mb-3 uppercase tracking-[0.15em]',
      ]"
    >
      <span v-if="highlighted" class="w-2 h-2 rounded-full bg-brand animate-pulse-brand" />
      {{ title }}
    </h2>
    <div class="chart-container flex-1">
      <slot />
    </div>
  </div>
</template>
