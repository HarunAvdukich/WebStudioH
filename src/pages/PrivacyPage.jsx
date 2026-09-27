import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { contact } from '../data.js'

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Politika privatnosti"
        path="/politika-privatnosti"
        description="Kako WebStudioH prikuplja, koristi i štiti vaše lične podatke."
      />
      <PageHero
        eyebrow="Pravno"
        title="Politika privatnosti"
        subtitle="Kako prikupljamo, koristimo i štitimo vaše lične podatke."
      />

      <article className="post">
        <div className="container post__wrap">
          <div className="post__meta">Posljednje ažuriranje: 27. septembar 2026.</div>
          <div className="post__body">
            <p>
              Vaša privatnost nam je važna. Ova politika objašnjava koje podatke
              prikupljamo putem web stranice <strong>webstudioh.ba</strong>, u koju
              svrhu i koja su vaša prava. Voditelj obrade je WebStudioH.
            </p>

            <h2>Koje podatke prikupljamo</h2>
            <ul>
              <li>
                <strong>Podaci iz kontakt forme:</strong> ime, email adresa,
                odabrana usluga i sadržaj poruke koju nam pošaljete.
              </li>
              <li>
                <strong>Komunikacija:</strong> poruke koje razmijenimo putem
                emaila, telefona ili WhatsApp-a.
              </li>
            </ul>

            <h2>U koju svrhu koristimo podatke</h2>
            <ul>
              <li>Da vam odgovorimo na upit i pripremimo ponudu.</li>
              <li>Za komunikaciju tokom projekta i pružanje usluga.</li>
            </ul>

            <h2>Pravni osnov</h2>
            <p>
              Podatke obrađujemo na osnovu vašeg pristanka (slanjem forme) te
              legitimnog interesa za komunikaciju i pružanje traženih usluga.
            </p>

            <h2>Dijeljenje s trećim stranama</h2>
            <p>
              Vaše podatke ne prodajemo. Podatke može obrađivati pouzdan pružalac
              usluga koji nam pomaže u radu, hosting platforma (Netlify),
              isključivo u gore navedene svrhe.
            </p>

            <h2>Kolačići</h2>
            <p>
              Ne koristimo kolačiće za praćenje ni oglašavanje. Zbog toga i nema
              iritantnog „cookie" banera.
            </p>

            <h2>Koliko dugo čuvamo podatke</h2>
            <p>
              Podatke iz upita čuvamo onoliko koliko je potrebno da odgovorimo i
              vodimo eventualnu saradnju, nakon čega ih brišemo ili anonimiziramo.
            </p>

            <h2>Vaša prava</h2>
            <p>
              Imate pravo na pristup svojim podacima, ispravku, brisanje i
              povlačenje pristanka u bilo kojem trenutku. Za bilo koji zahtjev
              pišite nam na{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>

            <h2>Izmjene ove politike</h2>
            <p>
              Politiku možemo povremeno ažurirati. Datum posljednje izmjene naveden
              je na vrhu stranice.
            </p>

            <h2>Kontakt</h2>
            <p>
              Za sva pitanja o privatnosti dostupni smo na{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
          </div>
        </div>
      </article>
    </>
  )
}
