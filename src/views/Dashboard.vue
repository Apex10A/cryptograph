<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import { useOnboardingStore } from '../stores/onboardingStore'
import { useTradeSoundWatcher } from '../composables/useTradeSounds'
import MetricCard from '../components/cards/MetricCard.vue'
import LineChart from '../components/charts/LineChart.vue'
import AreaChart from '../components/charts/AreaChart.vue'
import BarChart from '../components/charts/BarChart.vue'
import CandlestickChart from '../components/charts/CandlestickChart.vue'
import ActivityFeed from '../components/feed/ActivityFeed.vue'
import DashboardSidebar from '../components/terminal/DashboardSidebar.vue'
import DashboardMobileDrawer from '../components/terminal/DashboardMobileDrawer.vue'
import DashboardTopBar from '../components/terminal/DashboardTopBar.vue'
import OracleWhisper from '../components/terminal/OracleWhisper.vue'
import OnboardingTour from '../components/onboarding/OnboardingTour.vue'
import DashboardMarketSummary from '../components/terminal/DashboardMarketSummary.vue'

const store = useDashboardStore()
const onboarding = useOnboardingStore()
const mobileNavOpen = ref(false)

useTradeSoundWatcher()

onMounted(async () => {
  await store.loadInitialPrices()
  store.startStream()
  onboarding.maybeAutoStart()
})

onUnmounted(() => {
  store.stopStream()
})
</script>

<template>
  <div class="min-h-screen flex transition-colors duration-300 app-grain relative bg-surface">
    <DashboardSidebar />
    <DashboardMobileDrawer :open="mobileNavOpen" @close="mobileNavOpen = false" />

    <div class="flex-1 flex flex-col min-w-0 min-h-screen">
      <DashboardTopBar @open-nav="mobileNavOpen = true" />

      <main class="dashboard-main">
        <section data-tour="metrics" class="dashboard-metrics">
          <MetricCard v-for="coin in store.coins" :key="coin.id" :coin="coin" />
        </section>

        <div class="dashboard-bento">
          <div data-tour="charts" class="dashboard-primary-chart">
            <LineChart />
          </div>

          <div class="dashboard-side-stack">
            <AreaChart />
            <DashboardMarketSummary />
          </div>

          <div class="dashboard-bar-chart">
            <BarChart />
          </div>

          <div class="dashboard-candle-chart">
            <CandlestickChart />
          </div>

          <div data-tour="feed" class="dashboard-feed">
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>

    <OracleWhisper />
    <OnboardingTour />
  </div>
</template>
