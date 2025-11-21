import type { CollectionConfig } from 'payload'

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'school',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'school',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'degree',
      type: 'text',
      required: true,
    },
    {
      name: 'start',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy',
        },
      },
    },
    {
      name: 'end',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy',
        },
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    }
  ],
}

