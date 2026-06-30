import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Curated Malaysian discovery',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated Malaysian discovery',
    primaryLinks: [
      { label: 'Collections', href: '/sbm' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Get started', href: '/signup' },
      secondary: { label: 'Browse collections', href: '/sbm' },
    },
  },
  footer: {
    tagline: 'Discover the best of Malaysia, all in one place.',
    description:
      'Discover the best of Malaysia through curated collections of resources, links, and references, organized for easy browsing.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Collections', href: '/sbm' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Curated discovery, built for Malaysia.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
