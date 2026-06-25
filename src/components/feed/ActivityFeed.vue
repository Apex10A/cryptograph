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
import { useOracleMode } from '../../composables/useOracleMode'
import type { TradeEvent } from '../../types'

const store = useDashboardStore()
const { oracleText } = useOracleMode()
const globalFilter = ref('')

const columnHelper = createColumnHelper<TradeEvent>()

const columns = [
  columnHelper.accessor('timestamp', {
    header: 'Time',
    cell: (info) => new Date(info.getValue()).toLocaleTimeString(),
  }),
  columnHelper.accessor('coin', {
    header: 'Coin',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => {
      const type = info.getValue()
      const colors: Record<string, string> = {
        BUY: 'text-brand',
        SELL: 'text-danger',
        ALERT: 'text-warning',
        LIQUIDATION: 'text-danger font-bold underline',
      }
      return `<span class="${colors[type]}">${type}</span>`
    },
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `$${info.getValue().toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue().toFixed(4),
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: (info) => `$${info.getValue().toLocaleString(undefined, { minimumFractionDigits: 0 })}`,
  }),
  columnHelper.accessor('severity', {
    header: 'Severity',
    cell: (info) => {
      const severity = info.getValue()
      const colors: Record<string, string> = {
        low: 'bg-content-muted',
        medium: 'bg-warning',
        high: 'bg-danger animate-pulse',
      }
      return `<span class="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold text-black ${colors[severity]}">${severity}</span>`
    },
  }),
]

const table = useVueTable({
  get data() {
    return store.activityFeed
  },
  columns,
  state: {
    get globalFilter() {
      return globalFilter.value
    },
  },
  onGlobalFilterChange: (val) => {
    globalFilter.value = val
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

const emptyState = computed(() => {
  if (globalFilter.value.trim()) {
    return {
      title: 'No matching trades',
      description: `Nothing matched "${globalFilter.value}". Try another coin symbol or trade type.`,
    }
  }

  if (store.streamStatus === 'paused') {
    return {
      title: oracleText('Stream paused'),
      description: oracleText(
        'Resume the stream to listen for live Binance trades.',
      ),
    }
  }

  if (store.streamStatus === 'reconnecting') {
    return {
      title: 'Reconnecting to Binance',
      description: 'The live feed will populate again as soon as the socket reconnects.',
    }
  }

  if (store.streamStatus === 'error') {
    return {
      title: 'Feed connection error',
      description: 'Unable to receive live trades right now. Try pausing and resuming the stream.',
    }
  }

  return {
    title: oracleText('Listening for live trades'),
    description: oracleText(
      'Large Binance trades ($25k+) will appear here in real time.',
    ),
  }
})

const getRowClass = (type: string) => {
  const base = 'border-b border-surface-border transition-colors hover:bg-surface-hover '
  const tints: Record<string, string> = {
    BUY: 'bg-brand/5',
    SELL: 'bg-danger/5',
    ALERT: 'bg-warning/5',
    LIQUIDATION: 'bg-danger/10',
  }
  return base + (tints[type] || '')
}
</script>

<template>
  <div class="terminal-panel overflow-hidden">
    <div class="p-4 border-b border-surface-border flex justify-between items-center gap-3">
      <h2 class="font-semibold flex items-center gap-2 text-content text-sm">
        <span class="flex h-2 w-2 relative">
          <span
            v-if="store.streamStatus === 'live'"
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"
          />
          <span
            :class="[
              'relative inline-flex rounded-full h-2 w-2',
              store.streamStatus === 'live' ? 'bg-brand' : 'bg-content-muted',
            ]"
          />
        </span>
        {{ oracleText('LIVE ACTIVITY FEED') }}
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
              class="px-4 py-3 text-content-muted font-semibold uppercase tracking-wider border-b border-surface-border"
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
              <span v-else v-html="cell.renderValue()" />
            </td>
          </tr>
          <tr v-if="table.getRowModel().rows.length === 0">
            <td colspan="7" class="px-4 py-12 text-center">
              <div class="flex flex-col items-center gap-3">
                <div class="w-12 h-12 rounded-full border border-surface-border flex items-center justify-center">
                  <span
                    :class="[
                      'w-2 h-2 rounded-full',
                      store.streamStatus === 'live' ? 'bg-brand animate-pulse' : 'bg-content-muted',
                    ]"
                  />
                </div>
                <div>
                  <p class="font-semibold text-content">{{ emptyState.title }}</p>
                  <p class="text-sm text-content-muted mt-1 max-w-md mx-auto">{{ emptyState.description }}</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
