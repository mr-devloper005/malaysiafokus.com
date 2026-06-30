import type { CSSProperties } from 'react'

/*
  Design language: "Upmind" — a premium, modern agency aesthetic adapted for a
  Malaysia-focused discovery platform. Near-black canvas, bright lime accent,
  hairline white borders, generous spacing, large tight-tracked display type,
  pill buttons, and soft cream feature blocks. Every surface consumes the CSS
  variables below, so the whole site re-themes from this one file.
*/
export const editableRootStyle = {
  '--slot4-page-bg': '#0a0c0a',
  '--slot4-page-text': '#f2f4ec',
  '--slot4-panel-bg': '#101310',
  '--slot4-surface-bg': '#131712',
  '--slot4-muted-text': '#9ba69a',
  '--slot4-soft-muted-text': '#69736a',
  '--slot4-accent': '#c6f24e',
  '--slot4-accent-fill': '#c6f24e',
  '--slot4-accent-soft': '#1a2611',
  '--slot4-on-accent': '#0a0c0a',
  '--slot4-dark-bg': '#070907',
  '--slot4-dark-text': '#f2f4ec',
  '--slot4-media-bg': '#1a1f18',
  // Cream feature block (used inverted, with dark text) — mirrors the reference.
  '--slot4-cream': '#eef0e4',
  '--slot4-cream-text': '#11140d',
  '--slot4-warm': '#0e110d',
  '--slot4-lavender': '#101310',
  '--slot4-gray': '#101310',
  '--slot4-body-gradient': 'none',
  '--editable-page-bg': '#0a0c0a',
  '--editable-page-text': '#f2f4ec',
  '--editable-container': '1280px',
  '--editable-border': 'rgba(255,255,255,0.10)',
  '--editable-border-strong': 'rgba(255,255,255,0.16)',
  '--editable-nav-bg': '#0a0c0a',
  '--editable-nav-text': '#f2f4ec',
  '--editable-nav-active': '#c6f24e',
  '--editable-nav-active-text': '#0a0c0a',
  '--editable-cta-bg': '#c6f24e',
  '--editable-cta-text': '#0a0c0a',
  '--editable-search-bg': '#141813',
  '--editable-footer-bg': '#070907',
  '--editable-footer-text': '#f2f4ec',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_18px_40px_-24px_rgba(0,0,0,0.9)]',
  shadowStrong: 'shadow-[0_30px_80px_-32px_rgba(0,0,0,0.95)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(7,9,7,0.05),rgba(7,9,7,0.82))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'editable-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]',
    sectionTitle: 'editable-display text-[2.1rem] font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl',
    body: 'text-base leading-relaxed text-[var(--slot4-muted-text)]',
  },
  surface: {
    card: `rounded-3xl border ${editablePalette.border} ${editablePalette.panelBg} ${editablePalette.shadow}`,
    soft: `rounded-3xl border ${editablePalette.border} bg-white/[0.03]`,
    dark: `rounded-3xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
    cream: `rounded-3xl bg-[var(--slot4-cream)] text-[var(--slot4-cream-text)] ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-105 hover:shadow-[0_0_0_3px_rgba(198,242,78,0.18)] active:scale-[0.98]',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border-strong)] bg-white/[0.03] px-7 py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-105 active:scale-[0.98]',
  },
  media: {
    frame: `relative overflow-hidden rounded-3xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[3/4]',
  },
  motion: {
    lift: 'transition duration-500 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_36px_80px_-40px_rgba(0,0,0,0.95)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so the whole home experience redesigns in one file.',
  'Use spacious, contained grids (max-w container); never stretch content edge-to-edge.',
  'Dark canvas with one bright lime accent and occasional cream feature blocks — never introduce a second accent hue.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
