<script setup lang="ts">
import MarketingNav from '../components/marketing/MarketingNav.vue'
import MarketingFooter from '../components/marketing/MarketingFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface text-content transition-colors duration-300 app-grain relative">
    <MarketingNav />
    <main class="flex-1">
      <slot />
    </main>
    <MarketingFooter />
  </div>
</template>
