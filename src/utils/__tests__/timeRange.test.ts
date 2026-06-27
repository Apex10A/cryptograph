import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getTimeRangeMs, filterPointsByTimeRange } from '../timeRange'
import type { PricePoint } from '../../types'

describe('timeRange', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-27T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('maps known ranges to milliseconds', () => {
    expect(getTimeRangeMs('1m')).toBe(60_000)
    expect(getTimeRangeMs('5m')).toBe(5 * 60_000)
    expect(getTimeRangeMs('1h')).toBe(60 * 60_000)
    expect(getTimeRangeMs('1d')).toBe(24 * 60 * 60_000)
  })

  it('filters points outside the selected window', () => {
    const now = Date.now()
    const points: PricePoint[] = [
      { timestamp: now - 2 * 60_000, price: 100 },
      { timestamp: now - 30_000, price: 101 },
      { timestamp: now - 10_000, price: 102 },
    ]

    const filtered = filterPointsByTimeRange(points, '1m')

    expect(filtered).toHaveLength(2)
    expect(filtered.map((point) => point.price)).toEqual([101, 102])
  })

  it('returns empty array when all points are stale', () => {
    const now = Date.now()
    const points: PricePoint[] = [{ timestamp: now - 10 * 60_000, price: 99 }]

    expect(filterPointsByTimeRange(points, '5m')).toEqual([])
  })
})
