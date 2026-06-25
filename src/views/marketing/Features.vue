<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  ChartBarSquareIcon,
  SignalIcon,
  TableCellsIcon,
  SunIcon,
  ClockIcon,
  CircleStackIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/outline'
import MarketingLayout from '../../layouts/MarketingLayout.vue'

const features = [
  {
    icon: SignalIcon,
    title: 'Live price stream',
    description:
      'Binance WebSocket feeds push real-time prices and large trades into the dashboard as they happen.',
    tag: 'Binance WS',
  },
  {
    icon: CircleStackIcon,
    title: 'Market snapshots',
    description:
      'CoinGecko powers initial price, volume, market cap, and 24h change data when the terminal loads.',
    tag: 'CoinGecko',
  },
  {
    icon: ChartBarSquareIcon,
    title: 'Multi-chart analytics',
    description:
      'Line performance charts, market cap trends, volume comparisons, and OHLC candlesticks — all in one view.',
    tag: 'ECharts',
  },
  {
    icon: TableCellsIcon,
    title: 'Activity feed',
    description:
      'Filterable live trade table surfaces significant Binance trades with BUY/SELL context and severity.',
    tag: 'TanStack Table',
  },
  {
    icon: ClockIcon,
    title: 'Timeframe controls',
    description: 'Switch between 1m, 5m, 15m, 1h, 4h, and 1d windows to focus your chart data.',
    tag: 'Filters',
  },
  {
    icon: SunIcon,
    title: 'Dark & light themes',
    description: 'Toggle between a TradingView-inspired dark terminal and a clean light mode.',
    tag: 'Theming',
  },
]
</script>

<template>
  <MarketingLayout>
    <section class="max-w-6xl mx-auto px-6 pt-16 pb-12">
      <p class="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Features</p>
      <h1 class="text-3xl sm:text-4xl font-bold text-content max-w-2xl">
        A focused terminal built for live crypto monitoring
      </h1>
      <p class="mt-4 text-content-muted max-w-2xl leading-relaxed">
        CryptoFlow is a demo trading dashboard that wires real APIs into a polished Vue 3
        interface. Every feature below is live in the terminal.
      </p>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-20">
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 rounded-xl border border-surface-border bg-surface-card hover:border-brand/30 transition-colors"
        >
          <div class="flex items-start justify-between gap-4 mb-4">
            <component :is="feature.icon" class="w-7 h-7 text-brand shrink-0" />
            <span class="text-[10px] font-semibold uppercase tracking-widest text-content-muted px-2 py-1 rounded-full border border-surface-border">
              {{ feature.tag }}
            </span>
          </div>
          <h2 class="text-lg font-semibold text-content mb-2">{{ feature.title }}</h2>
          <p class="text-sm text-content-muted leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

      <div class="mt-12 p-8 rounded-2xl border border-brand/20 bg-brand/5 text-center">
        <h2 class="text-xl font-bold text-content">See it all in action</h2>
        <p class="mt-2 text-content-muted text-sm">Open the terminal and watch live data flow.</p>
        <RouterLink
          to="/terminal"
          class="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-brand text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Launch Terminal
          <ArrowRightIcon class="w-4 h-4" />
        </RouterLink>
      </div>
    </section>
  </MarketingLayout>
</template>
