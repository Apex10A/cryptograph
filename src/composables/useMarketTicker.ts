import { onMounted, ref } from 'vue'
import { fetchCoinMarketData, mapMarketDataToCoins } from '../api/coingecko'
import { COIN_SEEDS } from '../config/coins'
import type { CoinData } from '../types'

export function useMarketTicker() {
  const coins = ref<CoinData[]>([])
  const isLoading = ref(true)

  onMounted(async () => {
    try {
      const markets = await fetchCoinMarketData(COIN_SEEDS.map((coin) => coin.id))
      coins.value = mapMarketDataToCoins(markets)
    } catch {
      coins.value = COIN_SEEDS.map((seed) => ({
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
      }))
    } finally {
      isLoading.value = false
    }
  })

  return { coins, isLoading }
}
