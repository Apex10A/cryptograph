<script setup lang="ts">
import { computed, provide } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { CandlestickChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { useDashboardStore } from '../../stores/dashboardStore'

use([
  CanvasRenderer,
  CandlestickChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent
])

const store = useDashboardStore()
provide(THEME_KEY, 'dark')

const candleData = computed(() => {
  const primaryCoinId = store.selectedCoins[0] || 'bitcoin'
  const points = store.chartData[primaryCoinId] || []
  const candles: any[] = []
  
  // Group 10 points into 1 candle
  for (let i = 0; i < points.length; i += 10) {
    const chunk = points.slice(i, i + 10)
    if (chunk.length === 0) continue
    
    const open = chunk[0]?.price ?? 0
    const close = chunk[chunk.length - 1]?.price ?? 0
    const prices = chunk.map(p => p.price)
    const low = Math.min(...prices)
    const high = Math.max(...prices)
    const timestamp = chunk[chunk.length - 1]?.timestamp ?? Date.now()
    
    candles.push({
      time: new Date(timestamp).toLocaleTimeString(),
      values: [open, close, low, high]
    })
  }
  
  return candles
})

const option = computed(() => {
  const primaryCoin = store.coins.find(c => c.id === (store.selectedCoins[0] || 'bitcoin'))
  
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1a1d2e',
      borderColor: '#2a2d3e',
      textStyle: { color: '#fff' }
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: candleData.value.map(c => c.time),
      axisLine: { lineStyle: { color: '#2a2d3e' } },
      axisLabel: { color: '#94a3b8' }
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#2a2d3e' } },
      axisLabel: { color: '#94a3b8' }
    },
    series: [
      {
        name: primaryCoin?.symbol || 'Price',
        type: 'candlestick',
        data: candleData.value.map(c => c.values),
        itemStyle: {
          color: '#00ff88',
          color0: '#ff4d4d',
          borderColor: '#00ff88',
          borderColor0: '#ff4d4d'
        }
      }
    ]
  }
})
</script>

<template>
  <div class="bg-surface-card p-6 rounded-xl border border-surface-border h-[400px]">
    <h2 class="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">
      OHLC: {{ store.coins.find(c => c.id === (store.selectedCoins[0] || 'bitcoin'))?.name }}
    </h2>
    <div class="chart-container">
      <VChart :option="option" autoresize />
    </div>
  </div>
</template>
