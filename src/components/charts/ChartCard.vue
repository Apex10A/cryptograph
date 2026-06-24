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
  <div class="bg-surface-card p-6 rounded-xl border border-surface-border h-[400px]">
    <h2
      :class="[
        highlighted
          ? 'text-lg font-bold mb-4 flex items-center gap-2'
          : 'text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest',
      ]"
    >
      <span v-if="highlighted" class="w-2 h-2 rounded-full bg-brand" />
      {{ title }}
    </h2>
    <div class="chart-container">
      <slot />
    </div>
  </div>
</template>
