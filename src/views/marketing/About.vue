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
    <section class="max-w-6xl mx-auto px-6 pt-16 pb-12">
      <p class="text-sm font-semibold uppercase tracking-widest text-brand mb-3">About</p>
      <h1 class="text-3xl sm:text-4xl font-bold text-content max-w-2xl">
        Built to learn, demo, and explore live crypto data
      </h1>
      <p class="mt-4 text-content-muted max-w-2xl leading-relaxed">
        CryptoFlow started as a portfolio-grade trading terminal demo — combining real APIs,
        reactive charts, and a polished dark-mode UI. It is not a brokerage and does not
        execute trades.
      </p>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-12">
      <h2 class="text-xl font-bold text-content mb-4">Mission</h2>
      <div class="p-6 rounded-xl border border-surface-border bg-surface-card">
        <p class="text-content-muted leading-relaxed">
          The goal is to showcase how modern front-end tooling can deliver a professional
          crypto dashboard experience: live streams, responsive layouts, accessible themes,
          and clean component architecture — all open source and easy to extend.
        </p>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-12">
      <h2 class="text-xl font-bold text-content mb-4">Data sources</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="source in dataSources"
          :key="source.name"
          class="p-5 rounded-xl border border-surface-border bg-surface-card"
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
          class="p-4 rounded-xl border border-surface-border bg-surface-card"
        >
          <p class="font-semibold text-content">{{ item.name }}</p>
          <p class="text-xs text-content-muted mt-1">{{ item.role }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-20">
      <div class="p-6 rounded-xl border border-warning/30 bg-warning/5">
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
          class="inline-flex px-6 py-3 rounded-xl bg-brand text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Open Terminal
        </RouterLink>
      </div>
    </section>
  </MarketingLayout>
</template>
