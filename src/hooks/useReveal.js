import { useEffect } from 'react'

/**
 * Scroll-reveal: any element carrying `data-reveal` fades + slides up when it
 * scrolls into view. Reimplemented from the design handoff's initReveal().
 * Elements with a `data-reveal-delay` (ms) stagger their reveal.
 */
export function useReveal(dep) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-revealed)'))
    if (!els.length) return

    // Respect users who prefer reduced motion — show everything immediately.
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) {
      els.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          const el = en.target
          const d = parseInt(el.getAttribute('data-reveal-delay') || '0', 10)
          window.setTimeout(() => el.classList.add('is-revealed'), d)
          io.unobserve(el)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    els.forEach((el) => io.observe(el))

    // Safety net: never leave content hidden if the observer never fires.
    const fallback = window.setTimeout(() => {
      els.forEach((el) => el.classList.add('is-revealed'))
    }, 2800)

    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep])
}
