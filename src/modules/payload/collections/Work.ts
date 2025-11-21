import type { CollectionConfig } from 'payload'

export const Work: CollectionConfig = {
  slug: 'work',
  admin: {
    useAsTitle: 'companyName',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'companyWebsiteUrl',
      type: 'text',
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'start',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'yyyy-MM',
            },
          },
        },
        {
          name: 'end',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'yyyy-MM',
            },
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description (Markdown)',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    }
  ],
}

