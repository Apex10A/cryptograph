<script setup lang="ts">
import { computed, provide, shallowRef, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { useDashboardStore } from '../../stores/dashboardStore'
import { onUnmounted, ref } from 'vue'

const chartRef = ref<any>(null)

onUnmounted(() => {
  if (chartRef.value) {
    chartRef.value.dispose()
  }
})

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const store = useDashboardStore()
provide(THEME_KEY, 'dark')

const colors = ['#00ff88', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const option = computed(() => {
  const selectedCoinData = store.coins.filter(c => store.selectedCoins.includes(c.id))
  
  // Find all unique timestamps across selected coins to build a common X axis
  const allTimestamps = Array.from(new Set(
    selectedCoinData.flatMap(c => store.getFilteredChartData(c.id).map(p => p.timestamp))
  )).sort((a, b) => a - b)

  const series = selectedCoinData.map((coin, index) => {
    const data = store.getFilteredChartData(coin.id)
    return {
      name: coin.symbol,
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: { width: 2, color: colors[index % colors.length] },
      data: data.map(p => [p.timestamp, p.price])
    }
  })

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1a1d2e',
      borderColor: '#2a2d3e',
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        let res = `<div class="font-mono text-xs">${new Date(params[0].value[0]).toLocaleTimeString()}</div>`
        params.forEach((p: any) => {
          res += `<div class="flex justify-between gap-4">
            <span style="color:${p.color}">● ${p.seriesName}</span>
            <span class="font-bold">$${p.value[1].toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>`
        })
        return res
      }
    },
    legend: {
      data: selectedCoinData.map(c => c.symbol),
      textStyle: { color: '#94a3b8' },
      bottom: 0
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      axisLine: { lineStyle: { color: '#2a2d3e' } },
      axisLabel: { color: '#94a3b8' },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { 
        color: '#94a3b8',
        formatter: (value: number) => `$${value > 1000 ? (value / 1000).toFixed(0) + 'k' : value}`
      },
      splitLine: { lineStyle: { color: '#2a2d3e' } }
    },
    series
  }
})
</script>

<template>
  <div class="bg-surface-card p-6 rounded-xl border border-surface-border h-[400px]">
    <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-brand"></span>
      PRICE PERFORMANCE
    </h2>
    <div class="chart-container">
      <VChart :option="option" autoresize />
    </div>
  </div>
</template>
