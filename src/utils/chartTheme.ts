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
  colors: ['#e879f9', '#fbbf24', '#a78bfa', '#fb7185', '#67e8f9', '#f9a8d4'],
  axis: {
    line: '#2a2438',
    label: '#948da8',
  },
  brand: {
    positive: '#86efac',
    negative: '#fda4af',
  },
  tooltip: {
    backgroundColor: '#110f1a',
    borderColor: '#2a2438',
    textColor: '#ede9f5',
  },
}

const LIGHT_THEME: ChartTheme = {
  echartsTheme: undefined,
  colors: ['#6d28d9', '#be185d', '#7c3aed', '#b91c1c', '#0e7490', '#a21caf'],
  axis: {
    line: '#e4d9c8',
    label: '#6b5f75',
  },
  brand: {
    positive: '#15803d',
    negative: '#be123c',
  },
  tooltip: {
    backgroundColor: '#fffdf7',
    borderColor: '#e4d9c8',
    textColor: '#1a1423',
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
