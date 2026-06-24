<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import MetricCard from '../components/cards/MetricCard.vue'
import LineChart from '../components/charts/LineChart.vue'
import AreaChart from '../components/charts/AreaChart.vue'
import BarChart from '../components/charts/BarChart.vue'
import CandlestickChart from '../components/charts/CandlestickChart.vue'
import ActivityFeed from '../components/feed/ActivityFeed.vue'
import DashboardControls from '../components/controls/DashboardControls.vue'
import ThemeToggle from '../components/controls/ThemeToggle.vue'

const store = useDashboardStore()

onMounted(async () => {
  if (store.isDarkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  await store.loadInitialPrices()
  store.startStream()
})

onUnmounted(() => {
  store.stopStream()
})
</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300">
    <header class="h-16 flex items-center justify-between px-6 bg-surface-card border-b border-surface-border sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-black tracking-tighter">CRYPTO<span class="text-brand">FLOW</span></h1>
        <p v-if="store.pricesError" class="text-[10px] text-warning font-bold uppercase tracking-wider">
          {{ store.pricesError }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>

    <DashboardControls />

    <main class="flex-1 p-6 space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-2 sm:pb-0">
        <MetricCard
          v-for="coin in store.coins"
          :key="coin.id"
          :coin="coin"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div class="lg:col-span-7">
          <LineChart />
        </div>
        <div class="lg:col-span-3">
          <AreaChart />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart />
        <CandlestickChart />
      </div>

      <ActivityFeed />
    </main>
  </div>
</template>
