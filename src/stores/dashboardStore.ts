import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import {
  registerDataStream,
  startDataStream,
  stopDataStream,
} from '../services/dataStream'
import { filterPointsByTimeRange } from '../utils/timeRange'
import type { CoinData, PricePoint, TradeEvent, TimeRange, StreamStatus } from '../types'

function createInitialCoins(): CoinData[] {
  const seeds = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 67000, volume: 35000000000, marketCap: 1300000000000, high24h: 68000, low24h: 66000 },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3500, volume: 15000000000, marketCap: 420000000000, high24h: 3600, low24h: 3400 },
    { id: 'solana', symbol: 'SOL', name: 'Solana', price: 180, volume: 4000000000, marketCap: 80000000000, high24h: 190, low24h: 170 },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 580, volume: 1200000000, marketCap: 88000000000, high24h: 600, low24h: 570 },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.65, volume: 400000000, marketCap: 23000000000, high24h: 0.68, low24h: 0.63 },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.18, volume: 1800000000, marketCap: 26000000000, high24h: 0.20, low24h: 0.16 },
  ]

  return seeds.map((seed) => ({
    ...seed,
    openPrice24h: seed.price,
    change24h: 0,
    changePercent24h: 0,
  }))
}

export const useDashboardStore = defineStore('dashboard', () => {
  const coins = ref<CoinData[]>(createInitialCoins())

  const chartData = shallowRef<Record<string, PricePoint[]>>({
    bitcoin: [], ethereum: [], solana: [], binancecoin: [], cardano: [], dogecoin: [],
  })

  const activityFeed = shallowRef<TradeEvent[]>([])
  const selectedCoins = ref<string[]>(['bitcoin', 'ethereum', 'solana', 'binancecoin', 'cardano', 'dogecoin'])
  const timeRange = ref<TimeRange>('5m')
  const streamStatus = ref<StreamStatus>('paused')
  const isDarkMode = ref(localStorage.getItem('theme') !== 'light')

  function updateCoinPrice(coinId: string, newPrice: number) {
    const coin = coins.value.find((c) => c.id === coinId)
    if (!coin) return

    coin.price = newPrice
    coin.change24h = newPrice - coin.openPrice24h
    coin.changePercent24h =
      coin.openPrice24h !== 0 ? (coin.change24h / coin.openPrice24h) * 100 : 0

    if (newPrice > coin.high24h) coin.high24h = newPrice
    if (newPrice < coin.low24h) coin.low24h = newPrice
  }

  function addPricePoint(coinId: string, point: PricePoint) {
    const data = { ...chartData.value }
    if (!data[coinId]) data[coinId] = []
    data[coinId] = [...data[coinId], point].slice(-500)
    chartData.value = data
  }

  function getFilteredChartData(coinId: string): PricePoint[] {
    const points = chartData.value[coinId] || []
    return filterPointsByTimeRange(points, timeRange.value)
  }

  function addTradeEvent(event: TradeEvent) {
    activityFeed.value = [event, ...activityFeed.value].slice(0, 50)
  }

  function toggleCoin(coinId: string) {
    if (selectedCoins.value.includes(coinId)) {
      selectedCoins.value = selectedCoins.value.filter((id) => id !== coinId)
    } else {
      selectedCoins.value.push(coinId)
    }
  }

  function setTimeRange(range: TimeRange) {
    timeRange.value = range
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function setStreamStatus(status: StreamStatus) {
    streamStatus.value = status
  }

  function startStream() {
    startDataStream()
  }

  function stopStream() {
    stopDataStream()
  }

  function toggleStream() {
    if (streamStatus.value === 'live') {
      stopStream()
    } else {
      startStream()
    }
  }

  registerDataStream({
    getCoins: () => coins.value,
    setStreamStatus,
    updateCoinPrice,
    addPricePoint,
    addTradeEvent,
  })

  return {
    coins,
    chartData,
    activityFeed,
    selectedCoins,
    timeRange,
    streamStatus,
    isDarkMode,
    updateCoinPrice,
    addPricePoint,
    getFilteredChartData,
    addTradeEvent,
    toggleCoin,
    setTimeRange,
    toggleDarkMode,
    setStreamStatus,
    startStream,
    stopStream,
    toggleStream,
  }
})
