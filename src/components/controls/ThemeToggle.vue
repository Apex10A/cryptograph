<script setup lang="ts">
import { useDashboardStore } from '../../stores/dashboardStore'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const store = useDashboardStore()
</script>

<template>
  <button
    @click="store.toggleDarkMode()"
    class="p-2 rounded-lg bg-surface-card border border-surface-border hover:bg-surface-hover transition-all duration-300"
    aria-label="Toggle theme"
  >
    <SunIcon v-if="store.isDarkMode" class="w-5 h-5 text-yellow-400" />
    <MoonIcon v-else class="w-5 h-5 text-indigo-400" />
  </button>
</template>
