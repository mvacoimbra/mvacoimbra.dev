import type { IconName } from 'lucide-react/dynamic'
import type { HTMLAttributeAnchorTarget } from 'react'

export type Skill = {
  name: string
  link?: string
}

export type NavbarItem = {
  href?: string
  target?: HTMLAttributeAnchorTarget
  separator?: boolean
  iconName?: IconName
  label?: string
  customIconUrl?: string
}

export type Project = {
  title: string
  subtitle?: string
  description: string
  technologies: Array<string>
  thumbnailUrl?: string
  links?: Array<{
    type: 'website' | 'source'
    href: string
    icon?: IconName
  }>
}

export type WorkRole = {
  title: string
  start: string // ISO 8601
  end?: string // ISO 8601
  description: string
  technologies?: string[]
}

export type WorkExperience = {
  companyName: string
  companyWebsiteUrl?: string
  companyLogoUrl?: string
  roles: Array<WorkRole>
}

export type Education = {
  school: string
  href?: string
  logoUrl?: string
  degree: string
  start: string // ISO 8601
  end?: string // ISO 8601
}

export type Profile = {
  name: string
  avatarUrl: string
  description: string
  about: string
}
