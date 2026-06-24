import type { CoinData, PricePoint, TradeEvent, StreamStatus } from '../types'

export interface DataStreamHandlers {
  getCoins: () => CoinData[]
  setStreamStatus: (status: StreamStatus) => void
  updateCoinPrice: (coinId: string, newPrice: number) => void
  addPricePoint: (coinId: string, point: PricePoint) => void
  addTradeEvent: (event: TradeEvent) => void
}

let handlers: DataStreamHandlers | null = null
let intervalId: number | null = null
let tradeTimeoutId: number | null = null

export function registerDataStream(streamHandlers: DataStreamHandlers) {
  handlers = streamHandlers
}

export function startDataStream() {
  if (!handlers || intervalId !== null) return

  handlers.setStreamStatus('live')

  intervalId = window.setInterval(() => {
    if (!handlers) return

    try {
      handlers.getCoins().forEach((coin) => {
        const changePercent = (Math.random() - 0.495) * 0.02
        const newPrice = coin.price + coin.price * changePercent

        handlers!.updateCoinPrice(coin.id, newPrice)
        handlers!.addPricePoint(coin.id, { timestamp: Date.now(), price: newPrice })
      })
    } catch (error) {
      console.error('Data stream error:', error)
      handlers.setStreamStatus('error')
    }
  }, 1000)

  const scheduleNextTrade = () => {
    const delay = 2000 + Math.random() * 1000
    tradeTimeoutId = window.setTimeout(() => {
      if (!handlers) return

      try {
        const coins = handlers.getCoins()
        const randomCoin = coins[Math.floor(Math.random() * coins.length)]
        if (!randomCoin) return scheduleNextTrade()

        const types: TradeEvent['type'][] = ['BUY', 'SELL', 'ALERT', 'LIQUIDATION']
        const type = types[Math.floor(Math.random() * types.length)] || 'BUY'
        const amount = Math.random() * 10
        const price = randomCoin.price
        const severities: TradeEvent['severity'][] = ['low', 'medium', 'high']
        const severity = severities[Math.floor(Math.random() * severities.length)] || 'low'

        handlers.addTradeEvent({
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
          coin: randomCoin.symbol,
          type,
          price,
          amount,
          value: amount * price,
          severity,
        })

        scheduleNextTrade()
      } catch (error) {
        console.error('Trade event generator error:', error)
        scheduleNextTrade()
      }
    }, delay)
  }

  scheduleNextTrade()
}

export function stopDataStream() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
  if (tradeTimeoutId !== null) {
    clearTimeout(tradeTimeoutId)
    tradeTimeoutId = null
  }
  handlers?.setStreamStatus('paused')
}
