/**
 * Serializa o conteúdo Lexical do Payload CMS para HTML
 *
 * Payload CMS usa Lexical editor que retorna um formato JSON.
 * Esta função converte esse JSON para HTML renderizável.
 */
export async function serializeLexical(lexicalJSON: any): Promise<string> {
  if (!lexicalJSON || !lexicalJSON.root) {
    return ''
  }

  const { root } = lexicalJSON

  const renderNode = (node: any): string => {
    if (!node) return ''

    switch (node.type) {
      case 'root':
        return node.children?.map(renderNode).join('') || ''

      case 'paragraph':
        const paragraphContent = node.children?.map(renderNode).join('') || ''
        return `<p>${paragraphContent}</p>`

      case 'heading':
        const tag = `h${node.tag || '2'}`
        const headingContent = node.children?.map(renderNode).join('') || ''
        return `<${tag}>${headingContent}</${tag}>`

      case 'text':
        let text = node.text || ''

        // Apply formatting
        if (node.format) {
          if (node.format & 1) text = `<strong>${text}</strong>` // bold
          if (node.format & 2) text = `<em>${text}</em>` // italic
          if (node.format & 4) text = `<s>${text}</s>` // strikethrough
          if (node.format & 8) text = `<u>${text}</u>` // underline
          if (node.format & 16) text = `<code>${text}</code>` // code
        }

        return text

      case 'list':
        const listTag = node.listType === 'number' ? 'ol' : 'ul'
        const listContent = node.children?.map(renderNode).join('') || ''
        return `<${listTag}>${listContent}</${listTag}>`

      case 'listitem':
        const itemContent = node.children?.map(renderNode).join('') || ''
        return `<li>${itemContent}</li>`

      case 'link':
        const linkContent = node.children?.map(renderNode).join('') || ''
        const url = node.fields?.url || node.url || '#'
        const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
        return `<a href="${url}"${target}>${linkContent}</a>`

      case 'quote':
        const quoteContent = node.children?.map(renderNode).join('') || ''
        return `<blockquote>${quoteContent}</blockquote>`

      case 'code':
        const codeContent = node.children?.map(renderNode).join('') || ''
        return `<pre><code>${codeContent}</code></pre>`

      case 'linebreak':
        return '<br>'

      default:
        // Para tipos desconhecidos, tenta renderizar os children
        if (node.children) {
          return node.children.map(renderNode).join('')
        }
        return ''
    }
  }

  return renderNode(root)
}
