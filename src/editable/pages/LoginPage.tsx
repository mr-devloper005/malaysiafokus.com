import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in', description: pagesContent.auth.login.metadataDescription })
}

const perks = ['Save and revisit your favourite collections', 'Submit resources to the library', 'A calmer, clutter-free discovery feed']

export default function LoginPage() {
  const copy = pagesContent.auth.login
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-[var(--editable-container)] items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="relative hidden h-full overflow-hidden rounded-[2.5rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-10 lg:flex lg:flex-col lg:justify-between">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(198,242,78,0.16),transparent_70%)]" />
            <Link href="/" className="relative inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]"><span className="block h-3.5 w-3.5 rounded-full border-[3px] border-current" /></span>
              <span className="editable-display text-lg font-semibold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
            </Link>
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.badge}</p>
              <h1 className="editable-display mt-5 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.03em]">{copy.title}</h1>
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

          <div>
            <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] lg:hidden">
              <ArrowLeft className="h-4 w-4" /> Back home
            </Link>
            <div className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 sm:p-9">
              <h2 className="editable-display text-2xl font-semibold tracking-[-0.02em]">{copy.formTitle}</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">{copy.description}</p>
              <EditableLocalLoginForm />
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
                New here? <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{copy.createCta}</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
