import { getPayloadClient } from './payload-client'
import type {
  Education as EducationType,
  NavbarItem,
  Profile as ProfileType,
  Project as ProjectType,
  Skill as SkillType,
  WorkExperience as WorkExperienceType,
} from './types'
import type { Media } from '@/src/modules/payload/payload-types'
import type { IconName } from 'lucide-react/dynamic'

// Helper to get URL from Media
const getMediaUrl = (media: Media | number | string | null | undefined): string => {
  if (!media) return ''
  if (typeof media === 'string') return media
  if (typeof media === 'number') return '' // Handle number case (ID reference) if needed, or fetch it. For now return empty string or placeholder.
  return media.url || ''
}

export async function getProfile(): Promise<ProfileType> {
  const payload = await getPayloadClient()
  const profile = await payload.findGlobal({
    slug: 'profile',
  })

  return {
    name: profile.name,
    avatarUrl: getMediaUrl(profile.avatar),
    description: profile.description,
    about: profile.about as string,
    socialLinks: (profile.socialLinks || []).map(link => ({
        platform: link.platform,
        url: link.url,
        icon: link.icon || undefined
    }))
  }
}

export async function getNavbarItems(): Promise<NavbarItem[]> {
  const payload = await getPayloadClient()
  const profile = await payload.findGlobal({
    slug: 'profile',
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
      label: 'Resume',
    },
    {
      href: '/',
      iconName: 'home',
      label: 'Home',
    },
    {
      separator: true,
    },
    ...socialLinks,
  ]
}

export async function getSkills(): Promise<SkillType[]> {
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

export async function getProjects(): Promise<ProjectType[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    sort: 'order',
    limit: 100,
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
      icon: undefined, // We can map icon based on type if needed, but type handles it in component usually
    })),
  }))
}

export async function getWorkExperience(): Promise<WorkExperienceType[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'work',
    sort: 'order', // We might want to sort by date, but let's stick to order field for manual control or fetch logic
    limit: 100,
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

export async function getEducation(): Promise<EducationType[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'education',
    sort: 'order',
    limit: 100,
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

