<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MarketingLayout from '../../layouts/MarketingLayout.vue'

const stack = [
  { name: 'Vue 3', role: 'UI framework' },
  { name: 'TypeScript', role: 'Type safety' },
  { name: 'Pinia', role: 'State management' },
  { name: 'ECharts', role: 'Charting' },
  { name: 'Tailwind CSS', role: 'Styling' },
  { name: 'Vite', role: 'Build tool' },
]

const dataSources = [
  {
    name: 'CoinGecko',
    description: 'REST API for initial market snapshots — price, volume, market cap, and 24h stats.',
  },
  {
    name: 'Binance',
    description: 'Public WebSocket aggTrade stream for live prices and significant trade events.',
  },
]
</script>

<template>
  <MarketingLayout>
    <section class="relative max-w-6xl mx-auto px-6 pt-16 pb-12">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand mb-3">Origin</p>
      <h1 class="font-display text-3xl sm:text-4xl font-extrabold text-content max-w-2xl">
        A terminal born from
        <span class="text-gradient-brand"> curiosity, not commerce</span>
      </h1>
      <p class="mt-4 text-content-muted max-w-2xl leading-relaxed">
        CryptoFlow is an open-source experiment — a place to wire real market APIs into a
        strange, beautiful interface. It does not execute trades. It does not pretend to be
        a brokerage. It watches.
      </p>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-12">
      <h2 class="font-display text-xl font-bold text-content mb-4">Why it exists</h2>
      <div class="p-6 rounded-2xl border border-surface-border marketing-card-glass">
        <p class="text-content-muted leading-relaxed">
          Most crypto dashboards look identical — same fonts, same teal, same corporate calm.
          Aurora Ink is our answer: uncommon type, warm void palettes, and a terminal that
          feels like stepping into someone else's obsession.
        </p>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-12">
      <h2 class="text-xl font-bold text-content mb-4">Data sources</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="source in dataSources"
          :key="source.name"
          class="p-5 rounded-2xl border border-surface-border marketing-card-glass"
        >
          <h3 class="font-semibold text-brand mb-2">{{ source.name }}</h3>
          <p class="text-sm text-content-muted leading-relaxed">{{ source.description }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-12">
      <h2 class="text-xl font-bold text-content mb-4">Tech stack</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div
          v-for="item in stack"
          :key="item.name"
          class="p-4 rounded-2xl border border-surface-border marketing-card-glass"
        >
          <p class="font-semibold text-content">{{ item.name }}</p>
          <p class="text-xs text-content-muted mt-1">{{ item.role }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-20">
      <div class="p-6 rounded-2xl border border-warning/30 bg-warning/5 marketing-card-glass">
        <h2 class="font-semibold text-content mb-2">Disclaimer</h2>
        <p class="text-sm text-content-muted leading-relaxed">
          CryptoFlow is for educational and demonstration purposes only. Prices and data may
          be delayed or inaccurate. Nothing on this site constitutes financial advice. Always
          do your own research before making investment decisions.
        </p>
      </div>

      <div class="mt-8 text-center">
        <RouterLink
          to="/terminal"
          class="inline-flex px-7 py-3.5 rounded-full bg-brand text-white font-semibold hover:opacity-90 transition-opacity glow-ring"
        >
          Enter the Terminal
        </RouterLink>
      </div>
    </section>
  </MarketingLayout>
</template>
