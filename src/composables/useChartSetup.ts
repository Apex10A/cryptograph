import { provide } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { THEME_KEY } from 'vue-echarts'

type ChartExtension = Parameters<typeof use>[0]

export const CHART_COLORS = ['#00ff88', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export const CHART_AXIS = {
  line: '#2a2d3e',
  label: '#94a3b8',
} as const

export const CHART_BRAND = {
  positive: '#00ff88',
  negative: '#ff4d4d',
} as const

export function createChartTooltip() {
  return {
    trigger: 'axis' as const,
    backgroundColor: '#1a1d2e',
    borderColor: '#2a2d3e',
    textStyle: { color: '#fff' },
  }
}

export function useChartSetup(...extensions: ChartExtension[]) {
  use([CanvasRenderer, ...extensions] as never)
  provide(THEME_KEY, 'dark')

  return {
    CHART_COLORS,
    CHART_AXIS,
    CHART_BRAND,
    createChartTooltip,
  }
}
