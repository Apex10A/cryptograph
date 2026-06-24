<script setup lang="ts">
import { computed, provide, onMounted, onUnmounted, ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { useDashboardStore } from '../../stores/dashboardStore'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent
])

const store = useDashboardStore()
provide(THEME_KEY, 'dark')

const displayCoins = ref(store.coins)
let refreshIntervalId: number | null = null

onMounted(() => {
  refreshIntervalId = window.setInterval(() => {
    displayCoins.value = [...store.coins]
  }, 5000)
})

onUnmounted(() => {
  if (refreshIntervalId !== null) {
    clearInterval(refreshIntervalId)
    refreshIntervalId = null
  }
})

const option = computed(() => {
  const data = displayCoins.value.map(coin => ({
    value: coin.volume,
    itemStyle: {
      color: coin.change24h >= 0 ? '#00ff88' : '#ff4d4d'
    }
  }))

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#1a1d2e',
      borderColor: '#2a2d3e',
      textStyle: { color: '#fff' }
    },
    grid: {
      top: '5%',
      left: '3%',
      right: '8%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#2a2d3e' } },
      axisLabel: { 
        color: '#94a3b8',
        formatter: (value: number) => `$${(value / 1e9).toFixed(0)}B`
      }
    },
    yAxis: {
      type: 'category',
      data: displayCoins.value.map(c => c.symbol),
      axisLine: { lineStyle: { color: '#2a2d3e' } },
      axisLabel: { color: '#fff', fontWeight: 'bold' }
    },
    series: [
      {
        name: 'Volume',
        type: 'bar',
        data,
        barWidth: '60%',
        itemStyle: { borderRadius: [0, 4, 4, 0] },
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      }
    ]
  }
})
</script>

<template>
  <div class="bg-surface-card p-6 rounded-xl border border-surface-border h-[400px]">
    <h2 class="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">24h Volume Comparison</h2>
    <div class="chart-container">
      <VChart :option="option" autoresize />
    </div>
  </div>
</template>
