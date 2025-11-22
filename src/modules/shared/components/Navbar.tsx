'use client'

import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import { Tooltip } from './ui/Tooltip'
import { Dock } from './magicui/Dock'
import { buttonVariants } from './ui/Button'
import { Separator } from './ui/Separator'
import { DynamicIcon } from 'lucide-react/dynamic'
import Image from 'next/image'
import { LinkIcon } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import * as _ from 'radashi'
import type { NavbarItem } from '@/src/lib/types'

export default function Navbar({ items }: { items: NavbarItem[] }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14 print:hidden">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock.Root className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {items.map((item) => {
          if (item.separator) {
            return (
              <Separator
                key={`${_.uid(4)}`}
                orientation="vertical"
                className="h-full"
              />
            )
          }

          return (
            <Dock.Icon key={item.href}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Link
                    href={item.href ?? '#'}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12',
                    )}
                  >
                    {item.iconName ? (
                      <DynamicIcon name={item.iconName} className="size-4" />
                    ) : item.customIconUrl ? (
                      <Image
                        src={item.customIconUrl}
                        alt={item.label ?? `Image: ${item.href}`}
                        className="size-4"
                      />
                    ) : (
                      <LinkIcon className="size-4" />
                    )}
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>{item.label}</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </Dock.Icon>
          )
        })}
        <Separator orientation="vertical" className="h-full py-2" />
        <Dock.Icon>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <ThemeToggle />
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Theme</p>
            </Tooltip.Content>
          </Tooltip.Root>
        </Dock.Icon>
      </Dock.Root>
    </div>
  )
}
