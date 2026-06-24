<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
  }>(),
  { message: 'Collecting live market data...' },
)
</script>

<template>
  <div class="animate-pulse flex flex-col gap-4 h-full min-h-[280px] justify-center">
    <p class="text-xs uppercase tracking-widest text-content-muted text-center">{{ message }}</p>
    <div class="h-3 bg-surface-border rounded w-2/5 mx-auto" />
    <div class="flex-1 bg-surface-hover rounded-lg min-h-[220px]" />
    <div class="flex gap-2 justify-center">
      <div v-for="index in 4" :key="index" class="h-2 w-10 bg-surface-border rounded" />
    </div>
  </div>
</template>
