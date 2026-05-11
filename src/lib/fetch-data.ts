import type { IconName } from 'lucide-react/dynamic'
import type { Locale } from '@/src/i18n/routing'
import type { Media } from '@/src/modules/payload/payload-types'
import { getPayloadClient } from './payload-client'
import type {
  Education as EducationType,
  NavbarItem,
  OpenGraph as OpenGraphType,
  Profile as ProfileType,
  Project as ProjectType,
  Skill as SkillType,
  WorkExperience as WorkExperienceType,
} from './types'

const getMediaUrl = (
  media: Media | number | string | null | undefined,
): string => {
  if (!media) return ''
  if (typeof media === 'string') return media
  if (typeof media === 'number') return ''
  return media.url || ''
}

export async function getProfile(locale: Locale): Promise<ProfileType> {
  const payload = await getPayloadClient()
  const profile = await payload.findGlobal({
    slug: 'profile',
    locale,
    fallbackLocale: 'en',
  })

  return {
    name: profile.name,
    avatarUrl: getMediaUrl(profile.avatar),
    description: profile.description,
    about: profile.about as string,
    socialLinks: (profile.socialLinks || []).map((link) => ({
      platform: link.platform,
      url: link.url,
      icon: link.icon || undefined,
      displayLabel: link.displayLabel || undefined,
    })),
  }
}

export async function getOpenGraph(locale: Locale): Promise<OpenGraphType> {
  const payload = await getPayloadClient()
  const og = await payload.findGlobal({
    slug: 'open-graph',
    locale,
    fallbackLocale: 'en',
  })

  return {
    title: og.title,
    description: og.description,
    imageUrl: getMediaUrl(og.image),
  }
}

export async function getNavbarItems(locale: Locale): Promise<NavbarItem[]> {
  const payload = await getPayloadClient()
  const profile = await payload.findGlobal({
    slug: 'profile',
    locale,
    fallbackLocale: 'en',
  })

  const socialLinks: NavbarItem[] = (profile.socialLinks || []).map((link) => ({
    href: link.url,
    label: link.platform,
    iconName: (link.icon as IconName) || 'link',
    target: '_blank',
  }))

  return [
    {
      href: '/resume',
      iconName: 'file-text',
      labelKey: 'navbar.resume',
    },
    {
      href: '/',
      iconName: 'home',
      labelKey: 'navbar.home',
    },
    {
      separator: true,
    },
    ...socialLinks,
  ]
}

export async function getSkills(_locale: Locale): Promise<SkillType[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'skills',
    sort: 'order',
    limit: 100,
  })

  return docs.map((doc) => ({
    name: doc.name,
    link: doc.link || undefined,
  }))
}

export async function getProjects(locale: Locale): Promise<ProjectType[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    sort: 'order',
    limit: 100,
    locale,
    fallbackLocale: 'en',
  })

  return docs.map((doc) => ({
    title: doc.title,
    subtitle: doc.subtitle || undefined,
    description: doc.description as string,
    technologies: (doc.technologies || [])
      .map((t) => t.name)
      .filter((n): n is string => !!n),
    thumbnailUrl: getMediaUrl(doc.thumbnail),
    links: (doc.links || []).map((link) => ({
      type: link.type as 'website' | 'source',
      href: link.url,
      icon: undefined,
    })),
  }))
}

export async function getWorkExperience(
  locale: Locale,
): Promise<WorkExperienceType[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'work',
    sort: 'order',
    limit: 100,
    locale,
    fallbackLocale: 'en',
  })

  return docs.map((doc) => ({
    companyName: doc.companyName,
    companyWebsiteUrl: doc.companyWebsiteUrl || undefined,
    companyLogoUrl: getMediaUrl(doc.companyLogo),
    roles: doc.roles.map((role) => ({
      title: role.title,
      start: role.start,
      end: role.end || undefined,
      description: role.description as string,
      technologies: (role.technologies || [])
        .map((t) => t.name)
        .filter((n): n is string => !!n),
    })),
  }))
}

export async function getEducation(locale: Locale): Promise<EducationType[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'education',
    sort: 'order',
    limit: 100,
    locale,
    fallbackLocale: 'en',
  })

  return docs.map((doc) => ({
    school: doc.school,
    href: doc.href || undefined,
    logoUrl: getMediaUrl(doc.logo),
    degree: doc.degree,
    start: doc.start,
    end: doc.end || undefined,
  }))
}
