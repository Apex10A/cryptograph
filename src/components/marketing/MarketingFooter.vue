<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppLogo from './AppLogo.vue'
</script>

<template>
  <footer class="border-t border-surface-border bg-surface-card mt-auto">
    <div class="max-w-6xl mx-auto px-6 py-10">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <AppLogo size="sm" />
          <p class="mt-3 text-sm text-content-muted max-w-xs">
            A demo crypto trading terminal powered by live market data. Not financial advice.
          </p>
        </div>

        <div class="flex gap-12">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-content-muted mb-3">Product</p>
            <ul class="space-y-2 text-sm">
              <li>
                <RouterLink to="/terminal" class="text-content-muted hover:text-brand transition-colors">
                  Terminal
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/features" class="text-content-muted hover:text-brand transition-colors">
                  Features
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/about" class="text-content-muted hover:text-brand transition-colors">
                  About
                </RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-content-muted mb-3">Data</p>
            <ul class="space-y-2 text-sm text-content-muted">
              <li>CoinGecko REST</li>
              <li>Binance WebSocket</li>
            </ul>
          </div>
        </div>
      </div>

      <p class="mt-8 pt-6 border-t border-surface-border text-xs text-content-muted text-center">
        © {{ new Date().getFullYear() }} CryptoFlow · Built for learning and demonstration purposes
      </p>
    </div>
  </footer>
</template>
