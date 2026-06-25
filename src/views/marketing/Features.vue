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
    title: 'Aurora themes',
    description: 'Warm cream daylight or void-purple night — Bricolage Grotesque UI with amber signal accents.',
    tag: 'Aurora Ink',
  },
]
</script>

<template>
  <MarketingLayout>
    <section class="relative max-w-6xl mx-auto px-6 pt-16 pb-12">
      <div class="marketing-aurora-a pointer-events-none opacity-60" />
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand mb-3">Machinery</p>
      <h1 class="font-display text-3xl sm:text-4xl font-extrabold text-content max-w-2xl">
        What hums beneath the
        <span class="text-gradient-brand"> violet glass</span>
      </h1>
      <p class="mt-4 text-content-muted max-w-2xl leading-relaxed">
        Every panel below is wired to real APIs — not mock data, not vaporware. This is a
        laboratory terminal for people who want to see how live crypto feels.
      </p>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-20">
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 rounded-2xl border border-surface-border marketing-card-glass hover:border-brand/40 transition-colors"
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

      <div class="mt-12 p-8 rounded-2xl border border-brand/25 marketing-card-glass text-center glow-ring">
        <h2 class="font-display text-xl font-bold text-content">Witness the stream</h2>
        <p class="mt-2 text-content-muted text-sm">Trades flicker in. Charts breathe. No signup ritual.</p>
        <RouterLink
          to="/terminal"
          class="inline-flex items-center gap-2 mt-6 px-7 py-3.5 rounded-full bg-brand text-white font-semibold hover:opacity-90 transition-opacity glow-ring"
        >
          Enter the Terminal
          <ArrowRightIcon class="w-4 h-4" />
        </RouterLink>
      </div>
    </section>
  </MarketingLayout>
</template>
