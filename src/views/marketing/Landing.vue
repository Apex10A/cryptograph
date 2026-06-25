<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  BoltIcon,
  ChartBarIcon,
  SignalIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/outline'
import MarketingLayout from '../../layouts/MarketingLayout.vue'
import HeroTicker from '../../components/marketing/HeroTicker.vue'

const highlights = [
  {
    icon: SignalIcon,
    title: 'Live market stream',
    description: 'Real-time prices and trades from Binance WebSocket feeds.',
  },
  {
    icon: ChartBarIcon,
    title: 'Pro-grade charts',
    description: 'Line, area, volume, and candlestick views with timeframe controls.',
  },
  {
    icon: BoltIcon,
    title: 'Instant launch',
    description: 'No signup required. Open the terminal and start exploring.',
  },
]

const stats = [
  { label: 'Assets tracked', value: '6' },
  { label: 'Data sources', value: '2' },
  { label: 'Chart types', value: '4' },
  { label: 'Update speed', value: 'Live' },
]
</script>

<template>
  <MarketingLayout>
    <section class="relative overflow-hidden marketing-hero-glow">
      <div class="absolute inset-0 marketing-grid-bg pointer-events-none" />

      <div class="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-surface-border bg-surface-card/80 text-xs font-semibold uppercase tracking-widest text-content-muted mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-brand" />
          Live crypto terminal demo
        </p>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-content max-w-3xl mx-auto leading-tight">
          Real-time crypto intelligence.
          <span class="text-brand"> One terminal.</span>
        </h1>

        <p class="mt-6 text-lg text-content-muted max-w-2xl mx-auto leading-relaxed">
          CryptoFlow combines CoinGecko market data with Binance live streams in a
          professional trading dashboard — built for speed, clarity, and exploration.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/terminal"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-brand/20"
          >
            Launch Terminal
            <ArrowRightIcon class="w-4 h-4" />
          </RouterLink>
          <RouterLink
            to="/features"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-surface-border bg-surface-card text-content font-semibold hover:bg-surface-hover transition-colors"
          >
            Explore Features
          </RouterLink>
        </div>
      </div>
    </section>

    <HeroTicker />

    <section class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="p-4 rounded-xl border border-surface-border bg-surface-card text-center"
        >
          <p class="text-2xl font-mono font-bold text-brand">{{ stat.value }}</p>
          <p class="text-xs text-content-muted uppercase tracking-wider mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="text-2xl font-bold text-content">Everything you need to watch the market</h2>
        <p class="mt-2 text-content-muted">A focused terminal experience without the noise.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="item in highlights"
          :key="item.title"
          class="p-6 rounded-xl border border-surface-border bg-surface-card hover:border-brand/30 transition-colors"
        >
          <component :is="item.icon" class="w-8 h-8 text-brand mb-4" />
          <h3 class="font-semibold text-content mb-2">{{ item.title }}</h3>
          <p class="text-sm text-content-muted leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-20">
      <div class="rounded-2xl border border-surface-border bg-surface-card overflow-hidden">
        <div class="p-4 border-b border-surface-border flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-danger/80" />
          <span class="w-3 h-3 rounded-full bg-warning/80" />
          <span class="w-3 h-3 rounded-full bg-up/80" />
          <span class="ml-2 text-xs text-content-muted font-mono">terminal preview</span>
        </div>
        <div class="p-6 grid grid-cols-2 md:grid-cols-3 gap-3 bg-surface">
          <div
            v-for="symbol in ['BTC', 'ETH', 'SOL', 'BNB', 'ADA', 'DOGE']"
            :key="symbol"
            class="p-3 rounded-lg border border-surface-border bg-surface-card"
          >
            <p class="text-xs text-content-muted font-semibold">{{ symbol }}</p>
            <p class="font-mono font-bold text-content mt-1">$—.—</p>
            <div class="mt-2 h-6 rounded bg-surface-hover animate-pulse" />
          </div>
        </div>
        <div class="p-6 text-center border-t border-surface-border">
          <RouterLink
            to="/terminal"
            class="inline-flex items-center gap-2 text-brand font-semibold hover:opacity-80 transition-opacity"
          >
            Open full terminal
            <ArrowRightIcon class="w-4 h-4" />
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="border-t border-surface-border bg-surface-card">
      <div class="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 class="text-2xl font-bold text-content">Ready to explore the markets?</h2>
        <p class="mt-2 text-content-muted">Jump into the live terminal — no account needed.</p>
        <RouterLink
          to="/terminal"
          class="inline-flex mt-6 px-6 py-3 rounded-xl bg-brand text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Launch Terminal
        </RouterLink>
      </div>
    </section>
  </MarketingLayout>
</template>
