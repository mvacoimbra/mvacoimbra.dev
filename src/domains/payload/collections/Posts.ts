import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL amigável para o post (ex: meu-primeiro-post)',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Resumo',
      admin: {
        description: 'Breve descrição do post para SEO e preview',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Conteúdo',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Data de Publicação',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem de Capa',
      admin: {
        description: 'Imagem opcional para o post',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Rascunho',
          value: 'draft',
        },
        {
          label: 'Publicado',
          value: 'published',
        },
      ],
      label: 'Status',
    },
  ],
  timestamps: true,
}
