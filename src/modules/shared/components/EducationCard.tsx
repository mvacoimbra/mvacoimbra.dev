'use client'

import { Avatar } from '@/src/modules/shared/components/ui/Avatar'
import { Card } from '@/src/modules/shared/components/ui/Card'
import Link from 'next/link'
import React from 'react'
import type { Education } from '@/src/lib/types'
import { format, parseISO } from 'date-fns'

interface EducationCardProps {
  education: Education
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    if (dateString.toLowerCase() === 'present') return 'Present'
    const date = parseISO(dateString)
    return format(date, 'MMM yyyy')
  } catch (e) {
    return dateString
  }
}

export const EducationCard = ({ education }: EducationCardProps) => {
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
                  <Link href={education.href} target="_blank" className="hover:underline">
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
                        {formatDate(education.start)} - {education.end ? formatDate(education.end) : 'Present'}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </Card.Root>
  )
}
