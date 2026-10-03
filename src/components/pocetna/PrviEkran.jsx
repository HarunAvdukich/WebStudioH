import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Primjer from './Primjer.jsx'
import { contact } from '../../data.js'
import { popuni, waLink } from '../../lib/whatsapp.js'
import { useMagnet } from '../../lib/magnet.js'
import { igraj, izvorDolaska, ODMOR, PAUZA, porukaZa, redniBroj, redoviRijeci } from '../../lib/primjeri.js'
import { prati } from '../../lib/statistika.js'

const useIzomorfniEfekat = typeof window === 'undefined' ? useEffect : useLayoutEffect

function IkonaPoruka() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
    </svg>
  )
}

// Riječ iz naslova, slovo po slovo. Na telefonu ide u dva reda, na računaru u jedan.
// --n1 i --n2 su broj znakova (cijela riječ i duži red); CSS po njima smanji slova da stanu.
function Rijec({ rijec, stanje }) {
  const redovi = redoviRijeci(rijec)
  let i = 0
  return (
    <b className={stanje} style={{ '--n1': rijec.length, '--n2': Math.max(...redovi.map((r) => r.length)) }}>
      {redovi.map((red, r) => (
        <span key={r} className="pe-red">
          {r > 0 && <span className="pe-razmak">{' '}</span>}
          {[...red].map((c, j) => (
            <span key={j} className="pe-slovo" style={{ '--i': i++ }}>
              {c === ' ' ? ' ' : c}
            </span>
          ))}
        </span>
      ))}
    </b>
  )
}

// Prvi ekran početne: "Radimo [riječ] za firme u BiH." i živ primjer usluge. Na računaru je
// to prvi sloj priče (znak je gore lijevo, primjer desno, svjetlo prati miš), na telefonu i
// bez JavaScripta prvi dio stranice. Naslov je vidljiv od prvog iscrtavanja.
export default function PrviEkran({ t }) {
  const { prvi, usluge, primjeri } = t
  const [stanje, setStanje] = useState({ i: 0, bilo: -1 })
  const [izvor, setIzvor] = useState(null)
  const [dodir, setDodir] = useState(false)
  const root = useRef(null)
  const scena = useRef(null)
  const vel = useRef(null)
  const dugme = useRef(null)
  const tajmer = useRef(0)
  const igre = useRef(usluge.map(() => 0))
  const iRef = useRef(0)
  useMagnet(dugme)

  const usluga = usluge[stanje.i]
  const zivo = () => document.documentElement.classList.contains('pokret')

  // Riječ se smjenjuje sama, ali samo dok se prvi ekran vidi i kartica preglednika je otvorena.
  const zakazi = useCallback((ms = ODMOR) => {
    clearTimeout(tajmer.current)
    tajmer.current = setTimeout(function dalje() {
      const el = root.current
      const sakriven = !el || document.hidden || el.dataset.vidljiv === 'ne' || Number(el.style.opacity || 1) < 0.5
      if (sakriven) {
        tajmer.current = setTimeout(dalje, 800)
        return
      }
      setStanje(({ i }) => ({ i: (i + 1) % usluge.length, bilo: i }))
    }, ms)
  }, [usluge.length])

  const idi = (k) => {
    if (k === stanje.i) return
    setStanje(({ i }) => ({ i: k, bilo: i }))
  }

  // Kad se riječ promijeni: primjer te usluge se odigra, a sljedeća riječ se zakaže.
  useEffect(() => {
    iRef.current = stanje.i
    if (!zivo()) return undefined
    const el = scena.current?.children[stanje.i]
    if (stanje.bilo >= 0 && el) igraj(el, usluge[stanje.i].id, { n: 0, jos: () => iRef.current === stanje.i, t: primjeri })
    zakazi()
    return () => clearTimeout(tajmer.current)
  }, [stanje, usluge, primjeri, zakazi])

  // Dodir ili klik na primjer: odigra ga ponovo (druga varijanta), a riječ stoji 7 s.
  const igrajPonovo = (e) => {
    if (!zivo()) return
    const k = stanje.i
    const el = scena.current.children[k]
    igre.current[k] += 1
    zakazi(PAUZA)
    prati('Primjer', { usluga: usluge[k].uPoruci })
    igraj(el, usluge[k].id, { n: igre.current[k], cilj: e?.target, jos: () => iRef.current === k, t: primjeri })
  }

  // Pozdrav za one koji dođu sa trgovine koju smo napravili; dodir ili miš mijenja natpis.
  useEffect(() => {
    setIzvor(izvorDolaska(document.referrer, window.location.search))
    setDodir(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  // Prvi ekran van ekrana (telefon): riječ ne ide dalje.
  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([u]) => {
      el.dataset.vidljiv = u.isIntersecting ? 'da' : 'ne'
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Duga riječ se smanji da stane (CSS je već približno smanji po broju slova).
  useIzomorfniEfekat(() => {
    const kutija = vel.current
    if (!kutija) return undefined
    const prilagodi = () => {
      const sirina = kutija.clientWidth
      for (const b of kutija.children) {
        b.style.removeProperty('font-size')
        const sir = Math.max(...Array.from(b.children).map((r) => r.scrollWidth))
        if (sir > sirina + 1) b.style.fontSize = `${Math.floor(parseFloat(getComputedStyle(b).fontSize) * (sirina / sir))}px`
      }
    }
    prilagodi()
    window.addEventListener('resize', prilagodi)
    document.fonts?.ready.then(prilagodi)
    return () => window.removeEventListener('resize', prilagodi)
  }, [])

  // Svjetlo prati miš preko polja sitnih znakova (samo miš, samo uz pokrete).
  useEffect(() => {
    const el = root.current
    if (!el || !zivo() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let kadar = 0
    let x = 0
    let y = 0
    const crtaj = () => {
      kadar = 0
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      el.classList.add('je-svjetlo')
    }
    const pomjeri = (e) => {
      if (Number(el.style.opacity || 1) < 0.05) return
      const r = el.getBoundingClientRect()
      x = e.clientX - r.left
      y = e.clientY - r.top
      if (!kadar) kadar = requestAnimationFrame(crtaj)
    }
    window.addEventListener('pointermove', pomjeri, { passive: true })
    return () => {
      window.removeEventListener('pointermove', pomjeri)
      cancelAnimationFrame(kadar)
    }
  }, [])

  const cip = izvor ? (
    <Link className="pe-cip pe-cip--pozdrav" to={prvi.izvori[izvor]}>
      <i aria-hidden="true" />
      {popuni(prvi.pozdrav, { izvor })}
      <span aria-hidden="true"> ›</span>
    </Link>
  ) : (
    <span className="pe-cip">
      <i aria-hidden="true" />
      {prvi.primamo}
    </span>
  )

  return (
    <div className="kz-sloj pe" data-sloj="uvod" ref={root}>
      <div className="pe-pozadina" aria-hidden="true">
        <i className="pe-aura pe-aura--1" />
        <i className="pe-aura pe-aura--2" />
        <span className="pe-polje" />
        <span className="pe-sjaj" />
        <span className="pe-polje pe-polje--svjetlo" />
      </div>

      <div className="pe-tekst">
        {cip}
        <h1 className="pe-naslov">
          <span className="pe-mali">{prvi.radimo}</span>{' '}
          <span className="pe-vel" ref={vel} aria-hidden="true">
            {usluge.map((u, k) => (
              <Rijec key={u.id} rijec={u.rijec} stanje={k === stanje.i ? 'je-sad' : k === stanje.bilo ? 'je-bilo' : undefined} />
            ))}
          </span>
          <span className="sr-only">{usluge.map((u) => u.rijec).join(', ')}</span>{' '}
          <span className="pe-dole">{prvi.zaFirme}</span>
        </h1>
        <span className="pe-br" aria-hidden="true">
          {redniBroj(stanje.i, usluge.length)}
        </span>
        <div className="pe-dugmad">
          <a ref={dugme} className="kz-dugme pe-dugme" href={waLink(porukaZa(prvi, usluga))} target="_blank" rel="noopener" data-dugme-prvo>
            <IkonaPoruka />
            {t.ui.dugme}
          </a>
          <a className="kz-tel" href={contact.phoneHref}>
            {t.ui.telefon}
          </a>
        </div>
      </div>

      <div className="pe-kartica">
        <p className="pe-poruka">
          <span>
            {prvi.poruka}{' '}
            <b key={stanje.i} className="pe-poruka__tekst">
              „{popuni(prvi.zanima, { usluga: usluga.uPoruci })}“
            </b>
          </span>
          <span className="pe-dodir" aria-hidden="true">
            <i />
            {dodir ? prvi.dodirnite : prvi.kliknite}
          </span>
        </p>
        <div
          className="pe-scena"
          ref={scena}
          role="button"
          tabIndex={0}
          aria-label={`${usluga.ime}. ${prvi.primjer}`}
          data-kursor={dodir ? prvi.dodirnite : prvi.kliknite}
          onClick={igrajPonovo}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              igrajPonovo()
            }
          }}
        >
          {usluge.map((u, k) => (
            <Primjer key={u.id} id={u.id} t={primjeri} aktivan={k === stanje.i} />
          ))}
        </div>
        <div className="pe-pilule">
          {usluge.map((u, k) => (
            <button
              key={u.id}
              type="button"
              className={k === stanje.i ? 'je-sad' : k < stanje.i ? 'je-bilo' : undefined}
              aria-label={popuni(prvi.pokazi, { usluga: u.ime })}
              aria-pressed={k === stanje.i}
              onClick={() => {
                idi(k)
                prati('Usluga', { usluga: u.uPoruci })
              }}
            >
              <i />
            </button>
          ))}
        </div>
      </div>

      <p className="pe-listaj" aria-hidden="true">
        <span className="pe-listaj__tel">{prvi.listajte}</span>
        <span className="pe-listaj__rac">{t.ui.skrol}</span>
        <i />
        <i />
      </p>
    </div>
  )
}
