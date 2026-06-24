import { defineStore } from 'pinia'
import { ref, shallowRef, computed } from 'vue'
import { createInitialCoins, createEmptyChartData, DEFAULT_COIN_IDS } from '../config/coins'
import { fetchCoinMarketData, mapMarketDataToCoins } from '../api/coingecko'
import {
  registerDataStream,
  startDataStream,
  stopDataStream,
} from '../services/dataStream'
import { filterPointsByTimeRange } from '../utils/timeRange'
import type { CoinData, PricePoint, TradeEvent, TimeRange, StreamStatus } from '../types'

export const useDashboardStore = defineStore('dashboard', () => {
  const coins = ref<CoinData[]>(createInitialCoins())
  const chartData = shallowRef<Record<string, PricePoint[]>>(createEmptyChartData())
  const activityFeed = shallowRef<TradeEvent[]>([])
  const selectedCoins = ref<string[]>([...DEFAULT_COIN_IDS])
  const timeRange = ref<TimeRange>('5m')
  const streamStatus = ref<StreamStatus>('paused')
  const isDarkMode = ref(localStorage.getItem('theme') !== 'light')
  const isLoadingPrices = ref(false)
  const pricesError = ref<string | null>(null)

  const isChartsLoading = computed(() => {
    if (isLoadingPrices.value) return true
    return !selectedCoins.value.some((id) => (chartData.value[id]?.length ?? 0) > 0)
  })

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

  async function loadInitialPrices() {
    isLoadingPrices.value = true
    pricesError.value = null

    try {
      const markets = await fetchCoinMarketData(coins.value.map((coin) => coin.id))
      coins.value = mapMarketDataToCoins(markets)
    } catch (error) {
      console.error('Failed to load CoinGecko prices:', error)
      pricesError.value = 'Using fallback prices — live market data unavailable'
    } finally {
      isLoadingPrices.value = false
    }
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
    if (streamStatus.value === 'live' || streamStatus.value === 'reconnecting') {
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
    isLoadingPrices,
    pricesError,
    isChartsLoading,
    updateCoinPrice,
    addPricePoint,
    getFilteredChartData,
    addTradeEvent,
    loadInitialPrices,
    toggleCoin,
    setTimeRange,
    toggleDarkMode,
    setStreamStatus,
    startStream,
    stopStream,
    toggleStream,
  }
})
