// Nova početna (Claude Design "Hunar landing", 19. 11. 2026). Stil je u naslovna.css, sve pod .h.
import { useEffect, useState } from 'react'
import './fontovi.css'
import './naslovna.css'
import './skice.css'
import { SkicaStub, SkicaUsluga, SkicaKorak, SkicaBransa, Gradovi } from './Skice.jsx'
import { WA, WA_PREGLED, WA_POSAO, VIBER, meni, stubovi, usluge, koraci, djelatnosti, gradovi, pitanja } from '../../naslovna.js'

const TEL = 'tel:+387603000751'
const van = { target: '_blank', rel: 'noopener' }

// Povjerenje bez lica i nagrada: samo ono što posjetilac može sam provjeriti.
const POVJERENJE = [
  ['Potpis na svakom sajtu', 'U podnožju mrt.ba, smarttime.ba i caneras.ba piše „Izradio hunar“. Otvorite i pogledajte.'],
  ['Klijenti ostaju', 'Stranice koje smo napravili i danas održavamo, za iste firme.'],
  ['Vidite prije nego platite', 'Prvo dobijete besplatnu skicu, a veći dio plaćate tek kad je stranica gotova.'],
  ['Brojke sa datumom', 'Svaka brojka na ovoj stranici ima datum i izvor, pa je možete provjeriti.'],
]

const PETLJA = 'M0,0 V159 A149,149 0 0 0 298,159 V96.009 A57,57 0 0 0 220,149 V159 A71,71 0 0 1 78,159 V0 Z'
const PETLJA_LOGO = 'M0.000,0 V159.000 A149.000,149.000 0 0 0 298.000,159.000 V96.009 A57.000,57.000 0 0 0 220.000,149.000 V159.000 A71.000,71.000 0 0 1 78.000,159.000 V0 Z'
const SLOVA = 'M0.000,0.000 H24.000 V142.000 H0.000 Z M72.000,90.000 H96.000 V142.000 H72.000 Z M0.000,90.000 A48.000,48.000 0 0 1 96.000,90.000 L72.000,90.000 A24.000,24.000 0 0 0 24.000,90.000 Z M121.200,42.000 H145.200 V94.000 H121.200 Z M193.200,42.000 H217.200 V142.000 H193.200 Z M217.200,94.000 A48.000,48.000 0 0 1 121.200,94.000 L145.200,94.000 A24.000,24.000 0 0 0 193.200,94.000 Z M242.400,42.000 H266.400 V142.000 H242.400 Z M314.400,90.000 H338.400 V142.000 H314.400 Z M242.400,90.000 A48.000,48.000 0 0 1 338.400,90.000 L314.400,90.000 A24.000,24.000 0 0 0 266.400,90.000 Z M462.220,92.000 A51.200,51.200 0 0 1 359.820,92.000 L383.820,92.000 A27.200,27.200 0 0 0 438.220,92.000 Z M359.820,92.000 A51.200,51.200 0 0 1 462.220,92.000 L438.220,92.000 A27.200,27.200 0 0 0 383.820,92.000 Z M438.220,42.000 H462.220 V142.000 H438.220 Z M487.420,42.000 H511.420 V142.000 H487.420 Z M487.420,88.200 A46.200,46.200 0 0 1 549.421,44.786 L541.213,67.339 A22.200,22.200 0 0 0 511.420,88.200 Z'

function Logo({ skriven }) {
  const a11y = skriven ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': 'hunar' }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 573.7 124.0" width="573.7" height="124" {...a11y}>
      <g transform="translate(2,2)"><g transform="scale(0.38961)"><g fill="#0E8A64">
        <path d={PETLJA_LOGO} />
        <path d={PETLJA_LOGO} transform="rotate(180 213.000 154.000)" />
      </g></g></g>
      <g transform="translate(206.37,20.82) scale(0.6592)"><path fill="#F4F4F2" d={SLOVA} /></g>
    </svg>
  )
}

function Ik({ d, sw = 2, children, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {d ? <path d={d} /> : children}
    </svg>
  )
}

const STRELICA = 'M5 12h14M13 6l6 6-6 6'
const ZVIJEZDA = 'M12 3l2.4 5.6L20 11l-5.6 2.4L12 19l-2.4-5.6L4 11l5.6-2.4z'
const WA_IK = 'M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z'
const TEL_IK = 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z'

function Petlja() {
  return (
    <svg className="petlja crta" viewBox="-10 -10 446 330" aria-hidden="true">
      <path pathLength="1" d={PETLJA} />
      <path pathLength="1" d={PETLJA} transform="rotate(180 213 154)" />
    </svg>
  )
}

function Jezik() {
  return (
    <div className="jezik" role="group" aria-label="Jezik">
      <a className="akt" href="/" aria-current="true">BS</a>
      <a href="/en" hrefLang="en" lang="en">EN</a>
    </div>
  )
}

function Zaglavlje() {
  const [otvoren, setOtvoren] = useState(false)
  useEffect(() => {
    if (!otvoren) return
    const esc = (e) => { if (e.key === 'Escape') setOtvoren(false) }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [otvoren])
  return (
    <header className={'zag' + (otvoren ? ' otvoren' : '')}>
      <div className="okvir">
        <a className="logo" href="/" aria-label="Hunar, početna"><Logo /></a>
        <nav className="meni" aria-label="Glavni meni">
          {meni.map((m) => <a key={m.link} href={m.link}>{m.ime}</a>)}
        </nav>
        <div className="zag-desno">
          <Jezik />
          <a className="tel" href={TEL}><Ik d={TEL_IK} />060 3000 751</a>
          <button type="button" className="meni-dugme" aria-expanded={otvoren} aria-controls="meni-mob" onClick={() => setOtvoren((o) => !o)}>
            <span className="sr-samo">{otvoren ? 'Zatvori meni' : 'Otvori meni'}</span>
            <i /><i /><i />
          </button>
        </div>
      </div>
      <nav id="meni-mob" className="meni-mob" aria-label="Meni" hidden={!otvoren}>
        {meni.filter((m) => m.link !== "/skica").map((m) => <a key={m.link} href={m.link} onClick={() => setOtvoren(false)}>{m.ime}</a>)}
        <a className="dugme zlatno" href="/skica">Besplatna skica Vaše stranice</a>
      </nav>
    </header>
  )
}

const TRAKA = ['Web stranice', 'Web shop', 'Online rezervacije', 'AI chatbot', 'OLX veza', 'B2B portal', 'SEO', 'Održavanje']

function Sek({ oznaka, naslov, tise, opis, prvi, children, ...rest }) {
  return (
    <section className="sek" style={prvi ? undefined : { paddingTop: 0 }} {...rest}>
      <div className="okvir">
        <div className="sek-zag">
          <div>
            <span className="oznaka mono"><i className="tacka" />{oznaka}</span>
            <h2 className="n2">{naslov} <span>{tise}</span></h2>
          </div>
          <p>{opis}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

export default function Naslovna() {
  return (
    <div className="h">
      <Zaglavlje />

      <section className="hero">
        <div className="okvir">
          <div className="hero-mreza">
            <div>
              <span className="znacka mono"><i className="tacka" />Web studio za firme iz <b>cijele BiH</b></span>
              <h1 className="naslov"><span className="red"><span>Web stranice i web shopovi</span></span> <span className="red tise"><span>koji donose <em>upite</em>,</span></span> <span className="red tise"><span>ne samo posjete.</span></span></h1>
              <p className="uvod">Pravimo stranice, web shopove i zakazivanje termina. Vežemo ih sa <b>OLX-om, Ananasom i Vašim dobavljačima</b>, pa artikle unosite jednom, a ne na tri mjesta.</p>
              <div className="akcije">
                <a className="dugme zlatno" href="/skica"><Ik d={ZVIJEZDA} />Besplatna skica Vaše stranice</a>
                <a className="dugme drugo" href={WA} {...van}><Ik d={WA_IK} />Pišite na WhatsApp</a>
              </div>
              <ul className="kuke">
                <li><i style={{ '--b': 'var(--zlato)' }} />Skica besplatno<span>bez obaveze</span></li>
                <li><i style={{ '--b': 'var(--nebo)' }} />Pisana ponuda<span>tri paketa</span></li>
                <li><i style={{ '--b': 'var(--koral)' }} />Sve je Vaše<span>stranica i domena</span></li>
              </ul>
              <p className="biljeska mono">Skica Vas ne obavezuje ni na šta · cijena po dogovoru</p>
            </div>

            <div className="scena" role="group" aria-label="Snimci stranica koje smo napravili">
              <Petlja />
              <div className="tel-okvir tel-a"><img src="/kadrovi/mrt-pocetna.webp" width="780" height="1270" alt="Početna web shopa mrt.ba na telefonu: akcija i kategorije alata" fetchpriority="high" /></div>
              <div className="tel-okvir tel-b"><img src="/kadrovi/smarttime-pocetna.webp" width="780" height="1270" alt="Početna web shopa smarttime.ba na telefonu" /></div>
              <span className="adresa ad-a"><i />mrt.ba</span>
              <span className="adresa ad-b"><i />smarttime.ba</span>
              <div className="kartica-plutaj kp-a">
                <div className="broj" style={{ fontSize: 20 }}>Artikal unesete jednom</div>
                <p>Pojavi se u web shopu, na OLX-u i u B2B portalu.</p>
                <span className="mono">tako radi mrt.ba</span>
              </div>
              <div className="kartica-plutaj kp-b">
                <div className="broj" style={{ fontSize: 20, display: 'flex', alignItems: 'center', gap: 8 }}><i className="tacka" />Kobi odgovara</div>
                <p>AI asistent na mrt.ba odgovara kupcima i noću</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="klijenti" aria-label="Firme koje rade sa nama">
        <div className="okvir">
          <p className="lbl">Firme koje rade{' '}<br />sa nama</p>
          <ul className="logoi">
            <li><a href="https://mrt.ba" {...van}><img src="/klijenti/mrt.webp" width="125" height="96" alt="" loading="lazy" decoding="async" /><span>mrt.ba</span></a></li>
            <li><a href="https://smarttime.ba" {...van}><img src="/klijenti/smarttime.webp" width="90" height="96" alt="" loading="lazy" decoding="async" /><span>SmartTime</span></a></li>
            <li><a href="https://caneras.ba" {...van}><img className="rijec" src="/klijenti/caneras.webp" width="410" height="96" alt="Caneras" loading="lazy" decoding="async" /></a></li>
            <li><span className="cip tih">i još dosta projekata</span></li>
          </ul>
        </div>
      </section>

      <div className="traka" aria-hidden="true"><div className="traka-niz">
        {[...TRAKA, ...TRAKA].map((t, i) => [<span key={'t' + i} className={i % 2 ? 'obris' : 'puna'}>{t}</span>, <i key={'i' + i} />])}
      </div></div>

      <Sek prvi className="sek rizik" id="skica" oznaka="Bez rizika za Vas" naslov="Prije nego platite išta," tise="vidite šta dobijate." opis="Ne tražimo da kupite mačka u vreći. Prvo vidite skicu, probate demo ili dobijete pregled stranice koju već imate. Tek onda odlučujete.">
        <span className="orb o1" aria-hidden="true" /><span className="orb o2" aria-hidden="true" />
        <article className="skica-kartica">
          <div className="skica-tekst">
            <span className="etiketa mono">Besplatno · bez obaveze</span>
            <h3>Besplatna skica Vaše stranice</h3>
            <p>Pošaljite naziv firme i šta radite. Napravimo skicu Vaše buduće stranice sa Vašim imenom i Vašim uslugama i pošaljemo Vam link. Ako Vam se ne svidi, ne dugujete ništa.</p>
            <ul className="kvacice">
              <li>Vaše ime i Vaše usluge, ne prazan šablon</li>
              <li>Link koji otvorite na telefonu i pokažete drugima</li>
              <li>Bez plaćanja, bez ugovora, bez naknadnog zvanja</li>
            </ul>
            <a className="dugme zlatno" href="/skica">Tražim besplatnu skicu<Ik d={STRELICA} /></a>
          </div>
          <div className="pretr" aria-hidden="true">
            <div className="pretr-traka"><i /><i /><i /><span className="mono">vasa-firma.ba</span></div>
            <div className="pretr-tijelo">
              <div className="b pmeni"><span /><span /><span /><span /></div>
              <div className="b naslovb" />
              <div className="b naslovb kraci" />
              <div className="b dugmeb" />
              <div className="kartice3"><div className="b k1" /><div className="b k2" /><div className="b k3" /></div>
              <span className="kursor"><svg viewBox="0 0 24 24"><path d="M4 3l7 17 2.5-7L21 10.5z" fill="#fff" stroke="#10231c" strokeWidth="1.5" strokeLinejoin="round" /></svg></span>
              <span className="pecat mono">Skica je spremna</span>
            </div>
          </div>
        </article>

        <div className="ponude">
          <a className="ponuda" style={{ '--b': 'var(--koral)' }} href={WA_PREGLED} {...van}>
            <span className="ik3"><Ik><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></Ik></span>
            <h3>Besplatan pregled Vaše stranice</h3>
            <p>Već imate stranicu? Pošaljite link, a mi Vam kažemo šta koči brzinu i upite, sa izmjerenim brojkama.</p>
            <span className="vise mono">Pošaljite link</span>
          </a>
          <a className="ponuda" style={{ '--b': 'var(--nebo)' }} href="/demo-termini" data-bez-zavjese="">
            <span className="ik3"><Ik d="M8 5v14l11-7z" /></span>
            <h3>Probajte demo uživo</h3>
            <p>Zakazivanje termina za salon i kalkulator registracije rade odmah, na Vašem telefonu. Kliknite i probajte.</p>
            <span className="vise mono">Otvorite demo</span>
          </a>
          <div className="ponuda" style={{ '--b': 'var(--zlato)' }}>
            <span className="ik3"><Ik d="M4 12a8 8 0 1 0 8-8v8z" /></span>
            <h3>30 % na početku, 70 % na kraju</h3>
            <p>Veći dio plaćate tek kad je stranica gotova i kad je vidite uživo. Rizik nije na Vama.</p>
            <span className="vise mono">Kako plaćate</span>
          </div>
          <div className="ponuda" style={{ '--b': 'var(--ljub)' }}>
            <span className="ik3"><Ik d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" /></span>
            <h3>Pisana ponuda, tri paketa</h3>
            <p>Cijena, rok i spisak onoga što dobijate, crno na bijelo. Birate paket koji Vam odgovara.</p>
            <span className="vise mono">Bez sitnih slova</span>
          </div>
        </div>

        <div className="niste-sigurni">
          <div>
            <h3>Niste sigurni šta Vam treba?</h3>
            <p>Opišite posao u dvije rečenice. Predložimo rješenje i kažemo šta Vam ne treba, i to je besplatno.</p>
          </div>
          <div className="ns-akcije">
            <a className="dugme tamno" href={WA_POSAO} {...van}>Opišite posao na WhatsAppu</a>
            <a className="dugme obrub" href={VIBER}>Viber</a>
          </div>
        </div>

        <ul className="obecanja">
          <li style={{ '--b': 'var(--nebo)' }}><b className="mono">24 h</b><div><h3>Odgovor u roku od 24 sata</h3><p>Na svaku poruku odgovorimo najkasnije sutradan.</p></div></li>
          <li style={{ '--b': 'var(--svijetli)' }}><b className="mono">30</b><div><h3>30 dana podrške poslije predaje</h3><p>Sitne izmjene i pitanja u prvih mjesec dana su uključeni.</p></div></li>
          <li style={{ '--b': 'var(--koral)' }}><b className="mono">0 KM</b><div><h3>Bez mjesečnih naknada</h3><p>Plaćate izradu, a za stranicu nema pretplate.</p></div></li>
        </ul>
      </Sek>

      <Sek prvi oznaka="Zašto Hunar" naslov="Ono što bh. firmi treba," tise="a agencija iz šablona ne radi." opis="Ne prodajemo lijepu stranicu koja stoji. Pravimo alat koji radi posao: prodaje, zakazuje i odgovara, i kad ste Vi zatvorili.">
        <div className="stubovi">
          {stubovi.map((s, i) => (
            <div className="stub" key={s.naslov}>
              <SkicaStub i={i} />
              <h3>{s.naslov}</h3>
              <p>{s.tekst}</p>
            </div>
          ))}
        </div>
      </Sek>

      <Sek oznaka="Usluge" naslov="Sve na webu," tise="na jednom mjestu." opis="Od prve stranice do web shopa sa hiljadama artikala. Kažite šta prodajete, a mi predložimo šta Vam stvarno treba.">
        <div className="usluge">
          {usluge.map((u, i) => (
            <a className="usluga" href={u.link} key={u.br}>
              <div className="gore">
                <span className="ik2"><Ik d={u.ikona} sw={1.7} /></span>
                <span className="mono">{u.br}</span>
              </div>
              <SkicaUsluga i={i} />
              <h3>{u.naslov}</h3>
              <p>{u.opis}</p>
            </a>
          ))}
        </div>
        <div className="usluge-jos">
          <b>Radimo i:</b>
          <a className="cip" href="/usluge">SEO optimizacija</a>
          <a className="cip" href="/usluge">Mobilne aplikacije</a>
          <a className="cip" href="/usluge">Redizajn stranica</a>
          <a className="cip" href="/usluge">Održavanje i hosting</a>
          <a className="sve" href="/usluge">Sve usluge <Ik d={STRELICA} /></a>
        </div>
      </Sek>

      <Sek oznaka="Radovi" naslov="Stranice koje rade," tise="ne samo izgledaju." opis="Otvorite ih na svom telefonu. Svaka brojka ovdje ima datum, pa je možete provjeriti sami.">
        <div className="radovi">
          <article className="rad">
            <div className="tekst">
              <span className="mono">Motorremont · web shop i B2B</span>
              <h3>mrt.ba</h3>
              <p>Web shop za alate i opremu, povezan sa OLX-om i portalom za veleprodaju. Asistent Kobi odgovara kupcima.</p>
              <ul>
                <li><b>OLX</b>oglasi se prave i ažuriraju iz kataloga</li>
                <li><b>B2B</b>portal b2b.mrt.ba sa cijenama za partnere</li>
                <li><b>Kobi</b>AI asistent odgovara kupcima i noću</li>
              </ul>
              <a className="link" href="/radovi/mrt">Pročitajte kako smo ga napravili <Ik d={STRELICA} /></a>
            </div>
            <div className="slika"><img src="/radovi/mrt-pocetna-artikli.webp" width="780" height="1688" loading="lazy" decoding="async" alt="Motorne pile na početnoj mrt.ba: cijena, zaliha i garancija, snimak telefona" /></div>
          </article>
          <article className="rad">
            <div className="tekst">
              <span className="mono">SmartTime · web shop i termini</span>
              <h3>smarttime.ba</h3>
              <p>Web shop satova sa zakazivanjem termina. Kupac sam bira dan i sat, a radnja dobije sve na jednom mjestu.</p>
              <ul>
                <li><b>513</b>ručnih satova u katalogu (2. 11. 2026.)</li>
                <li><b>Termin</b>kupac sam zakaže servis ili graviranje</li>
                <li><b>Google</b>recenzije kupaca stoje na početnoj</li>
              </ul>
              <a className="link" href="/radovi/smarttime">Pročitajte kako smo ga napravili <Ik d={STRELICA} /></a>
            </div>
            <div className="slika"><img src="/radovi/smarttime-pocetna-satovi.webp" width="780" height="1688" loading="lazy" decoding="async" alt="Izdvojeni satovi na početnoj smarttime.ba, snimak telefona" /></div>
          </article>
          <article className="rad siroki">
            <div className="tekst">
              <span className="mono">Caneras · stranica brenda</span>
              <h3>caneras.ba</h3>
              <p>Stranica brenda za električne bicikle, skutere i tricikle. Kupac filtrira modele i uporedi ih u tabeli, a kupuje preko mrt.ba.</p>
              <ul>
                <li><b>4</b>modela u katalogu (20. 11. 2026.)</li>
                <li><b>Tabela</b>modeli jedan pored drugog, bez listanja</li>
                <li><b>Po mjeri</b>pisano od nule, bez šablona i baze</li>
              </ul>
              <a className="link" href="/radovi/caneras">Pogledajte rad <Ik d={STRELICA} /></a>
            </div>
            <div className="slika"><img src="/project-caneras.webp" width="1200" height="769" loading="lazy" decoding="async" alt="Početna stranica caneras.ba na računaru: električni bicikli i skuteri Caneras" /></div>
          </article>
        </div>
        <div className="jos">
          <span><b>I još dosta projekata.</b> Pitajte nas za primjer iz Vaše branše, pokažemo ga u razgovoru.</span>
          <a className="dugme drugo" href="/radovi" style={{ height: 46 }}>Svi radovi</a>
        </div>
      </Sek>

      <Sek oznaka="Šta kažu klijenti" naslov="Ne vjerujte nama." tise="Pitajte njih." opis="Firme čije radove vidite i danas rade sa nama. Recenzije su potpisane nazivom firme.">
        <div className="recenzije">
          <figure className="recenzija otkrij">
            <Ik className="navod" sw={1.6} d="M10 7H6a2 2 0 0 0-2 2v3h5v5H4M20 7h-4a2 2 0 0 0-2 2v3h5v5h-5" />
            <blockquote><p>„Prije smo svaku promjenu cijene i stanja prepisivali ručno na OLX. Sada artikal unesemo jednom u administraciji, a stranica i preko 4.000 oglasa na OLX-u se ažuriraju sami.“</p></blockquote>
            <footer><div><b>mrt.ba</b><span>Motorremont, alati i oprema</span></div><a href="https://mrt.ba" {...van}>Otvorite mrt.ba</a></footer>
          </figure>
          <figure className="recenzija otkrij">
            <Ik className="navod" sw={1.6} d="M10 7H6a2 2 0 0 0-2 2v3h5v5H4M20 7h-4a2 2 0 0 0-2 2v3h5v5h-5" />
            <blockquote><p>„Htjeli smo da kupac sa telefona za par minuta nađe sat i naruči ga. Sada bira između preko 500 modela, a termin za graviranje ili servis rezerviše sam, bez poziva.“</p></blockquote>
            <footer><div><b>SmartTime</b><span>Satovi, servis i graviranje</span></div><a href="https://smarttime.ba" {...van}>Otvorite smarttime.ba</a></footer>
          </figure>
        </div>
        <ul className="povjerenje">
          {POVJERENJE.map(([h, p]) => (
            <li key={h}>
              <Ik d="M5 12.5l4.5 4.5L19 7.5" />
              <div><h3>{h}</h3><p>{p}</p></div>
            </li>
          ))}
        </ul>
      </Sek>

      <Sek oznaka="Provjerite sami" naslov="Ova stranica," tise="izmjerena." opis="Mjerili smo javnim alatima 19. 11. 2026. Svaki link pokrene isto mjerenje uživo, pa uporedite.">
        <div className="provjere">
          {[
            ['Brzina · Lighthouse', '99', 'Na računaru, tri mjerenja zaredom, svako 99. Glavni sadržaj se pojavi za manje od sekunde.'],
            ['Pristupačnost · Lighthouse', '100', 'Čitljivo uz čitač ekrana, tastaturu i uvećanje. Na računaru, 19. 11. 2026.'],
            ['SEO i dobre prakse', '100', 'Obje ocjene Lighthousea 100, na računaru. Google stranicu lako pročita i složi.'],
          ].map(([o, b, t]) => (
            <div className="provjera" key={o}>
              <span className="mono">{o}</span>
              <div className="ocjena">{b}<small>/100</small></div>
              <p>{t}</p>
              <a href="https://pagespeed.web.dev/analysis?url=https://hunar.ba/" {...van}>Izmjerite <Ik d={STRELICA} width="16" height="16" /></a>
            </div>
          ))}
          <div className="provjera">
            <span className="mono">Sigurna veza · SSL Labs</span>
            <div className="ocjena">A+</div>
            <p>Najviša ocjena za šifrovanu vezu (HTTPS). Qualys SSL Labs, 19. 11. 2026.</p>
            <a href="https://www.ssllabs.com/ssltest/analyze.html?d=hunar.ba" {...van}>Provjerite <Ik d={STRELICA} width="16" height="16" /></a>
          </div>
        </div>
      </Sek>

      <Sek oznaka="Kako radimo" naslov="Od prve poruke" tise="do prve narudžbe." opis="Svaki korak ima rok i nešto što vidite i odobrite. Bez mjeseci tišine i iznenađenja na kraju.">
        <div className="koraci">
          {koraci.map((k, i) => (
            <div className="korak" key={k.br}>
              <span className="mono">{k.br}</span>
              <SkicaKorak i={i} />
              <h3>{k.naslov}</h3>
              <p>{k.tekst}</p>
            </div>
          ))}
        </div>
      </Sek>

      <Sek oznaka="Djelatnosti" naslov="Svaka branša" tise="prodaje drugačije." opis="Radnja sa alatom treba katalog i OLX. Salon treba termine. Restoran treba meni i rezervacije. Počinjemo od Vašeg posla, ne od šablona.">
        <div className="bransa">
          {djelatnosti.map((d, i) => (
            <a href={d.link} key={d.naslov}><SkicaBransa i={i} /><div className="red"><div><b className="bn">{d.naslov}</b><small className="bt">{d.tekst}</small></div><Ik d="M7 17 17 7M8 7h9v9" /></div></a>
          ))}
        </div>
        <Gradovi gradovi={gradovi} />
      </Sek>

      <section className="sek" style={{ paddingTop: 0 }}>
        <div className="okvir faq-mreza">
          <div className="lijevo">
            <span className="oznaka mono"><i className="tacka" />Česta pitanja</span>
            <h2 className="n2">Pitate nas, <span>odgovaramo direktno.</span></h2>
            <p>Ako Vašeg pitanja nema ovdje, pošaljite ga na WhatsApp. Odgovaramo lično.</p>
            <a className="dugme drugo" href={WA} {...van}>Postavite pitanje</a>
          </div>
          <div>
            {pitanja.map((p) => (
              <details key={p.q}>
                <summary>{p.q}<span className="plus"><Ik d="M12 5v14M5 12h14" sw={2.2} /></span></summary>
                <p className="odg">{p.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="poziv">
        <div className="poziv-kutija">
          <Petlja />
          <div>
            <h2>Recite šta Vam treba. Mi Vam kažemo koliko košta.</h2>
            <p>Napišite šta prodajete i kome. Plan i cijenu šaljemo poslije razgovora, bez obaveze.</p>
          </div>
          <div className="kanali">
            <a className="kanal zlatni" href="/skica"><Ik d={ZVIJEZDA} /><div>Tražim besplatnu skicu<span>Bez plaćanja i bez obaveze</span></div><Ik className="str" d={STRELICA} /></a>
            <a className="kanal bijeli" href={WA} {...van}><Ik d={WA_IK} /><div>WhatsApp<span>Najbrži put do nas</span></div><Ik className="str" d={STRELICA} /></a>
            <a className="kanal" href={VIBER}><Ik d="M4 5h16v11H8l-4 4z" /><div>Viber<span>060 3000 751</span></div><Ik className="str" d={STRELICA} /></a>
            <a className="kanal" href="mailto:info@hunar.ba"><Ik><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Ik><div>Email<span>info@hunar.ba</span></div><Ik className="str" d={STRELICA} /></a>
          </div>
        </div>
      </section>

      <footer className="pod">
        <div className="okvir">
          <div className="pod-mreza">
            <div>
              <a className="logo" href="/" aria-label="Hunar"><Logo skriven /></a>
              <p>Web stranice, web shopovi i sistemi za firme iz cijele Bosne i Hercegovine.</p>
            </div>
            <div>
              <h4 className="mono">Usluge</h4>
              <ul><li><a href="/izrada-web-stranica">Web stranice</a></li><li><a href="/izrada-web-shopa">Web shop</a></li><li><a href="/zakazivanje">Online rezervacije</a></li><li><a href="/olx">Veza sa OLX-om</a></li></ul>
            </div>
            <div>
              <h4 className="mono">Hunar</h4>
              <ul><li><a href="/radovi">Radovi</a></li><li><a href="/o-nama">O Hunaru</a></li><li><a href="/savjeti">Savjeti</a></li><li><a href="/cijene">Cijene</a></li></ul>
            </div>
            <div>
              <h4 className="mono">Kontakt</h4>
              <ul><li><a href={WA} {...van}>WhatsApp</a></li><li><a href={TEL}>060 3000 751</a></li><li><a href="mailto:info@hunar.ba">info@hunar.ba</a></li></ul>
            </div>
          </div>
          <div className="pod-dno">
            <span>© 2026 Hunar · <a href="/politika-privatnosti">Privatnost</a></span>
            <Jezik />
          </div>
        </div>
      </footer>
    </div>
  )
}
