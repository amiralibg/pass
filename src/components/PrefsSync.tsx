import { useEffect } from 'react'
import { usePrefs } from '../store/prefs'
import { useSession } from '../store/session'

/** Keeps <html> lang/dir/theme in sync with persisted preferences. */
export function PrefsSync() {
  const theme = usePrefs((s) => s.theme)
  const locale = usePrefs((s) => s.locale)
  const remapDefaultNames = useSession((s) => s.remapDefaultNames)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.lang = locale === 'fa' ? 'fa' : 'en'
    root.dir = locale === 'fa' ? 'rtl' : 'ltr'

    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0C0D10' : '#E8EAEF')
    }

    const metaScheme = document.querySelector('meta[name="color-scheme"]')
    if (metaScheme) {
      metaScheme.setAttribute('content', theme)
    }

    remapDefaultNames(locale)
  }, [theme, locale, remapDefaultNames])

  return null
}
