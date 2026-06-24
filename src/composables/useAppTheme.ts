import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'cryptoflow-theme',
  initialValue: 'dark',
})

export function useAppTheme() {
  const toggleTheme = useToggle(isDark)

  return {
    isDark,
    toggleTheme,
  }
}
