import { computed, provide } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { THEME_KEY } from 'vue-echarts'
import { useAppTheme } from './useAppTheme'
import { createChartTooltip, getChartTheme } from '../utils/chartTheme'

type ChartExtension = Parameters<typeof use>[0]

export function useChartSetup(...extensions: ChartExtension[]) {
  const { isDark } = useAppTheme()

  use([CanvasRenderer, ...extensions] as never)

  const theme = computed(() => getChartTheme(isDark.value))

  provide(
    THEME_KEY,
    computed(() => theme.value.echartsTheme),
  )

  return {
    theme,
    createChartTooltip: () => createChartTooltip(theme.value),
  }
}
