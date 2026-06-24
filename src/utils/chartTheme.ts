export interface ChartTheme {
  echartsTheme: 'dark' | undefined
  colors: string[]
  axis: {
    line: string
    label: string
  }
  brand: {
    positive: string
    negative: string
  }
  tooltip: {
    backgroundColor: string
    borderColor: string
    textColor: string
  }
}

const DARK_THEME: ChartTheme = {
  echartsTheme: 'dark',
  colors: ['#26a69a', '#42a5f5', '#ffa726', '#ef5350', '#ab47bc', '#ec407a'],
  axis: {
    line: '#1e222d',
    label: '#787b86',
  },
  brand: {
    positive: '#26a69a',
    negative: '#ef5350',
  },
  tooltip: {
    backgroundColor: '#131722',
    borderColor: '#1e222d',
    textColor: '#d1d4dc',
  },
}

const LIGHT_THEME: ChartTheme = {
  echartsTheme: undefined,
  colors: ['#0d9488', '#2563eb', '#d97706', '#dc2626', '#7c3aed', '#db2777'],
  axis: {
    line: '#e2e8f0',
    label: '#64748b',
  },
  brand: {
    positive: '#16a34a',
    negative: '#dc2626',
  },
  tooltip: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    textColor: '#0f172a',
  },
}

export function getChartTheme(isDarkMode: boolean): ChartTheme {
  return isDarkMode ? DARK_THEME : LIGHT_THEME
}

export function createChartTooltip(theme: ChartTheme) {
  return {
    trigger: 'axis' as const,
    backgroundColor: theme.tooltip.backgroundColor,
    borderColor: theme.tooltip.borderColor,
    textStyle: { color: theme.tooltip.textColor },
  }
}
