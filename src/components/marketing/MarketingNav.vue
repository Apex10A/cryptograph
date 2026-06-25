<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import AppLogo from './AppLogo.vue'
import ThemeToggle from '../controls/ThemeToggle.vue'

const route = useRoute()

const navLinks = [
  { name: 'Features', to: '/features' },
  { name: 'About', to: '/about' },
]

</script>

<template>
  <header class="sticky top-0 z-50 border-b border-surface-border bg-surface/80 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
      <AppLogo />

      <nav class="hidden sm:flex items-center gap-8">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'text-sm font-semibold transition-colors',
            route.path === link.to ? 'text-brand' : 'text-content-muted hover:text-content',
          ]"
        >
          {{ link.name }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <ThemeToggle />
        <RouterLink
          to="/terminal"
          class="px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Launch Terminal
        </RouterLink>
      </div>
    </div>
  </header>
</template>
