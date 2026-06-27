import { createPinia, setActivePinia } from 'pinia'

export function createTestPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

export function createMockCoin(overrides: Partial<{
  id: string
  symbol: string
  name: string
  price: number
  openPrice24h: number
  change24h: number
  changePercent24h: number
  volume: number
  marketCap: number
  high24h: number
  low24h: number
}> = {}) {
  return {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67000,
    openPrice24h: 66000,
    change24h: 1000,
    changePercent24h: 1.52,
    volume: 35_000_000_000,
    marketCap: 1_300_000_000_000,
    high24h: 68000,
    low24h: 65000,
    ...overrides,
  }
}
