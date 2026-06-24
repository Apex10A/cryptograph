<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useAppTheme } from '../../composables/useAppTheme'

const { isDark, toggleTheme } = useAppTheme()
</script>

<template>
  <button
    @click="toggleTheme()"
    class="p-2 rounded-lg bg-surface-card border border-surface-border hover:bg-surface-hover transition-all duration-300"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <SunIcon v-if="isDark" class="w-5 h-5 text-warning" />
    <MoonIcon v-else class="w-5 h-5 text-brand" />
  </button>
</template>
