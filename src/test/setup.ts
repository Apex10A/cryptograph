import { vi } from 'vitest'

vi.mock('@/services/dataStream', () => ({
  registerDataStream: vi.fn(),
  startDataStream: vi.fn(),
  stopDataStream: vi.fn(),
}))
