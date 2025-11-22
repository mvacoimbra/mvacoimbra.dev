'use client'

import { Avatar } from '@/src/modules/shared/components/ui/Avatar'
import { Card } from '@/src/modules/shared/components/ui/Card'
import { ChevronRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/src/lib/utils'
import type { WorkExperience, WorkRole } from '@/src/lib/types'
import { format, parseISO } from 'date-fns'

interface WorkCardProps {
  experience: WorkExperience
  isLast: boolean
}

export const WorkCard = ({ experience, isLast }: WorkCardProps) => {
  return (
    <Card.Root className="flex-row gap-4 border-none shadow-none bg-transparent overflow-visible">
      {/* Logo Column */}
      <div className="flex flex-col items-center relative">
        <Avatar.Root className="border-2 border-muted-foreground/20 size-12 bg-muted-background z-10">
          <Avatar.Image
            src={experience.companyLogoUrl}
            alt={experience.companyName}
            className="object-contain"
          />
          <Avatar.Fallback>{experience.companyName[0]}</Avatar.Fallback>
        </Avatar.Root>
        {/* Vertical line connecting roles */}
        {!isLast && (
             <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[2px] bg-muted-foreground/20 h-[calc(100%+2rem)]" />
        )}
      </div>

      {/* Content Column */}
      <div className="flex flex-col flex-1 pt-1 pb-8">
        {/* Company Info */}
        <div className="mb-4">
            <h3 className="font-semibold text-base leading-none">
              {experience.companyWebsiteUrl ? (
                  <Link href={experience.companyWebsiteUrl} target="_blank" className="hover:underline">
                      {experience.companyName}
                  </Link>
              ) : (
                  experience.companyName
              )}
            </h3>
        </div>
        
        {/* Roles */}
        <div className="flex flex-col gap-6">
          {experience.roles.map((role, index) => (
             <RoleItem key={index} role={role} />
          ))}
        </div>
      </div>
    </Card.Root>
  )
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    // Handle 'Present' case if it's passed as string or empty
    if (dateString.toLowerCase() === 'present') return 'Present'
    
    // Parse ISO string (YYYY-MM-DD or YYYY-MM)
    const date = parseISO(dateString)
    return format(date, 'MMM yyyy')
  } catch (e) {
    return dateString
  }
}

import { Badge } from '@/src/modules/shared/components/ui/Badge'

const RoleItem = ({ role }: { role: WorkRole }) => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-1 group">
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col">
            <h4 className="font-medium text-sm leading-none flex items-center gap-1">
              {role.title}
            </h4>
            <div className="text-xs text-muted-foreground mt-1">
              {formatDate(role.start)} - {role.end ? formatDate(role.end) : 'Present'}
            </div>
          </div>
        </div>

        {role.description && (
          <div className="text-xs sm:text-sm text-muted-foreground mt-2">
            {role.description}
          </div>
        )}
        
        {role.technologies && role.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {role.technologies.map((tech, index) => (
              <Badge key={index} variant="default" className="text-[10px] px-1 py-0">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

