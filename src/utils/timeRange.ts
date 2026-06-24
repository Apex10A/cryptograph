import type { PricePoint, TimeRange } from '../types'

const TIME_RANGE_MS: Record<TimeRange, number> = {
  '1m': 60_000,
  '5m': 5 * 60_000,
  '15m': 15 * 60_000,
  '1h': 60 * 60_000,
  '4h': 4 * 60 * 60_000,
  '1d': 24 * 60 * 60_000,
}

export function getTimeRangeMs(range: TimeRange): number {
  return TIME_RANGE_MS[range]
}

export function filterPointsByTimeRange(points: PricePoint[], range: TimeRange): PricePoint[] {
  const cutoff = Date.now() - getTimeRangeMs(range)
  return points.filter((point) => point.timestamp >= cutoff)
}
