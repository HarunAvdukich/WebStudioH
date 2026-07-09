import { useEffect, useRef } from 'react'

/**
 * Mouse parallax: tracks the cursor over the returned ref element and writes
 * normalized offsets (-1..1) into CSS custom properties `--mx` / `--my`, which
 * child cards read to translate/rotate in 3D. Reimplemented from the design
 * handoff's initParallax(). Disabled for coarse pointers / reduced motion.
 */
export function useParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || prefersReduced.matches) return

    let raf = null
    let tx = 0
    let ty = 0

    const onMove = (e) => {
      const r = root.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (!raf) {
        raf = requestAnimationFrame(() => {
          root.style.setProperty('--mx', tx.toFixed(3))
          root.style.setProperty('--my', ty.toFixed(3))
          raf = null
        })
      }
    }

    const onLeave = () => {
      root.style.setProperty('--mx', '0')
      root.style.setProperty('--my', '0')
    }

    root.addEventListener('mousemove', onMove)
    root.addEventListener('mouseleave', onLeave)

    return () => {
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
