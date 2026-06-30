import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Get started', description: pagesContent.auth.signup.metadataDescription })
}

const perks = ['Free to join — start curating in minutes', 'Build and save your own collections', 'Shape what the community discovers next']

export default function SignupPage() {
  const copy = pagesContent.auth.signup
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-[var(--editable-container)] items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="order-2 lg:order-1">
            <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] lg:hidden">
              <ArrowLeft className="h-4 w-4" /> Back home
            </Link>
            <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 sm:p-9">
              <h1 className="editable-display text-2xl font-semibold tracking-[-0.02em]">{copy.formTitle}</h1>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">{copy.description}</p>
              <EditableLocalSignupForm />
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
                Already have an account? <Link href="/login" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{copy.loginCta}</Link>
              </p>
            </div>
          </div>

          <div className="relative order-1 hidden h-full overflow-hidden rounded-[2.5rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-10 lg:order-2 lg:flex lg:flex-col lg:justify-between">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(198,242,78,0.16),transparent_70%)]" />
            <Link href="/" className="relative inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]"><span className="block h-3.5 w-3.5 rounded-full border-[3px] border-current" /></span>
              <span className="editable-display text-lg font-semibold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
            </Link>
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.badge}</p>
              <h2 className="editable-display mt-5 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.03em]">{copy.title}</h2>
              <ul className="mt-8 grid gap-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-[var(--slot4-muted-text)]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><Check className="h-3 w-3" /></span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
