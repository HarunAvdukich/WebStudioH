import Seo from '../components/Seo.jsx'
import { DioNaslov } from '../components/stranica/dijelovi.jsx'
import PorukaSePise from '../components/kontakt/PorukaSePise.jsx'
import Obrazac from '../components/kontakt/Obrazac.jsx'
import BrojTelefona from '../components/okvir/BrojTelefona.jsx'
import { useOkvir } from '../lib/useOkvir.js'
import { PAROVI } from '../lib/jezik.js'
import { google } from '../data.js'
import '../components/stranica/stranica.css'
import '../components/kontakt/kontakt.css'

const IKONE = {
  whatsapp: <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />,
  telefon: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
}

function Kanal({ k }) {
  const { whatsappLink } = useOkvir()
  const ikona = (
    <span className="kt-kanal__ik" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {IKONE[k.vrsta]}
      </svg>
    </span>
  )
  if (k.vrsta === 'telefon')
    return (
      <div className="kt-kanal">
        {ikona}
        <span className="kt-kanal__ime">{k.ime}</span>
        <BrojTelefona />
      </div>
    )
  const href = k.vrsta === 'whatsapp' ? whatsappLink : `mailto:${k.vrijednost}`
  return (
    <a className="kt-kanal" href={href} {...(k.vrsta === 'whatsapp' ? { target: '_blank', rel: 'noopener' } : {})}>
      {ikona}
      <span className="kt-kanal__ime">{k.ime}</span>
      <span className="kt-kanal__vr">{k.vrijednost}</span>
    </a>
  )
}

export default function Kontakt({ t }) {
  return (
    <div className="st st-kontakt">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        jezik={t.jezik}
        verzije={[
          { jezik: 'bs', path: '/kontakt' },
          { jezik: 'en', path: PAROVI['/kontakt'] },
        ]}
      />
      <PorukaSePise t={t.poruka} />

      <section className="kt-kanali">
        <div className="st-sirina">
          <p className="st-nad">{t.kanali.naslov}</p>
          <div className="kt-kanali__red">
            {t.kanali.lista.map((k, i) => (
              <div key={k.vrsta} data-pokret="pojavi" style={{ '--i': i }}>
                <Kanal k={k} />
              </div>
            ))}
          </div>
          <p className="kt-recenzija">
            {t.kanali.recenzija.pitanje}{' '}
            <a href={google.recenzija} target="_blank" rel="noopener">
              {t.kanali.recenzija.link}
            </a>
          </p>
        </div>
      </section>

      <section className="st-dio kt-obrazac">
        <div className="st-sirina kt-obrazac__in">
          <DioNaslov nad={t.obrazac.nad} naslov={t.obrazac.naslov} uvod={t.obrazac.uvod} />
          <Obrazac t={t.obrazac} />
        </div>
      </section>
    </div>
  )
}
