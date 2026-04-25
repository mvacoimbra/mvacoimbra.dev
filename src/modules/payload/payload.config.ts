// storage-adapter-import-placeholder

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Education } from './collections/Education'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Users } from './collections/Users'
import { Work } from './collections/Work'
import { OpenGraph } from './globals/OpenGraph'
import { Profile } from './globals/Profile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, Work, Education, Skills],
  globals: [Profile, OpenGraph],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  localization: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
