import BlurFade from '@/src/modules/shared/components/magicui/BlurFade'
import BlurFadeText from '@/src/modules/shared/components/magicui/BlurFadeText'
import { ProjectCard } from '@/src/modules/shared/components/ProjectCard'
import {
  Avatar,
  getAvatarFallback,
} from '@/src/modules/shared/components/ui/Avatar'
import { Badge } from '@/src/modules/shared/components/ui/Badge'
import { Markdown } from '@/src/modules/shared/components/mdx'
import Link from 'next/link'
import {
  getEducation,
  getProfile,
  getProjects,
  getSkills,
  getWorkExperience,
} from '@/src/lib/fetch-data'
import { EducationCard } from '@/src/modules/shared/components/EducationCard'
import { WorkCard } from '@/src/modules/shared/components/WorkCard'

const BLUR_FADE_DELAY = 0.04

export default async function Page() {
  const [PROFILE, WORK, EDUCATION, SKILLS, PROJECTS] = await Promise.all([
    getProfile(),
    getWorkExperience(),
    getEducation(),
    getSkills(),
    getProjects(),
  ])

  return (
    <main className="flex flex-col min-h-dvh space-y-10 max-w-2xl mx-auto py-12 sm:py-24 px-6">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${PROFILE.name} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={PROFILE.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar.Root className="size-28 border">
                <Avatar.Image
                  alt={`${PROFILE.name} profile image`}
                  src={PROFILE.avatarUrl}
                />
                <Avatar.Fallback>
                  {getAvatarFallback({
                    fullName: PROFILE.name,
                  })}
                </Avatar.Fallback>
              </Avatar.Root>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {PROFILE.about}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {WORK.map((work, id) => (
            <BlurFade
              key={work.companyName}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <WorkCard experience={work} isLast={id === WORK.length - 1} />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {EDUCATION.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <EducationCard education={education} />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {SKILLS.map((skill, id) => (
              <BlurFade
                key={skill.name}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              >
                <Badge asChild>
                  <Link href={skill.link ?? '#'} target="_blank">
                    {skill.name}
                  </Link>
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {PROJECTS.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard key={project.title} data={project} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hey! I just met you, and this is crazy, but here's my{' '}
                <Link
                  href={'https://linkedin.com/in/mvacoimbra'}
                  className="text-blue-500 hover:underline"
                >
                  linkedin
                </Link>
                , so dm me maybe.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  )
}
