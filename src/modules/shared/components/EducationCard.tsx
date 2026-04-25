'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import type { Locale } from '@/src/i18n/routing'
import { formatMonthYear } from '@/src/lib/date'
import type { Education } from '@/src/lib/types'
import { Avatar } from './ui/Avatar'
import { Card } from './ui/Card'

interface EducationCardProps {
  education: Education
}

export const EducationCard = ({ education }: EducationCardProps) => {
  const locale = useLocale() as Locale
  const t = useTranslations('card')
  const present = t('present')
  const formatDate = (d: string) =>
    d?.toLowerCase() === 'present' ? present : formatMonthYear(d, locale)

  return (
    <Card.Root className="flex-row gap-4 border-none shadow-none bg-transparent overflow-hidden">
      {/* Logo Column */}
      <div className="flex flex-col items-center relative">
        <Avatar.Root className="border-2 border-muted-foreground/20 size-12 bg-muted-background dark:bg-foreground z-10">
          <Avatar.Image
            src={education.logoUrl}
            alt={education.school}
            className="object-contain"
          />
          <Avatar.Fallback>{education.school[0]}</Avatar.Fallback>
        </Avatar.Root>
      </div>

      {/* Content Column */}
      <div className="flex flex-col flex-1 pt-1 pb-8">
        {/* School Info */}
        <div className="mb-1">
          <h3 className="font-semibold text-base leading-none">
            {education.href ? (
              <Link
                href={education.href}
                target="_blank"
                className="hover:underline"
              >
                {education.school}
              </Link>
            ) : (
              education.school
            )}
          </h3>
        </div>

        {/* Degree & Date */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col">
              <h4 className="font-medium text-sm leading-none text-muted-foreground">
                {education.degree}
              </h4>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(education.start)} -{' '}
                {education.end ? formatDate(education.end) : present}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card.Root>
  )
}
