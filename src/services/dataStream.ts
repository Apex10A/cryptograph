import { COIN_SEEDS, BINANCE_SYMBOL_TO_COIN_ID } from '../config/coins'
import { startBinanceStream, stopBinanceStream } from '../api/binanceWs'
import type { CoinData, PricePoint, TradeEvent, StreamStatus } from '../types'

export interface DataStreamHandlers {
  getCoins: () => CoinData[]
  setStreamStatus: (status: StreamStatus) => void
  updateCoinPrice: (coinId: string, newPrice: number) => void
  addPricePoint: (coinId: string, point: PricePoint) => void
  addTradeEvent: (event: TradeEvent) => void
}

let handlers: DataStreamHandlers | null = null
let isRunning = false

const MIN_TRADE_VALUE_USD = 25_000

function getTradeSeverity(value: number): TradeEvent['severity'] {
  if (value >= 250_000) return 'high'
  if (value >= 75_000) return 'medium'
  return 'low'
}

function handleBinanceTrade(trade: {
  coinId: string
  symbol: string
  price: number
  quantity: number
  isSell: boolean
  timestamp: number
  tradeId: number
}) {
  if (!handlers) return

  handlers.updateCoinPrice(trade.coinId, trade.price)
  handlers.addPricePoint(trade.coinId, {
    timestamp: trade.timestamp,
    price: trade.price,
  })

  const value = trade.price * trade.quantity
  if (value < MIN_TRADE_VALUE_USD) return

  const coin = handlers.getCoins().find((item) => item.id === trade.coinId)
  if (!coin) return

  handlers.addTradeEvent({
    id: `${trade.symbol}-${trade.tradeId}`,
    timestamp: trade.timestamp,
    coin: coin.symbol,
    type: trade.isSell ? 'SELL' : 'BUY',
    price: trade.price,
    amount: trade.quantity,
    value,
    severity: getTradeSeverity(value),
  })
}

export function registerDataStream(streamHandlers: DataStreamHandlers) {
  handlers = streamHandlers
}

export function startDataStream() {
  if (!handlers || isRunning) return

  isRunning = true

  startBinanceStream(
    COIN_SEEDS.map((coin) => coin.binanceSymbol),
    BINANCE_SYMBOL_TO_COIN_ID,
    handleBinanceTrade,
    (status) => handlers?.setStreamStatus(status),
  )
}

export function stopDataStream() {
  if (!isRunning) return

  isRunning = false
  stopBinanceStream()
  handlers?.setStreamStatus('paused')
}
