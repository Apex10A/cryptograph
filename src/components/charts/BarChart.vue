<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import ChartSkeleton from './ChartSkeleton.vue'
import { useChartSetup } from '../../composables/useChartSetup'
import { useDashboardStore } from '../../stores/dashboardStore'
import { formatVolumeAxis } from '../../utils/format'

const { theme, createChartTooltip } = useChartSetup(
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
)

const store = useDashboardStore()
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
  const chartTheme = theme.value

  const data = displayCoins.value.map((coin) => ({
    value: coin.volume,
    itemStyle: {
      color: coin.change24h >= 0 ? chartTheme.brand.positive : chartTheme.brand.negative,
    },
  }))

  return {
    backgroundColor: 'transparent',
    tooltip: {
      ...createChartTooltip(),
      axisPointer: { type: 'shadow' },
    },
    grid: {
      top: '5%',
      left: '3%',
      right: '8%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: chartTheme.axis.line } },
      axisLabel: {
        color: chartTheme.axis.label,
        formatter: formatVolumeAxis,
      },
    },
    yAxis: {
      type: 'category',
      data: displayCoins.value.map((c) => c.symbol),
      axisLine: { lineStyle: { color: chartTheme.axis.line } },
      axisLabel: { color: chartTheme.axis.label, fontWeight: 'bold' },
    },
    series: [
      {
        name: 'Volume',
        type: 'bar',
        data,
        barWidth: '60%',
        itemStyle: { borderRadius: [0, 4, 4, 0] },
        animationDuration: 1000,
        animationEasing: 'cubicOut',
      },
    ],
  }
})
</script>

<template>
  <div class="bg-surface-card p-6 rounded-xl border border-surface-border h-[400px]">
    <h2 class="text-sm font-semibold text-content-muted mb-4 uppercase tracking-widest">24h Volume Comparison</h2>
    <div class="chart-container">
      <ChartSkeleton v-if="store.isLoadingPrices" message="Loading volume data..." />
      <VChart v-else :option="option" autoresize />
    </div>
  </div>
</template>
