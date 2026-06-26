<script setup lang="ts">
import DashboardSidebarPanel from './DashboardSidebarPanel.vue'
</script>

<template>
  <aside
    class="terminal-sidebar hidden lg:flex flex-col shrink-0 border-r border-surface-border h-screen sticky top-0"
  >
    <DashboardSidebarPanel />
  </aside>
</template>
