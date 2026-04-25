'use client'

import { Globe } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/src/i18n/navigation'
import { cn } from '@/src/lib/utils'
import { buttonVariants } from '@/src/modules/shared/components/ui/Button'
import { DropdownMenu } from '@/src/modules/shared/components/ui/DropdownMenu'

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={t('navbar.localeSwitcher')}
        title={t('navbar.localeSwitcher')}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'size-12',
        )}
      >
        <Globe className="size-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="center" side="top">
        <DropdownMenu.Item asChild disabled={locale === 'en'}>
          <Link href={pathname} locale="en">
            {t('localeSwitcher.english')}
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild disabled={locale === 'pt-BR'}>
          <Link href={pathname} locale="pt-BR">
            {t('localeSwitcher.portuguese')}
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
