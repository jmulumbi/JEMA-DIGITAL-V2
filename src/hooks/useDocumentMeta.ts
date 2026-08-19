// Utility hook to set document title, meta description, canonical and OG/Twitter tags
import { useEffect } from 'react'

type MetaOptions = {
  title?: string
  description?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
}

function ensureMeta(name: string, property: boolean) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let el = document.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    if (property) el.setAttribute('property', name)
    else el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  return el
}

export default function useDocumentMeta(opts: MetaOptions) {
  useEffect(() => {
    if (!opts) return

    if (opts.title) document.title = opts.title

    if (opts.description) {
      const desc = ensureMeta('description', false)
      desc.content = opts.description
    }

    if (opts.canonical) {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.href = opts.canonical
    }

    if (opts.ogTitle) {
      const el = ensureMeta('og:title', true)
      el.content = opts.ogTitle
    }
    if (opts.ogDescription) {
      const el = ensureMeta('og:description', true)
      el.content = opts.ogDescription
    }
    if (opts.ogImage) {
      const el = ensureMeta('og:image', true)
      el.content = opts.ogImage
    }

    if (opts.twitterTitle) {
      const el = ensureMeta('twitter:title', false)
      el.content = opts.twitterTitle
    }
    if (opts.twitterDescription) {
      const el = ensureMeta('twitter:description', false)
      el.content = opts.twitterDescription
    }
    if (opts.twitterImage) {
      const el = ensureMeta('twitter:image', false)
      el.content = opts.twitterImage
    }
  }, [opts.title, opts.description, opts.canonical, opts.ogTitle, opts.ogDescription, opts.ogImage, opts.twitterTitle, opts.twitterDescription, opts.twitterImage])
}
