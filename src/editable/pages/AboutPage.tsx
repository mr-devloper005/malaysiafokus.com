import Link from 'next/link'
import { ArrowRight, Compass, Heart, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'

const valueIcons = [Sparkles, Compass, Heart]
const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

export default function AboutPage() {
  const about = pagesContent.about
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(198,242,78,0.10),transparent_70%)]" />
          <div className={`relative py-20 sm:py-28 ${container}`}>
            <EditableReveal className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" /> {about.badge}
              </span>
              <h1 className="editable-display mt-6 text-balance text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-6xl">{about.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">{about.description}</p>
            </EditableReveal>
          </div>
        </section>

        {/* Story */}
        <section className="bg-[var(--slot4-cream)] text-[var(--slot4-cream-text)]">
          <div className={`grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] ${container}`}>
            <EditableReveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-cream-text)]/60">• The story</p>
              <h2 className="editable-display mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">Why we built {SITE_CONFIG.name}.</h2>
            </EditableReveal>
            <EditableReveal delay={120} className="space-y-5 text-lg leading-relaxed text-[var(--slot4-cream-text)]/75">
              {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </EditableReveal>
          </div>
        </section>

        {/* Values */}
        <section className={`py-20 sm:py-24 ${container}`}>
          <EditableReveal className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">What we value</p>
            <h2 className="editable-display mt-4 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">Principles behind every collection.</h2>
          </EditableReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {about.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length]
              return (
                <EditableReveal key={value.title} delay={index * 80}>
                  <div className="flex h-full flex-col rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 transition duration-500 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><Icon className="h-5 w-5" /></span>
                      <span className="editable-display text-3xl font-semibold text-[var(--slot4-soft-muted-text)]">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                </EditableReveal>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className={`pb-20 sm:pb-24 ${container}`}>
          <EditableReveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[2.5rem] bg-[var(--slot4-accent)] px-8 py-14 text-[var(--slot4-on-accent)] sm:px-12 lg:flex-row lg:items-center">
              <div>
                <h2 className="editable-display max-w-xl text-3xl font-medium leading-[1.06] tracking-[-0.03em] sm:text-4xl">Start exploring the collections.</h2>
                <p className="mt-3 max-w-md text-base font-medium text-[var(--slot4-on-accent)]/80">Find the Malaysian resources worth keeping — all in one calm, browsable place.</p>
              </div>
              <Link href="/sbm" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--slot4-on-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:opacity-90">
                Browse collections <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
