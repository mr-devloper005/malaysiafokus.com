'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

/*
  Lightweight scroll-reveal wrapper. Children fade + rise into view via an
  IntersectionObserver (styles in editable-global.css).

  Fails safe by design: the hiding `reveal` class is applied ONLY by JS, and
  only to elements that are below the fold at mount. So:
    - No JS / reduced motion  → content renders fully visible (never hidden).
    - Above the fold at load   → stays visible (the page-enter animation covers it).
    - Below the fold           → hidden, then animates in on scroll.
  This avoids both an above-the-fold flash and any chance of content being
  stuck invisible when scripts fail.
*/
export function EditableReveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  once = true,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  once?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [phase, setPhase] = useState<'idle' | 'hidden' | 'shown'>('idle')

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') return

    const rect = node.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0
    if (inView) return // already on screen — leave visible, no animation

    setPhase('hidden')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPhase('shown')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setPhase('hidden')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  const revealClass = phase === 'idle' ? '' : phase === 'shown' ? 'reveal is-visible' : 'reveal'

  return (
    <Tag
      ref={ref}
      className={`${revealClass} ${className}`.trim()}
      style={delay && phase !== 'idle' ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
