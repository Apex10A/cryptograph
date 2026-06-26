<script setup lang="ts">
import DashboardSidebarPanel from './DashboardSidebarPanel.vue'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="fixed inset-0 z-[80] lg:hidden">
        <button
          type="button"
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-label="Close navigation"
          @click="emit('close')"
        />

        <aside
          class="terminal-sidebar absolute inset-y-0 left-0 w-[min(18rem,88vw)] border-r border-surface-border shadow-2xl flex flex-col"
        >
          <DashboardSidebarPanel @navigate="emit('close')" />
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-enter-active aside,
.drawer-leave-active aside {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from aside,
.drawer-leave-to aside {
  transform: translateX(-100%);
}
</style>
