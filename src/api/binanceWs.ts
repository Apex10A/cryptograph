import type { StreamStatus } from '../types'

export interface BinanceAggTrade {
  e: 'aggTrade'
  s: string
  p: string
  q: string
  m: boolean
  T: number
  a: number
}

export interface BinanceStreamMessage {
  stream: string
  data: BinanceAggTrade
}

export interface BinanceTradePayload {
  coinId: string
  symbol: string
  price: number
  quantity: number
  isSell: boolean
  timestamp: number
  tradeId: number
}

type TradeHandler = (trade: BinanceTradePayload) => void
type StatusHandler = (status: StreamStatus) => void

const WS_BASE = 'wss://stream.binance.com:9443/stream'

let socket: WebSocket | null = null
let shouldStayConnected = false
let reconnectTimeoutId: number | null = null
let tradeHandler: TradeHandler | null = null
let statusHandler: StatusHandler | null = null
let symbolToCoinId: Record<string, string> = {}
let streamSymbols: string[] = []

function clearReconnectTimer() {
  if (reconnectTimeoutId !== null) {
    clearTimeout(reconnectTimeoutId)
    reconnectTimeoutId = null
  }
}

function buildStreamUrl(symbols: string[]): string {
  const streams = symbols.map((symbol) => `${symbol}@aggTrade`).join('/')
  return `${WS_BASE}?streams=${streams}`
}

function handleMessage(event: MessageEvent<string>) {
  if (!tradeHandler) return

  try {
    const message = JSON.parse(event.data) as BinanceStreamMessage
    const trade = message.data

    if (!trade || trade.e !== 'aggTrade') return

    const coinId = symbolToCoinId[trade.s.toUpperCase()]
    if (!coinId) return

    tradeHandler({
      coinId,
      symbol: trade.s,
      price: Number(trade.p),
      quantity: Number(trade.q),
      isSell: trade.m,
      timestamp: trade.T,
      tradeId: trade.a,
    })
  } catch (error) {
    console.error('Binance message parse error:', error)
  }
}

function scheduleReconnect() {
  if (!shouldStayConnected) return

  clearReconnectTimer()
  statusHandler?.('reconnecting')
  reconnectTimeoutId = window.setTimeout(connect, 3000)
}

function connect() {
  if (!shouldStayConnected || streamSymbols.length === 0) return

  socket?.close()
  socket = new WebSocket(buildStreamUrl(streamSymbols))

  socket.onopen = () => {
    statusHandler?.('live')
  }

  socket.onmessage = handleMessage

  socket.onerror = () => {
    statusHandler?.('error')
  }

  socket.onclose = () => {
    socket = null
    if (shouldStayConnected) {
      scheduleReconnect()
    }
  }
}

export function startBinanceStream(
  symbols: string[],
  coinIdBySymbol: Record<string, string>,
  onTrade: TradeHandler,
  onStatus: StatusHandler,
) {
  symbolToCoinId = Object.fromEntries(
    Object.entries(coinIdBySymbol).map(([symbol, coinId]) => [symbol.toUpperCase(), coinId]),
  )
  streamSymbols = symbols
  tradeHandler = onTrade
  statusHandler = onStatus
  shouldStayConnected = true
  clearReconnectTimer()
  statusHandler('reconnecting')
  connect()
}

export function stopBinanceStream() {
  shouldStayConnected = false
  clearReconnectTimer()
  tradeHandler = null
  statusHandler = null
  socket?.close()
  socket = null
}
