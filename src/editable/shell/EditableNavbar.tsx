'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

// Public navigation only — profile + raw task-archive links are intentionally
// excluded; everything centers on collections/resources.
const NAV_LABEL_OVERRIDES: Record<string, string> = { sbm: 'Collections' }

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const navItems = useMemo(() => {
    const contentLinks = SITE_CONFIG.tasks
      .filter((task) => task.enabled && task.key !== 'profile')
      .map((task) => ({ label: NAV_LABEL_OVERRIDES[task.key] || task.label, href: task.route }))
    return [{ label: 'Home', href: '/' }, ...contentLinks, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/85 backdrop-blur-xl'
          : 'border-transparent bg-[var(--editable-nav-bg)]/40 backdrop-blur-md'
      } text-[var(--editable-nav-text)]`}
    >
      <nav className="mx-auto flex h-[72px] w-full max-w-[var(--editable-container)] items-center gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)] transition group-hover:rotate-12">
            <img src="/favicon.ico" alt="Logo" className="h-9 w-9" />
          </span>
          <span className="editable-display max-w-[180px] truncate text-lg font-semibold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
        </Link>

        <div className="ml-2 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition ${
                  active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
                {active ? <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-[var(--slot4-accent)]" /> : null}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)]"
          >
            <Search className="h-4 w-4" />
          </Link>

          {session ? (
            <>
              <span className="hidden max-w-[150px] truncate rounded-full border border-[var(--editable-border)] px-4 py-2 text-[13px] font-medium text-[var(--slot4-page-text)] sm:inline-block">
                {session.name}
              </span>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2 text-[13px] font-semibold text-[var(--editable-cta-text)] transition hover:brightness-105 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-full px-3 py-2 text-[13px] font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full px-3.5 py-2 text-[13px] font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-block"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--editable-cta-text)] transition hover:brightness-105 hover:shadow-[0_0_0_3px_rgba(198,242,78,0.18)] sm:inline-flex"
              >
                Get started <ArrowUpRight className="h-4 w-4" />
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-5 py-5 lg:hidden">
          <form action="/search" className="mb-4 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search collections" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)] hover:bg-white/[0.04] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="mt-4 grid gap-2 border-t border-[var(--editable-border)] pt-4">
            {session ? (
              <>
                <span className="px-1 text-sm font-medium text-[var(--slot4-page-text)]">Signed in as {session.name}</span>
                <Link href="/create" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-3 text-sm font-semibold text-[var(--editable-cta-text)]">
                  <PlusCircle className="h-4 w-4" /> Create
                </Link>
                <button type="button" onClick={logout} className="rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-medium text-[var(--slot4-page-text)]">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-medium">
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-3 text-sm font-semibold text-[var(--editable-cta-text)]">
                  <UserPlus className="h-4 w-4" /> Get started
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}

      {globalContent.nav?.tagline ? <span className="sr-only">{globalContent.nav.tagline}</span> : null}
    </header>
  )
}
