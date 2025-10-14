import configPromise from '@/domains/payload/payload.config'
import { getPayload } from 'payload'
import { serializeLexical } from './serializeLexical'

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

type Post = {
  slug: string;
  metadata: Metadata;
  source: string;
};

export async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
  })

  if (result.docs.length === 0) {
    return null
  }

  const post = result.docs[0]

  // Serializar o conteúdo Lexical para HTML
  const content = await serializeLexical(post.content)

  return {
    slug: post.slug,
    metadata: {
      title: post.title,
      publishedAt: post.publishedAt,
      summary: post.summary,
      image: typeof post.image === 'object' && post.image?.url ? post.image.url : undefined,
    },
    source: content,
  }
}

export async function getBlogPosts(): Promise<Post[]> {
  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  const posts = await Promise.all(
    result.docs.map(async (post) => {
      const content = await serializeLexical(post.content)

      return {
        slug: post.slug,
        metadata: {
          title: post.title,
          publishedAt: post.publishedAt,
          summary: post.summary,
          image: typeof post.image === 'object' && post.image?.url ? post.image.url : undefined,
        },
        source: content,
      }
    })
  )

  return posts
}
