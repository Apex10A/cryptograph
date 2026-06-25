<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MarketingLayout from '../layouts/MarketingLayout.vue'
</script>

<template>
  <MarketingLayout>
    <section class="max-w-2xl mx-auto px-6 py-24 text-center">
      <p class="font-mono text-6xl font-bold text-brand/30 mb-4">404</p>
      <h1 class="text-2xl font-bold text-content mb-2">Market not found</h1>
      <p class="text-content-muted mb-8">
        This page doesn't exist — maybe the pair delisted, or you mistyped the route.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink
          to="/"
          class="px-6 py-3 rounded-xl bg-brand text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </RouterLink>
        <RouterLink
          to="/terminal"
          class="px-6 py-3 rounded-xl border border-surface-border text-content font-semibold hover:bg-surface-hover transition-colors"
        >
          Launch Terminal
        </RouterLink>
      </div>
    </section>
  </MarketingLayout>
</template>
