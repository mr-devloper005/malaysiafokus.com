'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const NAV_LABEL_OVERRIDES: Record<string, string> = { sbm: 'Collections' }

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  // Public surfaces only — no profile / raw task-archive promotion.
  const exploreLinks = SITE_CONFIG.tasks
    .filter((task) => task.enabled && task.key !== 'profile')
    .map((task) => ({ label: NAV_LABEL_OVERRIDES[task.key] || task.label, href: task.route }))

  const siteLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Search', href: '/search' },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* CTA band */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-[var(--editable-border)] bg-white/[0.03] p-8 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="editable-display max-w-xl text-3xl font-medium leading-[1.06] tracking-[-0.03em] sm:text-4xl">
              {globalContent.footer?.tagline || `Ready to explore ${SITE_CONFIG.name}?`}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            {exploreLinks[0] ? (
              <Link href={exploreLinks[0].href} className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-6 py-3 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-105">
                Browse collections <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border-strong)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
              Get in touch
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]">
                <img src="/favicon.ico" alt="Logo" className="h-9 w-9" />
              </span>
              <span className="editable-display text-lg font-semibold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description}</p>
          </div>

          <FooterCol title="Explore" links={exploreLinks} />
          <FooterCol title="Site" links={siteLinks} />

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Account</h3>
            <div className="mt-4 grid gap-2.5">
              {session ? (
                <>
                  <Link href="/create" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">Create a post</Link>
                  <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">Sign in</Link>
                  <Link href="/signup" className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">Get started</Link>
                </>
              )}
             
            </div>
          </div>
        </div>

        {/* Big wordmark */}
        <div className="mt-14 overflow-hidden border-t border-[var(--editable-border)] pt-10">
          <p
            className="editable-display select-none whitespace-nowrap text-[19vw] font-semibold leading-[0.8] tracking-[-0.055em] text-[var(--slot4-accent)] lg:text-[clamp(7rem,15vw,12rem)]"
            aria-hidden="true"
          >
            {SITE_CONFIG.name}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs font-medium text-[var(--slot4-muted-text)] sm:flex-row">
          <span>© {year} {SITE_CONFIG.name}. All rights reserved.</span>
          <span>{globalContent.footer?.bottomNote || 'Curated discovery, built for Malaysia.'}</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  if (!links.length) return null
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">{title}</h3>
      <div className="mt-4 grid gap-2.5">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
