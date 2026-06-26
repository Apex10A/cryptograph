export const COIN_ICON_URLS: Record<string, string> = {
  bitcoin: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  ethereum: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  solana: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  binancecoin: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
  cardano: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
  dogecoin: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
}

export function getCoinIconUrl(coinId: string): string | undefined {
  return COIN_ICON_URLS[coinId]
}
