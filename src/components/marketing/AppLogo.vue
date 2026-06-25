<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    to?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { to: '/', size: 'md' },
)

const sizeClass = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
}
</script>

<template>
  <RouterLink
    :to="to"
    :class="['font-black tracking-tighter text-content hover:opacity-90 transition-opacity', sizeClass[size]]"
  >
    CRYPTO<span class="text-brand">FLOW</span>
  </RouterLink>
</template>
