import type { Project } from '@/src/lib/data'
import { cn } from '@/src/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import * as _ from 'radashi'
import { Markdown } from './mdx'
import { Badge } from './ui/Badge'
import { Card } from './ui/Card'

interface Props {
  data: Project
  className?: string
}

export function ProjectCard({ data, className }: Props) {
  return (
    <Card.Root
      className={
        'flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full'
      }
    >
      <div className={cn('block cursor-pointer', className)}>
        {data.thumbnailUrl && (
          <Image
            src={data.thumbnailUrl}
            alt={data.title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </div>
      <Card.Header className="px-2">
        <div className="space-y-1">
          <Card.Title className="mt-1 text-base">{data.title}</Card.Title>
          {data.subtitle && (
            <span className="font-sans text-xs">{data.subtitle}</span>
          )}
          {/* <div className="hidden font-sans text-xs underline print:visible"> */}
          {/*   {link?.replace('https://', '').replace('www.', '').replace('/', '')} */}
          {/* </div> */}
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {data.description}
          </Markdown>
        </div>
      </Card.Header>
      <Card.Content className="mt-auto flex flex-col px-2">
        {data.technologies && data.technologies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {data.technologies?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card.Content>
      <Card.Footer className="px-2 pb-2">
        {data.links && data.links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {data.links?.map((link) => (
              <Link href={link?.href} key={`${_.uid(4)}`} target="_blank">
                <Badge
                  key={`${_.uid(4)}`}
                  className="flex gap-2 px-2 py-1 text-[10px]"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </Card.Footer>
    </Card.Root>
  )
}
