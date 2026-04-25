import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Locale } from '@/src/i18n/routing'

const DATE_FNS_LOCALE = {
  en: undefined,
  'pt-BR': ptBR,
} as const

export function formatMonthYear(
  dateString: string | undefined | null,
  locale: Locale,
  pattern: string = 'MMM yyyy',
): string {
  if (!dateString) return ''
  try {
    const date = parseISO(dateString)
    return format(date, pattern, { locale: DATE_FNS_LOCALE[locale] })
  } catch (_e) {
    return dateString
  }
}
