import { marked } from 'marked'
import Seo from '../components/Seo.jsx'
import { mrvice, usluga } from '../components/JsonLd.jsx'
import { Vrh } from '../components/stranica/dijelovi.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import { waLink } from '../lib/whatsapp.js'
import '../components/stranica/stranica.css'

// Samo vlastiti markdown iz repozitorija; sadržaj je u HTML-u već pri gradnji.
const tekstovi = import.meta.glob('../content/usluge/*.md', { eager: true, query: '?raw', import: 'default' })
const html = Object.fromEntries(Object.entries(tekstovi).map(([path, tekst]) => [path.split('/').pop().replace(/\.md$/, ''), marked.parse(tekst)]))

export default function Izrada({ t }) {
  return (
    <div className="st st-izrada">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        image={`/og${t.put}.png`}
        podaci={[
          usluga({ path: t.put, naziv: t.ime, opis: t.seo.opis }),
          mrvice([
            { ime: 'Početna', path: '/' },
            { ime: 'Usluge', path: '/usluge' },
            { ime: t.ime, path: t.put },
          ]),
        ]}
      />
      <Vrh nad="Hunar · za firme u Bosni i Hercegovini" naslov={t.naslov} uvod={t.uvod}>
        <a className="ok-dugme" href={waLink(t.poruka)} target="_blank" rel="noopener">Zatražite ponudu</a>
      </Vrh>
      <section className="st-tekst-dio">
        <div className="st-sirina">
          <article className="st-tekst" dangerouslySetInnerHTML={{ __html: html[t.put.slice(1)] }} />
        </div>
      </section>
      <ZavrsniPoziv nad="Razgovarajmo o Vašem poslu" naslov="Šta treba Vašoj firmi?" opis="Pošaljite šta nudite i šta Vam treba. Odgovaramo lično i pripremamo ponudu prema obimu." dugme="Pišite nam na WhatsApp" ili="ili nazovite" poruka={t.poruka} />
    </div>
  )
}
