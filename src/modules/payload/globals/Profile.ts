import type { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Short Bio',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'about',
      label: 'About Me (Markdown)',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'displayLabel',
          type: 'text',
          label: 'Resume Display Label (optional)',
          admin: {
            description:
              'Overrides the label shown on the printed resume header. Navbar still uses Platform.',
          },
        },
        {
          name: 'icon',
          type: 'text', // simplified for now, could be select
          label: 'Icon Name (lucide-react)',
        },
      ],
    },
  ],
}
