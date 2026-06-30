import { slot4BrandConfig } from '@/editable/theme/brand.config'

const BRAND = slot4BrandConfig.siteName

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated Malaysian collections, resources & links',
      description: `Discover the best of Malaysia through ${BRAND} — hand-picked collections of resources, links, and references, organized for easy browsing.`,
      openGraphTitle: 'Curated Malaysian collections, resources & links',
      openGraphDescription: `Discover the best of Malaysia through ${BRAND} — curated collections of resources, links, and references.`,
      keywords: ['malaysia', 'curated collections', 'bookmarks', 'resources', 'directory', 'discovery'],
    },
    hero: {
      badge: 'Curated Malaysian discovery',
      title: ['Discover the best', 'of Malaysia, curated.'],
      description: 'Hand-picked collections of the Malaysian resources, links, and references worth keeping — gathered in one calm, browsable place.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'How it works', href: '/about' },
      searchPlaceholder: 'Search collections, resources, topics…',
      focusLabel: 'Focus',
      featureCardBadge: 'live collections',
      featureCardTitle: 'Fresh resources shape the homepage in real time.',
      featureCardDescription: 'The newest saved collections stay front and center, so discovery always feels current.',
    },
    intro: {
      badge: 'About the platform',
      title: 'A clearer way to find what matters across Malaysia.',
      paragraphs: [
        `${BRAND} brings together the scattered links, tools, and references people actually search for — organized into clean, themed collections.`,
        'Instead of endless tabs and lost bookmarks, every resource lives in a calm, browsable space designed to make discovery feel effortless.',
        'Start anywhere — a collection, a topic, a search — and keep finding genuinely useful things without the noise.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Curated collections of vetted Malaysian resources and links.',
        'Calm, browsable layout built for focused discovery.',
        'Fresh saves surfaced first, so the feed stays current.',
        'Lightweight and fast — no clutter, no distractions.',
      ],
      primaryLink: { label: 'Browse collections', href: '/sbm' },
      secondaryLink: { label: 'Learn more', href: '/about' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Everything worth bookmarking in Malaysia, in one place.',
      description: 'Browse curated collections, save what you love, and discover resources you would never have found alone.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest additions in this collection.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A calmer, clearer way to discover Malaysia.',
    description: `${BRAND} is built to turn scattered links and lost bookmarks into clean, curated collections anyone can browse and trust.`,
    paragraphs: [
      'We started with a simple frustration: the best Malaysian resources are everywhere and nowhere — buried in tabs, chats, and forgotten bookmarks.',
      'So we built one place to gather, vet, and organize them into themed collections, where discovery feels intentional instead of accidental.',
    ],
    values: [
      {
        title: 'Curated, not crowded',
        description: 'Every resource earns its place. We prioritize quality and usefulness over sheer volume.',
      },
      {
        title: 'Built for browsing',
        description: 'Clean collections, clear structure, and calm pacing make exploring feel effortless.',
      },
      {
        title: 'Genuinely useful',
        description: 'We focus on the links and references people actually return to — the keepers, not the clutter.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${BRAND}`,
    title: 'Tell us what to curate next.',
    description: 'Have a resource worth featuring, a collection idea, or a partnership in mind? Send it over and we will route it through the right lane instead of a generic inbox.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search curated collections, resources, links, and references across the platform.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find the right resource, faster.',
      description: 'Search across every curated collection by keyword, topic, or category to surface exactly what you need.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest curated content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Submit a new resource or collection for the library.',
    },
    locked: {
      badge: 'Curator access',
      title: 'Sign in to add a resource.',
      description: 'Use your account to open the curator workspace and submit resources, links, and collections to the library.',
    },
    hero: {
      badge: 'Curator workspace',
      title: 'Add something worth keeping.',
      description: 'Choose a type, add the details, and prepare a clean entry with a link, summary, image, and notes.',
    },
    formTitle: 'Resource details',
    submitLabel: 'Submit resource',
    successTitle: 'Resource submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: `Sign in to ${BRAND}.`,
      badge: 'Member access',
      title: 'Welcome back to your library.',
      description: 'Sign in to keep browsing collections, manage your submissions, and curate new resources.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: `Create your ${BRAND} account.`,
      badge: 'Join the library',
      title: 'Create your account and start curating.',
      description: 'Create an account to save collections, submit resources, and shape the library alongside other curators.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related reads',
      fallbackTitle: 'Details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More collections',
      fallbackDescription: 'Curator details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
