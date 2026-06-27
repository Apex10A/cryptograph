import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useDashboardStore } from '../dashboardStore'
import { createTestPinia } from '../../test/helpers'
import { DEFAULT_COIN_IDS } from '../../config/coins'
import { startDataStream, stopDataStream } from '../../services/dataStream'

describe('dashboardStore', () => {
  beforeEach(() => {
    createTestPinia()
  })

  it('updates coin price and 24h change from open baseline', () => {
    const store = useDashboardStore()
    const coin = store.coins.find((item) => item.id === 'bitcoin')

    expect(coin).toBeDefined()
    coin!.openPrice24h = 100
    coin!.high24h = 100
    coin!.low24h = 100

    store.updateCoinPrice('bitcoin', 110)

    expect(coin!.price).toBe(110)
    expect(coin!.change24h).toBe(10)
    expect(coin!.changePercent24h).toBe(10)
    expect(coin!.high24h).toBe(110)
  })

  it('toggles coin selection', () => {
    const store = useDashboardStore()

    store.toggleCoin('bitcoin')
    expect(store.selectedCoins).not.toContain('bitcoin')

    store.toggleCoin('bitcoin')
    expect(store.selectedCoins).toContain('bitcoin')
  })

  it('caps chart points at 500 entries', () => {
    const store = useDashboardStore()
    const baseTime = Date.now()

    for (let i = 0; i < 510; i += 1) {
      store.addPricePoint('bitcoin', { timestamp: baseTime + i, price: 100 + i })
    }

    expect(store.chartData.bitcoin).toHaveLength(500)
    expect(store.chartData.bitcoin?.[0]?.price).toBe(110)
  })

  it('keeps only the latest 50 trade events', () => {
    const store = useDashboardStore()

    for (let i = 0; i < 55; i += 1) {
      store.addTradeEvent({
        id: `trade-${i}`,
        timestamp: Date.now(),
        coin: 'BTC',
        type: 'BUY',
        price: 1000,
        amount: 1,
        value: 1000,
        severity: 'low',
      })
    }

    expect(store.activityFeed).toHaveLength(50)
    expect(store.activityFeed[0]?.id).toBe('trade-54')
  })

  it('filters chart data by active time range', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-27T12:00:00.000Z'))

    const store = useDashboardStore()
    const now = Date.now()

    store.addPricePoint('bitcoin', { timestamp: now - 2 * 60_000, price: 100 })
    store.addPricePoint('bitcoin', { timestamp: now - 30_000, price: 101 })

    store.setTimeRange('1m')

    expect(store.getFilteredChartData('bitcoin')).toHaveLength(1)
    expect(store.getFilteredChartData('bitcoin')[0]?.price).toBe(101)

    vi.useRealTimers()
  })

  it('starts and stops the data stream', () => {
    const store = useDashboardStore()

    store.startStream()
    expect(startDataStream).toHaveBeenCalled()

    store.streamStatus = 'live'
    store.toggleStream()
    expect(stopDataStream).toHaveBeenCalled()
  })

  it('resets selected coins via DEFAULT_COIN_IDS', () => {
    const store = useDashboardStore()

    store.selectedCoins = ['bitcoin']
    store.selectedCoins = [...DEFAULT_COIN_IDS]

    expect(store.selectedCoins).toEqual(DEFAULT_COIN_IDS)
  })
})
