import { useRef, useState } from 'react'
import { contact } from '../../data.js'
import { useOkvir } from '../../lib/useOkvir.js'

// Link za Viber. Na telefonu otvara chat. Na računaru Viber ne mora biti instaliran, pa klik
// usput kopira broj i pokaže potvrdu (kao BrojTelefona); ako Viber jeste tu, chat se otvori.
// Link poslovnog naloga (https://viber.me/...) ima svoju stranicu za računar, pa tu nema kopiranja.
export default function ViberLink({ className, children }) {
  const { okvir } = useOkvir()
  const [kopirano, setKopirano] = useState(false)
  const tajmer = useRef(0)
  const web = contact.viber.startsWith('https:')
  const klik = () => {
    if (web || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || !navigator.clipboard) return
    navigator.clipboard.writeText(okvir.telefon).then(
      () => {
        setKopirano(true)
        clearTimeout(tajmer.current)
        tajmer.current = setTimeout(() => setKopirano(false), 3200)
      },
      () => {},
    )
  }
  return (
    <>
      <a className={className} href={contact.viber} onClick={klik} {...(web ? { target: '_blank', rel: 'noopener' } : {})}>
        {children}
      </a>
      <span className={`ok-tost${kopirano ? ' je-vidljiv' : ''}`} role="status" aria-live="polite">
        {kopirano ? okvir.viberKopirano : ''}
      </span>
    </>
  )
}
