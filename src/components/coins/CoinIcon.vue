<script setup lang="ts">
import { computed } from 'vue'
import { getCoinIconUrl } from '../../config/coinIcons'

const props = withDefaults(
  defineProps<{
    coinId: string
    symbol: string
    size?: 'xs' | 'sm' | 'md'
  }>(),
  { size: 'sm' },
)

const sizeClass = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
}

const iconUrl = computed(() => getCoinIconUrl(props.coinId))
</script>

<template>
  <img
    v-if="iconUrl"
    :src="iconUrl"
    :alt="`${symbol} icon`"
    :class="['rounded-full object-cover shrink-0 bg-surface border border-surface-border', sizeClass[size]]"
    loading="lazy"
  />
  <span
    v-else
    :class="[
      'inline-flex items-center justify-center rounded-full bg-brand/15 text-brand font-bold shrink-0 border border-brand/25',
      sizeClass[size],
      size === 'xs' ? 'text-[8px]' : size === 'sm' ? 'text-[10px]' : 'text-xs',
    ]"
  >
    {{ symbol.slice(0, 2) }}
  </span>
</template>
