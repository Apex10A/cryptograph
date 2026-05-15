export interface CoinData {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  changePercent24h: number
  volume: number
  marketCap: number
  high24h: number
  low24h: number
}

export interface PricePoint {
  timestamp: number
  price: number
}

export interface TradeEvent {
  id: string
  timestamp: number
  coin: string
  type: 'BUY' | 'SELL' | 'ALERT' | 'LIQUIDATION'
  price: number
  amount: number
  value: number
  severity: 'low' | 'medium' | 'high'
}

export interface ChartDataset {
  coinId: string
  points: PricePoint[]
}

export type TimeRange = '1m' | '5m' | '15m' | '1h' | '4h' | '1d'
export type StreamStatus = 'live' | 'paused' | 'reconnecting' | 'error'
