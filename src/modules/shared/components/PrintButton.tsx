'use client'

import { PrinterIcon } from 'lucide-react'
import { Button } from './ui/Button'

export const PrintButton = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 z-50 print:hidden"
      onClick={() => window.print()}
    >
      <PrinterIcon className="size-4" />
    </Button>
  )
}
