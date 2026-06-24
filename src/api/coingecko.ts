import { COIN_SEEDS } from '../config/coins'
import type { CoinData } from '../types'

export interface CoinGeckoMarket {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  total_volume: number
  market_cap: number
  high_24h: number
  low_24h: number
}

const COINGECKO_BASE = import.meta.env.DEV ? '/coingecko' : 'https://api.coingecko.com/api/v3'

export async function fetchCoinMarketData(coinIds: string[]): Promise<CoinGeckoMarket[]> {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    ids: coinIds.join(','),
    order: 'market_cap_desc',
    sparkline: 'false',
  })

  const response = await fetch(`${COINGECKO_BASE}/coins/markets?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`CoinGecko request failed (${response.status})`)
  }

  return response.json() as Promise<CoinGeckoMarket[]>
}

export function mapMarketDataToCoins(markets: CoinGeckoMarket[]): CoinData[] {
  const marketById = new Map(markets.map((market) => [market.id, market]))

  return COIN_SEEDS.map((seed) => {
    const market = marketById.get(seed.id)

    if (!market) {
      return {
        id: seed.id,
        symbol: seed.symbol,
        name: seed.name,
        price: seed.price,
        openPrice24h: seed.price,
        change24h: 0,
        changePercent24h: 0,
        volume: seed.volume,
        marketCap: seed.marketCap,
        high24h: seed.high24h,
        low24h: seed.low24h,
      }
    }

    const price = market.current_price
    const change24h = market.price_change_24h ?? 0
    const changePercent24h = market.price_change_percentage_24h ?? 0

    return {
      id: seed.id,
      symbol: seed.symbol,
      name: seed.name,
      price,
      openPrice24h: price - change24h,
      change24h,
      changePercent24h,
      volume: market.total_volume ?? seed.volume,
      marketCap: market.market_cap ?? seed.marketCap,
      high24h: market.high_24h ?? price,
      low24h: market.low_24h ?? price,
    }
  })
}
