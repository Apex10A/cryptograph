<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getFilteredRowModel,
  FlexRender,
  createColumnHelper,
} from '@tanstack/vue-table'
import { useDashboardStore } from '../../stores/dashboardStore'
import type { TradeEvent } from '../../types'

const store = useDashboardStore()
const globalFilter = ref('')

const columnHelper = createColumnHelper<TradeEvent>()

const columns = [
  columnHelper.accessor('timestamp', {
    header: 'Time',
    cell: info => new Date(info.getValue()).toLocaleTimeString(),
  }),
  columnHelper.accessor('coin', {
    header: 'Coin',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => {
      const type = info.getValue()
      const colors: Record<string, string> = {
        BUY: 'text-brand',
        SELL: 'text-danger',
        ALERT: 'text-warning',
        LIQUIDATION: 'text-danger font-bold underline'
      }
      return `<span class="${colors[type]}">${type}</span>`
    },
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: info => `$${info.getValue().toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: info => info.getValue().toFixed(4),
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: info => `$${info.getValue().toLocaleString(undefined, { minimumFractionDigits: 0 })}`,
  }),
  columnHelper.accessor('severity', {
    header: 'Severity',
    cell: info => {
      const severity = info.getValue()
      const colors: Record<string, string> = {
        low: 'bg-gray-500',
        medium: 'bg-warning',
        high: 'bg-danger animate-pulse'
      }
      return `<span class="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold text-black ${colors[severity]}">${severity}</span>`
    },
  }),
]

const table = useVueTable({
  get data() { return store.activityFeed },
  columns,
  state: {
    get globalFilter() { return globalFilter.value },
  },
  onGlobalFilterChange: (val) => { globalFilter.value = val },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

const getRowClass = (type: string) => {
  const base = 'border-b border-surface-border transition-colors hover:bg-surface-hover '
  const tints: Record<string, string> = {
    BUY: 'bg-brand bg-opacity-[0.02]',
    SELL: 'bg-danger bg-opacity-[0.02]',
    ALERT: 'bg-warning bg-opacity-[0.02]',
    LIQUIDATION: 'bg-danger bg-opacity-[0.05]'
  }
  return base + (tints[type] || '')
}
</script>

<template>
  <div class="bg-surface-card rounded-xl border border-surface-border overflow-hidden">
    <div class="p-4 border-b border-surface-border flex justify-between items-center bg-surface-card">
      <h2 class="font-bold flex items-center gap-2">
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
        </span>
        LIVE ACTIVITY FEED
      </h2>
      <input
        v-model="globalFilter"
        type="text"
        placeholder="Filter by coin or type..."
        class="bg-surface border border-surface-border rounded-md px-3 py-1 text-sm focus:border-brand outline-none transition-all w-64"
      />
    </div>

    <div class="overflow-x-auto max-h-[400px]">
      <table class="w-full text-left text-sm font-mono">
        <thead class="bg-surface sticky top-0 z-10">
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="px-4 py-3 text-gray-500 font-bold uppercase tracking-wider border-b border-surface-border"
            >
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :class="getRowClass(row.original.type)"
            v-memo="[row.original.id, row.original.type]"
          >
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="px-4 py-3 whitespace-nowrap">
              <span v-if="typeof cell.column.columnDef.cell === 'string'">
                {{ cell.getValue() }}
              </span>
              <span v-else v-html="cell.renderValue()"></span>
            </td>
          </tr>
          <tr v-if="table.getRowModel().rows.length === 0">
            <td colspan="7" class="px-4 py-8 text-center text-gray-500 italic">
              Waiting for live trade data...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
