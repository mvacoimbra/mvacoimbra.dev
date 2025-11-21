import type { IconName } from 'lucide-react/dynamic'
import type { HTMLAttributeAnchorTarget } from 'react'

export const PROFILE = {
  name: 'Marcos Coimbra',
  avatarUrl: 'https://avatars.githubusercontent.com/mvacoimbra',
  description: 'Software Engineer',
  about:
    "I'm Marcos Coimbra, a web developer passionate about problem-solving, with experience in design, prototyping, and building web and mobile applications, currently part of the Progete team, and for me development is my true vocation where the constant challenge of solving problems feels like an endless puzzle game.",
}

type Skill = {
  name: string
  link?: string
}

export const SKILLS: Array<Skill> = [
  {
    name: 'React',
    link: 'https://reactjs.org/',
  },
  {
    name: 'Next.js',
    link: 'https://nextjs.org/',
  },
]

type NavbarItem = {
  href?: HTMLAnchorElement['href']
  target?: HTMLAttributeAnchorTarget
  separator?: boolean
  iconName?: IconName
  label?: string
  customIconUrl?: string
}

export const NAVBAR_ITEMS: Array<NavbarItem> = [
  {
    href: '/',
    iconName: 'home',
    label: 'Home',
  },
  {
    separator: true,
  },
  {
    href: 'https://linkedin.com/in/mvacoimbra',
    iconName: 'linkedin',
    label: 'LinkedIn',
    target: '_blank',
  },
]

export type Project = {
  title: string
  subtitle?: string
  description: string
  technologies: Array<string>
  thumbnailUrl?: string
  links?: Array<{
    type: 'website' | 'source'
    href: HTMLAnchorElement['href']
    icon?: IconName
  }>
}

export type ProjectData = Array<Project>

export const PROJECTS: Array<Project> = [
  {
    title: 'Chat Collect',
    thumbnailUrl: 'https://avatars.githubusercontent.com/mvacoimbra',
    description:
      'With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.',
    technologies: [
      'Next.js',
      'Typescript',
      'PostgreSQL',
      'Prisma',
      'TailwindCSS',
      'Stripe',
      'Shadcn UI',
      'Magic UI',
    ],
    links: [
      {
        type: 'website',
        href: 'https://chatcollect.com',
      },
    ],
  },
]

type WorkRole = {
  title: string
  start: string // ISO 8601
  end?: string // ISO 8601
  description: string
}

export type WorkExperience = {
  companyName: string
  companyWebsiteUrl?: string
  companyLogoUrl?: string
  roles: Array<WorkRole>
}

export type WorkExperienceData = Array<WorkExperience>

export const WORK: Array<WorkExperience> = [
  {
    companyName: 'Bunch Software',
    companyWebsiteUrl: 'https://google.com',
    companyLogoUrl: '/bunch.png',
    roles: [
      {
        title: 'Software Engineer',
        start: '2023-05-01',
        end: '2023-10-01',
        description:
          'Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.',
      },
    ],
  },
]

type Education = {
  school: string
  href?: HTMLAnchorElement['href']
  logoUrl?: string
  degree: string
  start: string // ISO 8601
  end?: string // ISO 8601
}

export const EDUCATION: Array<Education> = [
  {
    school: 'Buildspace',
    href: 'https://buildspace.so',
    degree: 's3, s4, sf1, s5',
    logoUrl: '/buildspace.jpg',
    start: '2023',
    end: '2024',
  },
]
