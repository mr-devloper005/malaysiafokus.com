'use client'

import { Bookmark, Building2, Clock, FileText, Image as ImageIcon, Mail, MapPin, MessageSquare, Phone, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify details, and bring your business surface live quickly.' },
      { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Suggest a resource', body: 'Know a Malaysian link, tool, or reference worth featuring? Send it our way.' },
    { icon: Mail, title: 'Curation partnerships', body: 'Coordinate themed collections, reference pages, and link programs together.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing collections or your curator submissions? We are here.' },
  ]
}

const faqs = [
  { q: 'How do you decide what gets curated?', a: 'Every resource is reviewed for usefulness and relevance before it joins a collection — quality over quantity, always.' },
  { q: 'Can I submit my own resource?', a: 'Yes. Create an account and use the curator workspace, or send it through this form and we will review it.' },
  { q: 'How fast will I hear back?', a: 'Most messages get a reply within one to two business days.' },
]

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(198,242,78,0.10),transparent_70%)]" />
          <div className={`relative grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-start ${container}`}>
            <EditableReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" /> {pagesContent.contact.eyebrow}
              </span>
              <h1 className="editable-display mt-6 text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl">{pagesContent.contact.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>

              <div className="mt-8 grid gap-3">
                {lanes.map((lane) => (
                  <div key={lane.title} className="flex gap-4 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5 transition hover:border-[var(--slot4-accent)]/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><lane.icon className="h-5 w-5" /></span>
                    <div>
                      <h2 className="text-base font-semibold">{lane.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{lane.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--slot4-muted-text)]">
              
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--slot4-accent)]" /> Replies in 1–2 business days</span>
              </div>
            </EditableReveal>

            <EditableReveal delay={120}>
              <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><MessageSquare className="h-5 w-5" /></span>
                  <h2 className="editable-display text-2xl font-semibold tracking-[-0.02em]">{pagesContent.contact.formTitle}</h2>
                </div>
                <EditableContactLeadForm />
              </div>
            </EditableReveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-[var(--editable-border)]">
          <div className={`py-20 sm:py-24 ${container}`}>
            <EditableReveal className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Before you write</p>
              <h2 className="editable-display mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">Quick answers.</h2>
            </EditableReveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {faqs.map((faq, index) => (
                <EditableReveal key={faq.q} delay={index * 70}>
                  <div className="h-full rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6">
                    <h3 className="text-base font-semibold">{faq.q}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{faq.a}</p>
                  </div>
                </EditableReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
