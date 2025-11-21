import { fileURLToPath } from 'node:url'
import getPayloadConfig from '@payload-config'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import './globals.css'
import { Button } from '@/src/modules/shared/components/ui/button'

export default async function HomePage() {
  return (
    <div>
      <Button>Hello</Button>
    </div>
  )
}
