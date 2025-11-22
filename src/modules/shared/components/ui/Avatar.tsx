import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/src/lib/utils'

function AvatarRoot({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  )
}

type getAvatarFallbackParams = {
  fullName?: string
  firstName?: string
  secondName?: string
}

export function getAvatarFallback({
  fullName,
  firstName,
  secondName,
}: getAvatarFallbackParams) {
  if (fullName) {
    return fullName
      .split(' ')
      .map((name) => name[0])
      .join('')
  }

  if (firstName && secondName) {
    return firstName[0] + secondName[0]
  }

  return 'N/A'
}

const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
}

export { Avatar }
