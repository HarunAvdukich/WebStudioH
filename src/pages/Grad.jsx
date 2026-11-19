import { marked } from 'marked'
import Seo from '../components/Seo.jsx'
import { mrvice, usluga } from '../components/JsonLd.jsx'
import { Vrh } from '../components/stranica/dijelovi.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import { waLink } from '../lib/whatsapp.js'
import { putGrada, tekstGrada } from '../stranice/gradovi.js'
import '../components/stranica/stranica.css'

// Izrada web stranica za firme iz jednog grada (/izrada-web-stranica/<slug>).
export default function Grad({ g }) {
  const put = putGrada(g)
  const poruka = `Dobar dan, zanima me izrada web stranice za firmu ${g.iz}.`
  return (
    <div className="st st-izrada">
      <Seo
        punNaslov={`Izrada web stranica ${g.ime} · Hunar`}
        description={g.opis}
        path={put}
        image="/og/izrada-web-stranica.png"
        podaci={[
          usluga({ path: put, naziv: `Izrada web stranica ${g.ime}`, opis: g.opis, grad: g.ime }),
          mrvice([
            { ime: 'Početna', path: '/' },
            { ime: 'Izrada web stranica', path: '/izrada-web-stranica' },
            { ime: g.ime, path: put },
          ]),
        ]}
      />
      <Vrh nad={`Hunar · ${g.podrucje}`} naslov={`Izrada web stranica za firme ${g.iz}.`} uvod={g.uvod}>
        <a className="ok-dugme" href={waLink(poruka)} target="_blank" rel="noopener">Zatražite ponudu</a>
      </Vrh>
      <section className="st-tekst-dio">
        <div className="st-sirina">
          <article className="st-tekst" dangerouslySetInnerHTML={{ __html: marked.parse(tekstGrada(g)) }} />
        </div>
      </section>
      <ZavrsniPoziv nad={`Za firme ${g.iz}`} naslov="Šta treba Vašoj firmi?" opis="Pošaljite šta nudite i šta Vam treba. Odgovaramo lično i pripremamo ponudu prema obimu." dugme="Pišite nam na WhatsApp" ili="ili nazovite" poruka={poruka} />
    </div>
  )
}
