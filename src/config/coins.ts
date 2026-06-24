import type { PricePoint } from '../types'

export interface CoinSeed {
  id: string
  symbol: string
  name: string
  price: number
  volume: number
  marketCap: number
  high24h: number
  low24h: number
}

export const COIN_SEEDS: CoinSeed[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 67000, volume: 35000000000, marketCap: 1300000000000, high24h: 68000, low24h: 66000 },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3500, volume: 15000000000, marketCap: 420000000000, high24h: 3600, low24h: 3400 },
  { id: 'solana', symbol: 'SOL', name: 'Solana', price: 180, volume: 4000000000, marketCap: 80000000000, high24h: 190, low24h: 170 },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 580, volume: 1200000000, marketCap: 88000000000, high24h: 600, low24h: 570 },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.65, volume: 400000000, marketCap: 23000000000, high24h: 0.68, low24h: 0.63 },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.18, volume: 1800000000, marketCap: 26000000000, high24h: 0.20, low24h: 0.16 },
]

export const DEFAULT_COIN_IDS = COIN_SEEDS.map((coin) => coin.id)

export const COIN_OPTIONS = COIN_SEEDS.map(({ id, symbol }) => ({ id, symbol }))

export function createEmptyChartData(): Record<string, PricePoint[]> {
  return Object.fromEntries(COIN_SEEDS.map((coin) => [coin.id, []]))
}
