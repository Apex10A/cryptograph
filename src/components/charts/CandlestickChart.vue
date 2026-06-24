<script setup lang="ts">
import { computed } from 'vue'
import { CandlestickChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import ChartSkeleton from './ChartSkeleton.vue'
import { useChartSetup } from '../../composables/useChartSetup'
import { useDashboardStore } from '../../stores/dashboardStore'

const { theme, createChartTooltip } = useChartSetup(
  CandlestickChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
)

const store = useDashboardStore()

const primaryCoinId = computed(() => store.selectedCoins[0] || 'bitcoin')

const primaryCoinName = computed(
  () => store.coins.find((c) => c.id === primaryCoinId.value)?.name ?? 'Bitcoin',
)

const candleData = computed(() => {
  const points = store.getFilteredChartData(primaryCoinId.value)
  const candles: { time: string; values: [number, number, number, number] }[] = []

  for (let i = 0; i < points.length; i += 10) {
    const chunk = points.slice(i, i + 10)
    if (chunk.length === 0) continue

    const open = chunk[0]?.price ?? 0
    const close = chunk[chunk.length - 1]?.price ?? 0
    const prices = chunk.map((p) => p.price)
    const low = Math.min(...prices)
    const high = Math.max(...prices)
    const timestamp = chunk[chunk.length - 1]?.timestamp ?? Date.now()

    candles.push({
      time: new Date(timestamp).toLocaleTimeString(),
      values: [open, close, low, high],
    })
  }

  return candles
})

const option = computed(() => {
  const chartTheme = theme.value
  const primaryCoin = store.coins.find((c) => c.id === primaryCoinId.value)

  return {
    backgroundColor: 'transparent',
    tooltip: createChartTooltip(),
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: candleData.value.map((c) => c.time),
      axisLine: { lineStyle: { color: chartTheme.axis.line } },
      axisLabel: { color: chartTheme.axis.label },
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: chartTheme.axis.line } },
      axisLabel: { color: chartTheme.axis.label },
    },
    series: [
      {
        name: primaryCoin?.symbol || 'Price',
        type: 'candlestick',
        data: candleData.value.map((c) => c.values),
        itemStyle: {
          color: chartTheme.brand.positive,
          color0: chartTheme.brand.negative,
          borderColor: chartTheme.brand.positive,
          borderColor0: chartTheme.brand.negative,
        },
      },
    ],
  }
})
</script>

<template>
  <div class="bg-surface-card p-6 rounded-xl border border-surface-border h-[400px]">
    <h2 class="text-sm font-semibold text-content-muted mb-4 uppercase tracking-widest">
      OHLC: {{ primaryCoinName }}
    </h2>
    <div class="chart-container">
      <ChartSkeleton v-if="store.isChartsLoading" message="Building OHLC candles..." />
      <VChart v-else :option="option" autoresize />
    </div>
  </div>
</template>
