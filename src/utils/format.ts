const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

export function formatPrice(price: number): string {
  const digits = price < 1 ? 4 : 2
  return `$${formatNumber(price, digits)}`
}

export function formatPercent(value: number, digits = 2): string {
  const prefix = value >= 0 ? '+' : ''
  return `${prefix}${formatNumber(value, digits)}%`
}

export function formatCompactUsd(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`
  return usdFormatter.format(value)
}

export function formatVolumeAxis(value: number): string {
  return `$${(value / 1e9).toFixed(0)}B`
}

export function formatPriceAxis(value: number): string {
  return value > 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`
}

export function formatAmount(value: number, digits = 4): string {
  return value.toFixed(digits)
}

export function formatCurrencyValue(value: number, fractionDigits = 0): string {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}
