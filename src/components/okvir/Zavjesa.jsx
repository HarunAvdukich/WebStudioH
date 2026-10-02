import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { putZaZavjesu } from '../../lib/prelaz.js'
import { ZnakPetlja } from '../pocetna/Znak.jsx'

const ULAZ = 400
const IZLAZ = 500

// Klik na link na drugu stranicu: smaragdna zavjesa prekrije ekran, znak se okrene (u postane n),
// nova stranica se otvori ispod zavjese, pa se zavjesa podigne. Klik se hvata u fazi hvatanja,
// prije Linka iz React Routera, koji ne navigira kad je preventDefault već pozvan.
// Bez .pokret (bez JavaScripta ili uz "smanji pokrete") stranica se otvori odmah.
export default function Zavjesa() {
  const ref = useRef(null)
  const ceka = useRef(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const klik = (e) => {
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null
      const put = link ? putZaZavjesu(e, link, window.location) : null
      if (!put) return
      e.preventDefault()
      if (!document.documentElement.classList.contains('pokret')) {
        navigate(put)
        return
      }
      const el = ref.current
      el.classList.remove('je-izlaz')
      el.classList.add('je-ulaz')
      ceka.current = true
      setTimeout(() => navigate(put), ULAZ)
    }
    document.addEventListener('click', klik, true)
    return () => document.removeEventListener('click', klik, true)
  }, [navigate])

  useEffect(() => {
    if (!ceka.current) return undefined
    ceka.current = false
    const el = ref.current
    let tajmer = 0
    const okvir = requestAnimationFrame(() => {
      el.classList.remove('je-ulaz')
      el.classList.add('je-izlaz')
      tajmer = setTimeout(() => el.classList.remove('je-izlaz'), IZLAZ)
    })
    return () => {
      cancelAnimationFrame(okvir)
      clearTimeout(tajmer)
    }
  }, [pathname])

  return (
    <div ref={ref} className="ok-zavjesa" aria-hidden="true">
      <svg viewBox="0 0 170 124">
        <ZnakPetlja boja="#E3F1EA" />
      </svg>
    </div>
  )
}
