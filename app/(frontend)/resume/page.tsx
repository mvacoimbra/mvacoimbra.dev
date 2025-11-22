import { PrintButton } from '@/src/modules/shared/components/PrintButton'
import { getEducation, getProfile, getSkills, getWorkExperience } from '@/src/lib/fetch-data'
import { cn } from '@/src/lib/utils'
import { DynamicIcon } from 'lucide-react/dynamic'
import { format, parseISO } from 'date-fns'

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    if (dateString.toLowerCase() === 'present') return 'present'
    const date = parseISO(dateString)
    return format(date, 'MM/yyyy')
  } catch (e) {
    return dateString
  }
}

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold mt-6 mb-4 text-red-900 dark:text-red-400 print:text-red-900 flex items-center gap-1 font-mono">
    <span>{'<'}</span>
    {children}
    <span>{' />'}</span>
  </h2>
)

export default async function ResumePage() {
  const [profile, work, education, skills] = await Promise.all([
    getProfile(),
    getWorkExperience(),
    getEducation(),
    getSkills(),
  ])

  return (
    <main className="min-h-screen bg-background font-mono text-foreground p-8 md:p-16 print:p-0 print:bg-white print:text-black">
      <PrintButton />
      
      <div className="max-w-7xl mx-auto print:w-full print:max-w-none">
        {/* Header */}
        <header className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-wide">{profile.name}</h1>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {profile.socialLinks?.map((link) => (
              <a 
                key={link.platform} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline print:no-underline print:text-black"
              >
                 <DynamicIcon name={link.icon as any || 'link'} className="size-4" />
                 <span>{link.platform}</span>
              </a>
            ))}
          </div>
        </header>

        {/* Skills */}
        <section>
          <SectionHeader>Skills</SectionHeader>
          <div className="text-sm leading-relaxed">
            {skills.map((skill, index) => (
              <span key={skill.name}>
                {skill.name}
                {index < skills.length - 1 && <span className="mx-2 text-muted-foreground/50 print:text-gray-400">|</span>}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <SectionHeader>Experience</SectionHeader>
          <div className="space-y-8">
            {work.map((job) => (
              <div key={job.companyName}>
                {job.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="mb-6 last:mb-0 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-bold text-base underline decoration-1 underline-offset-4">
                        {job.companyName} {job.roles.length > 1 ? `- ${role.title}` : ''}
                      </h3>
                      <span className="text-sm shrink-0 ml-4">
                        {formatDate(role.start)} - {role.end ? formatDate(role.end) : 'present'}
                      </span>
                    </div>
                    
                    {/* Single Role title if company has multiple roles is handled above, 
                        but if it's the only role, maybe show title separately or combine?
                        The design shows "Moz - SEO (Bunch Software)".
                        Let's stick to "Company" as main, then role details.
                    */}
                    {job.roles.length === 1 && (
                       <div className="font-bold text-sm mb-2 hidden">{role.title}</div> 
                       // The design merges Company and Role or shows Role (Company). 
                       // My data is grouped by company.
                    )}

                    <div className="grid grid-cols-1 gap-4">
                      {/* Technologies */}
                      {role.technologies && role.technologies.length > 0 && (
                        <div className="text-sm mb-2">
                           <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
                              {role.technologies.map(tech => (
                                <div key={tech} className="whitespace-nowrap overflow-hidden text-ellipsis">
                                  <span className="mr-1">{'>'}</span> {tech}
                                </div>
                              ))}
                           </div>
                        </div>
                      )}

                      <div className="text-sm space-y-2">
                         {/* Description */}
                         <div className="text-sm text-justify whitespace-pre-line">
                            {role.description}
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionHeader>Education</SectionHeader>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.school} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <span className="text-sm">
                    {formatDate(edu.start)} - {edu.end ? formatDate(edu.end) : 'present'}
                  </span>
                </div>
                <div className="text-sm underline decoration-1 underline-offset-4 mb-1">{edu.school}</div>
                {/* Description if any */}
              </div>
            ))}
          </div>
        </section>

        {/* About Me */}
        <section>
          <SectionHeader>AboutMe</SectionHeader>
          <div className="text-sm leading-relaxed text-justify">
            {profile.about}
          </div>
        </section>
        
      </div>
    </main>
  )
}

