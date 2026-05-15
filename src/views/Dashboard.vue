<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import { useDataStream } from '../composables/useDataStream'
import MetricCard from '../components/cards/MetricCard.vue'
import LineChart from '../components/charts/LineChart.vue'
import AreaChart from '../components/charts/AreaChart.vue'
import BarChart from '../components/charts/BarChart.vue'
import CandlestickChart from '../components/charts/CandlestickChart.vue'
import ActivityFeed from '../components/feed/ActivityFeed.vue'
import DashboardControls from '../components/controls/DashboardControls.vue'
import ThemeToggle from '../components/controls/ThemeToggle.vue'

const store = useDashboardStore()
const { start } = useDataStream()

onMounted(() => {
  // Initialize theme
  if (store.isDarkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  start()
})
</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300">
    <!-- Top Bar -->
    <header class="h-16 flex items-center justify-between px-6 bg-surface-card border-b border-surface-border sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand text-black font-black italic">CF</div>
        <h1 class="text-xl font-black tracking-tighter">CRYPTO<span class="text-brand">FLOW</span></h1>
        <div class="flex items-center gap-2 ml-4 px-2 py-1 rounded-full bg-surface border border-surface-border">
          <span :class="['w-2 h-2 rounded-full', store.streamStatus === 'live' ? 'bg-brand animate-pulse' : 'bg-gray-500']"></span>
          <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {{ store.streamStatus }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>

    <!-- Controls Bar -->
    <DashboardControls />

    <!-- Main Content -->
    <main class="flex-1 p-6 space-y-6">
      <!-- Row 1: Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-2 sm:pb-0">
        <MetricCard
          v-for="coin in store.coins"
          :key="coin.id"
          :coin="coin"
        />
      </div>

      <!-- Row 2: Large Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div class="lg:col-span-7">
          <LineChart />
        </div>
        <div class="lg:col-span-3">
          <AreaChart />
        </div>
      </div>

      <!-- Row 3: Secondary Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart />
        <CandlestickChart />
      </div>

      <!-- Row 4: Feed -->
      <ActivityFeed />
    </main>
  </div>
</template>

<style scoped>
.fade-in-enter-active {
  transition: opacity 0.5s ease;
}
.fade-in-enter-from {
  opacity: 0;
}
</style>
