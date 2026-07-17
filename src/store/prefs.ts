import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'
export type Locale = 'en' | 'fa'

interface PrefsState {
  theme: Theme
  locale: Locale
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
  toggleTheme: () => void
  toggleLocale: () => void
}

export const usePrefs = create<PrefsState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      locale: 'en',
      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      toggleLocale: () => set({ locale: get().locale === 'en' ? 'fa' : 'en' }),
    }),
    { name: 'pass-prefs' },
  ),
)
