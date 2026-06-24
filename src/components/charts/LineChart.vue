<script setup lang="ts">
import { computed } from 'vue'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import ChartSkeleton from './ChartSkeleton.vue'
import { useChartSetup } from '../../composables/useChartSetup'
import { useDashboardStore } from '../../stores/dashboardStore'

const { theme, createChartTooltip } = useChartSetup(
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
)

const store = useDashboardStore()

const option = computed(() => {
  const chartTheme = theme.value
  const selectedCoinData = store.coins.filter((c) => store.selectedCoins.includes(c.id))

  const series = selectedCoinData.map((coin, index) => {
    const data = store.getFilteredChartData(coin.id)
    return {
      name: coin.symbol,
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: { width: 2, color: chartTheme.colors[index % chartTheme.colors.length] },
      data: data.map((p) => [p.timestamp, p.price]),
    }
  })

  return {
    backgroundColor: 'transparent',
    tooltip: {
      ...createChartTooltip(),
      formatter: (params: { color: string; seriesName: string; value: [number, number] }[]) => {
        let res = `<div class="font-mono text-xs">${new Date(params[0]!.value[0]).toLocaleTimeString()}</div>`
        params.forEach((p) => {
          res += `<div class="flex justify-between gap-4">
            <span style="color:${p.color}">● ${p.seriesName}</span>
            <span class="font-bold">$${p.value[1].toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>`
        })
        return res
      },
    },
    legend: {
      data: selectedCoinData.map((c) => c.symbol),
      textStyle: { color: chartTheme.axis.label },
      bottom: 0,
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'time',
      axisLine: { lineStyle: { color: chartTheme.axis.line } },
      axisLabel: { color: chartTheme.axis.label },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: {
        color: chartTheme.axis.label,
        formatter: (value: number) => `$${value > 1000 ? `${(value / 1000).toFixed(0)}k` : value}`,
      },
      splitLine: { lineStyle: { color: chartTheme.axis.line } },
    },
    series,
  }
})
</script>

<template>
  <div class="bg-surface-card p-6 rounded-xl border border-surface-border h-[400px]">
    <h2 class="text-lg font-semibold mb-4 flex items-center gap-2 text-content">
      <span class="w-2 h-2 rounded-full bg-brand" />
      PRICE PERFORMANCE
    </h2>
    <div class="chart-container">
      <ChartSkeleton v-if="store.isChartsLoading" />
      <VChart v-else :option="option" autoresize />
    </div>
  </div>
</template>
