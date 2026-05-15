import { onUnmounted, ref } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import type { TradeEvent, PricePoint } from '../types'

export function useDataStream() {
  const store = useDashboardStore()
  const intervalId = ref<number | null>(null)
  const tradeIntervalId = ref<number | null>(null)

  const start = () => {
    if (intervalId.value) return
    
    store.setStreamStatus('live')

    // Price Update Interval (1000ms)
    intervalId.value = window.setInterval(() => {
      try {
        store.coins.forEach(coin => {
          const changePercent = (Math.random() - 0.495) * 0.02
          const newPrice = coin.price + (coin.price * changePercent)
          
          store.updateCoinPrice(coin.id, newPrice)
          
          const point: PricePoint = {
            timestamp: Date.now(),
            price: newPrice
          }
          store.addPricePoint(coin.id, point)
        })
      } catch (error) {
        console.error('Data stream error:', error)
        store.setStreamStatus('error')
      }
    }, 1000)

    // Trade Events Interval (Random 2-3s)
    const scheduleNextTrade = () => {
      const delay = 2000 + Math.random() * 1000
      tradeIntervalId.value = window.setTimeout(() => {
        try {
          const randomCoin = store.coins[Math.floor(Math.random() * store.coins.length)]
          if (!randomCoin) return scheduleNextTrade()

          const types: TradeEvent['type'][] = ['BUY', 'SELL', 'ALERT', 'LIQUIDATION']
          const type = types[Math.floor(Math.random() * types.length)] || 'BUY'
          const amount = Math.random() * 10
          const price = randomCoin.price
          const value = amount * price
          const severities: TradeEvent['severity'][] = ['low', 'medium', 'high']
          const severity = severities[Math.floor(Math.random() * severities.length)] || 'low'

          const event: TradeEvent = {
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            coin: randomCoin.symbol,
            type,
            price,
            amount,
            value,
            severity
          }

          store.addTradeEvent(event)
          scheduleNextTrade()
        } catch (error) {
          console.error('Trade event generator error:', error)
        }
      }, delay)
    }

    scheduleNextTrade()
  }

  const stop = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    if (tradeIntervalId.value) {
      clearTimeout(tradeIntervalId.value)
      tradeIntervalId.value = null
    }
    store.setStreamStatus('paused')
  }

  onUnmounted(() => {
    stop()
  })

  return {
    start,
    stop,
    status: store.streamStatus
  }
}
