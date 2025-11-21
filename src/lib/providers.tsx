'use client'

import { ThemeProvider } from '@/src/modules/shared/providers/ThemeProvider'
import { Tooltip } from '@/src/modules/shared/components/ui/Tooltip'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Tooltip.Provider delayDuration={10}>
        {children}
      </Tooltip.Provider>
    </ThemeProvider>
  )
}
