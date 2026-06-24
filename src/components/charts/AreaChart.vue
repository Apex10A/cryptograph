<script setup lang="ts">
import { computed, provide } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import ChartSkeleton from './ChartSkeleton.vue'
import { useDashboardStore } from '../../stores/dashboardStore'

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent
])

const store = useDashboardStore()
provide(THEME_KEY, 'dark')

const option = computed(() => {
  const selectedCoinData = store.coins.filter(c => store.selectedCoins.includes(c.id))
  
  const series = selectedCoinData.map((coin) => {
    const data = store.getFilteredChartData(coin.id)
    // Simulating Market Cap movement based on price change
    return {
      name: coin.symbol,
      type: 'line',
      stack: 'Total',
      areaStyle: { opacity: 0.1 },
      showSymbol: false,
      smooth: true,
      data: data.map(p => [p.timestamp, (p.price / coin.price) * coin.marketCap])
    }
  })

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1a1d2e',
      borderColor: '#2a2d3e',
      textStyle: { color: '#fff' }
    },
    grid: {
      top: '5%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series
  }
})
</script>

<template>
  <div class="bg-surface-card p-6 rounded-xl border border-surface-border h-[400px]">
    <h2 class="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Market Cap Trend</h2>
    <div class="chart-container">
      <ChartSkeleton v-if="store.isChartsLoading" message="Building market cap trend..." />
      <VChart v-else :option="option" autoresize />
    </div>
  </div>
</template>
