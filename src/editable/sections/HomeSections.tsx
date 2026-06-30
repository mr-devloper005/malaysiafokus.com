import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Bookmark, Briefcase, Compass, GraduationCap, Heart,
  Landmark, Layers, Newspaper, Plane, Search, ShoppingBag, Sparkles, Star, Tag, Utensils, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'
import { EditableReveal } from '@/editable/shell/EditableReveal'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

function taskLabel(task: TaskKey) {
  const label = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
  return task === 'sbm' ? 'collections' : label.toLowerCase()
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}…` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Collection'
}

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* -------------------------------- Hero -------------------------------- */
const heroPills = [
  { label: 'Curated', className: 'left-[6%] top-[14%]', dot: '#c6f24e' },
  { label: 'Trusted locally', className: 'right-[8%] top-[22%]', dot: '#7dd3fc' },
  { label: 'Fresh daily', className: 'left-[10%] bottom-[20%]', dot: '#f0abfc' },
  { label: 'All in one place', className: 'right-[6%] bottom-[14%]', dot: '#fcd34d' },
]

export function EditableHomeHero({ posts, timeSections, primaryRoute }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const hero = pagesContent.home.hero
  const [titleA, titleB] = hero.title.length > 1 ? hero.title : [hero.title[0] || `Discover ${SITE_CONFIG.name}`, '']

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-page-bg)]">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(198,242,78,0.10),transparent_70%)]" />
      <div className={`relative pt-16 pb-12 sm:pt-20 lg:pt-24 ${container}`}>
        <EditableReveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" /> {hero.badge}
          </span>
          <h1 className="editable-display mt-6 text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]">
            {titleA}{' '}
            {titleB ? <span className="text-[var(--slot4-accent)]">{titleB}</span> : null}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--slot4-muted-text)] sm:text-lg">{hero.description}</p>

          <form action="/search" className="mx-auto mt-8 flex w-full max-w-xl items-center gap-2 rounded-full border border-[var(--editable-border-strong)] bg-white/[0.04] p-1.5 pl-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
            <Search className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              placeholder={hero.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
            <button className="shrink-0 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-105">Search</button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href={hero.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-105 hover:shadow-[0_0_0_3px_rgba(198,242,78,0.18)]">
              {hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={hero.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border-strong)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </EditableReveal>

        <EditableReveal className="relative mx-auto mt-14 max-w-5xl" delay={120}>
          <div className="relative h-[300px] overflow-hidden rounded-[2rem] border border-[var(--editable-border)] sm:h-[400px] lg:h-[460px]">
            <EditableHeroCollage images={heroImages} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,7,0.10),rgba(7,9,7,0.55))]" />
            {heroPills.map((pill) => (
              <span
                key={pill.label}
                className={`absolute ${pill.className} hidden items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md sm:inline-flex`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pill.dot }} /> {pill.label}
              </span>
            ))}
            <span className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-md">
              Latest on {SITE_CONFIG.name}
            </span>
            <Link
              href={primaryRoute}
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-4 py-2 text-xs font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-105"
            >
              Explore collections <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </EditableReveal>
      </div>

      {/* Trust stat band */}
      <div className="border-y border-[var(--editable-border)] bg-white/[0.02]">
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-sm text-[var(--slot4-muted-text)] ${container}`}>
          <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--slot4-accent)]" /> Hand-picked resources</span>
          <span className="inline-flex items-center gap-2"><Compass className="h-4 w-4 text-[var(--slot4-accent)]" /> Built for discovery</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><Zap className="h-4 w-4 text-[var(--slot4-accent)]" /> Updated daily</span>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- Topic marquee ---------------------------- */
export function EditableStoryRail({ posts }: HomeSectionProps) {
  const fromPosts = Array.from(new Set(posts.map((post) => categoryOf(post)).filter((value) => value && value !== 'Collection')))
  const topics = (fromPosts.length >= 6 ? fromPosts : CATEGORY_OPTIONS.map((category) => category.name)).slice(0, 16)
  const loop = [...topics, ...topics]
  return (
    <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-page-bg)] py-7">
      <div className="editable-marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="editable-marquee-track gap-3 pr-3">
          {loop.map((topic, index) => (
            <span
              key={`${topic}-${index}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[var(--slot4-muted-text)]"
            >
              <Star className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------- About + stats ---------------------------- */
export function EditableMagazineSplit({ posts, timeSections, primaryRoute }: HomeSectionProps) {
  const intro = pagesContent.home.intro
  const total = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).length
  const topics = Array.from(new Set(posts.map((post) => categoryOf(post)).filter((value) => value !== 'Collection'))).slice(0, 6)
  const chips = topics.length ? topics : CATEGORY_OPTIONS.slice(0, 6).map((category) => category.name)

  return (
    <section className="bg-[var(--slot4-cream)] text-[var(--slot4-cream-text)]">
      <div className={`grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] ${container}`}>
        <EditableReveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-cream-text)]/60">• {intro.badge}</p>
          <h2 className="editable-display mt-5 text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl">{intro.title}</h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--slot4-cream-text)]/70">{intro.paragraphs[0]}</p>
          <ul className="mt-7 grid gap-2.5">
            {intro.sidePoints.slice(0, 3).map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-[var(--slot4-cream-text)]/75">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-cream-text)] text-[var(--slot4-cream)]"><Sparkles className="h-3 w-3" /></span>
                {point}
              </li>
            ))}
          </ul>
          <Link href={intro.primaryLink.href} className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-cream-text)] px-6 py-3 text-sm font-semibold text-[var(--slot4-cream)] transition hover:opacity-90">
            {intro.primaryLink.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </EditableReveal>

        <EditableReveal delay={120}>
          <div className="rounded-[2rem] bg-[var(--slot4-dark-bg)] p-7 text-[var(--slot4-dark-text)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)] sm:p-9">
            <div className="rounded-2xl bg-white/[0.04] p-5">
              <p className="text-lg font-medium">The library</p>
              <p className="text-sm text-[var(--slot4-muted-text)]">Growing every week</p>
            </div>
            <div className="mt-6 flex items-end gap-3">
              <span className="editable-display text-6xl font-semibold tracking-[-0.04em] text-[var(--slot4-accent)]">{total || '120'}+</span>
              <span className="mb-2 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--slot4-accent)]">live</span>
            </div>
            <p className="mt-1 text-sm text-[var(--slot4-muted-text)]">curated resources & links</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <Link key={chip} href={`${primaryRoute}`} className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                  {chip}
                </Link>
              ))}
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

/* ------------------------- Browse by collection ------------------------ */
const categoryIcons: Record<string, typeof Tag> = {
  business: Briefcase, food: Utensils, travel: Plane, technology: Zap, health: Heart,
  education: GraduationCap, finance: Landmark, lifestyle: Sparkles, shopping: ShoppingBag,
  news: Newspaper, 'real-estate': Layers, entertainment: Star,
}
const featuredCategorySlugs = ['business', 'food', 'travel', 'technology', 'health', 'education', 'finance', 'lifestyle', 'shopping', 'news', 'real-estate', 'entertainment']

export function EditableCategoryGrid({ primaryRoute }: HomeSectionProps) {
  const categories = featuredCategorySlugs
    .map((slug) => CATEGORY_OPTIONS.find((category) => category.slug === slug))
    .filter((category): category is { name: string; slug: string } => Boolean(category))

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-20 sm:py-24 ${container}`}>
        <EditableReveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Browse by collection</p>
            <h2 className="editable-display mt-4 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">Jump straight to your interest.</h2>
          </div>
          <Link href={primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)] transition hover:gap-3">
            See all collections <ArrowRight className="h-4 w-4" />
          </Link>
        </EditableReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.slug] || Tag
            return (
              <EditableReveal key={category.slug} delay={index * 50}>
                <Link
                  href={`${primaryRoute}?category=${category.slug}`}
                  className="group flex h-full flex-col gap-5 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 transition duration-500 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_36px_80px_-40px_rgba(0,0,0,0.95)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-auto flex items-center justify-between text-base font-semibold">
                    {category.name}
                    <ArrowUpRight className="h-4 w-4 text-[var(--slot4-muted-text)] transition group-hover:text-[var(--slot4-accent)]" />
                  </span>
                </Link>
              </EditableReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- How it works ---------------------------- */
const steps = [
  { title: 'Discover', body: 'We comb through the web for the Malaysian resources, tools, and links actually worth keeping.' },
  { title: 'Curate', body: 'Every entry is checked and vetted, so only the genuinely useful makes the cut.' },
  { title: 'Organize', body: 'Resources are grouped into clean, themed collections built for easy browsing.' },
  { title: 'Share', body: 'You explore, save, and discover — and help shape what gets curated next.' },
]

export function EditableHowWeWork() {
  return (
    <section className="border-y border-[var(--editable-border)] bg-[var(--slot4-warm)]">
      <div className={`py-20 sm:py-24 ${container}`}>
        <EditableReveal className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">How it works</p>
          <h2 className="editable-display mt-4 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">From scattered links to a curated library.</h2>
        </EditableReveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <EditableReveal key={step.title} delay={index * 80}>
              <div className="flex h-full flex-col rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 transition duration-500 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40">
                <span className="editable-display text-5xl font-semibold tracking-[-0.04em] text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{step.body}</p>
              </div>
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------- Latest collections ------------------------- */
function FeedCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group grid grid-cols-[88px_minmax(0,1fr)] items-center gap-5 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-4 transition duration-500 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_36px_80px_-40px_rgba(0,0,0,0.95)] sm:grid-cols-[140px_minmax(0,1fr)] sm:p-5"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--slot4-media-bg)] sm:aspect-[4/3]">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{categoryOf(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.01em] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 hidden text-sm leading-6 text-[var(--slot4-muted-text)] sm:block">{getExcerpt(post, 120)}</p>
      </div>
    </Link>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const feed = dedupePosts([...timeSections.flatMap((section) => section.posts), ...posts]).slice(0, 6)
  if (!feed.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] ${container}`}>
        <EditableReveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Fresh in the library</p>
          <h2 className="editable-display mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">Latest collections and finds.</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--slot4-muted-text)]">
            The newest resources added across {SITE_CONFIG.name}. Open any one to explore the full collection.
          </p>
          <Link href={primaryRoute} className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--editable-border-strong)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
            View all {taskLabel(primaryTask)} <ArrowRight className="h-4 w-4" />
          </Link>
        </EditableReveal>
        <div className="grid gap-4">
          {feed.map((post, index) => (
            <EditableReveal key={post.id || post.slug} delay={index * 60}>
              <FeedCard post={post} href={postHref(primaryTask, post, primaryRoute)} />
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- CTA band ----------------------------- */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`pb-20 sm:pb-24 ${container}`}>
        <EditableReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--slot4-accent)] px-8 py-16 text-center text-[var(--slot4-on-accent)] sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_20%_20%,#000_0,transparent_45%),radial-gradient(circle_at_80%_80%,#000_0,transparent_45%)]" />
            <div className="relative">
              <Bookmark className="mx-auto h-9 w-9" />
              <h2 className="editable-display mx-auto mt-6 max-w-2xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">{cta.title}</h2>
              <p className="mx-auto mt-5 max-w-xl text-base font-medium text-[var(--slot4-on-accent)]/80 sm:text-lg">{cta.description}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href={cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-on-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:opacity-90">
                  {cta.primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-on-accent)]/30 px-7 py-3.5 text-sm font-semibold transition hover:bg-[var(--slot4-on-accent)]/10">
                  {cta.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
