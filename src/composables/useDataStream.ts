import { startDataStream, stopDataStream } from '../services/dataStream'

/** @deprecated Use dashboard store startStream/stopStream/toggleStream instead */
export function useDataStream() {
  return {
    start: startDataStream,
    stop: stopDataStream,
  }
}
