import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Languages, Moon, Sun } from 'lucide-react'
import { usePrefs } from '../../store/prefs'
import { useT } from '../../i18n/useT'
import { cn } from '../../lib/cn'

export function HomeControls() {
  const theme = usePrefs((s) => s.theme)
  const locale = usePrefs((s) => s.locale)
  const toggleTheme = usePrefs((s) => s.toggleTheme)
  const toggleLocale = usePrefs((s) => s.toggleLocale)
  const t = useT()

  return (
    <div className="flex items-center justify-end gap-2">
      <ToggleChip
        onClick={toggleLocale}
        aria-label={locale === 'en' ? t('home.localeFa') : t('home.localeEn')}
        title={locale === 'en' ? t('home.localeFa') : t('home.localeEn')}
      >
        <Languages className="size-4" strokeWidth={2.25} />
        <span className="font-display text-xs font-bold tracking-wide">
          {locale === 'en' ? 'فا' : 'EN'}
        </span>
      </ToggleChip>

      <ToggleChip
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('home.themeLight') : t('home.themeDark')}
        title={theme === 'dark' ? t('home.themeLight') : t('home.themeDark')}
      >
        {theme === 'dark' ? (
          <Sun className="size-4" strokeWidth={2.25} />
        ) : (
          <Moon className="size-4" strokeWidth={2.25} />
        )}
      </ToggleChip>
    </div>
  )
}

function ToggleChip({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-10 items-center gap-1.5 rounded-full border border-fog/12 bg-smoke px-3 text-fog transition-[transform,background-color,border-color] duration-200',
        'hover:-translate-y-0.5 hover:border-fog/22 hover:bg-smoke-strong active:translate-y-0',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
