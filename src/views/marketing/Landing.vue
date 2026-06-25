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
      <div class="marketing-aurora-a pointer-events-none" />
      <div class="marketing-aurora-b pointer-events-none" />
      <div class="absolute inset-0 marketing-grid-bg pointer-events-none" />

      <div class="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-surface-card/70 marketing-card-glass text-xs font-semibold uppercase tracking-[0.2em] text-content-muted mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-brand" />
          Signal in the noise
        </p>

        <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-content max-w-3xl mx-auto leading-[1.05]">
          Read the market
          <span class="text-gradient-brand"> before it moves.</span>
        </h1>

        <p class="mt-6 text-lg text-content-muted max-w-2xl mx-auto leading-relaxed">
          CryptoFlow is an experimental terminal — part oracle, part dashboard — streaming
          live Binance trades and CoinGecko snapshots into one uncanny violet void.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/terminal"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand text-white font-semibold hover:opacity-90 transition-all glow-ring"
          >
            Enter the Terminal
            <ArrowRightIcon class="w-4 h-4" />
          </RouterLink>
          <RouterLink
            to="/features"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-surface-border marketing-card-glass text-content font-semibold hover:border-brand/40 transition-colors"
          >
            See the machinery
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
        <h2 class="font-display text-2xl font-bold text-content">Built for watchers, not tourists</h2>
        <p class="mt-2 text-content-muted">Strange tools for people who stare at charts too long.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="item in highlights"
          :key="item.title"
          class="p-6 rounded-2xl border border-surface-border marketing-card-glass hover:border-brand/40 transition-colors"
        >
          <component :is="item.icon" class="w-8 h-8 text-brand mb-4" />
          <h3 class="font-semibold text-content mb-2">{{ item.title }}</h3>
          <p class="text-sm text-content-muted leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-20">
      <div class="rounded-2xl border border-surface-border marketing-card-glass overflow-hidden glow-ring">
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
        <h2 class="font-display text-2xl font-bold text-content">The void is live. Step in.</h2>
        <p class="mt-2 text-content-muted">No accounts. No friction. Just signal.</p>
        <RouterLink
          to="/terminal"
          class="inline-flex mt-6 px-7 py-3.5 rounded-full bg-brand text-white font-semibold hover:opacity-90 transition-opacity glow-ring"
        >
          Enter the Terminal
        </RouterLink>
      </div>
    </section>
  </MarketingLayout>
</template>
