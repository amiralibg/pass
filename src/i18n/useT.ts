import { usePrefs } from '../store/prefs'
import { translate, type MessageKey } from './messages'

export function useT() {
  const locale = usePrefs((s) => s.locale)
  return (key: MessageKey, params?: Record<string, string | number>) =>
    translate(locale, key, params)
}
