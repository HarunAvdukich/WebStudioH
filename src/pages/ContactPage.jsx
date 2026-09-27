import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Icon, { WhatsAppIcon } from '../components/Icon.jsx'
import { contact } from '../data.js'

const services = [
  'Web trgovina (WooCommerce)',
  'Povezivanje sa OLX-om i dobavljačima',
  'Održavanje',
  'SEO i brzina',
  'Prezentacijska stranica',
  'Nešto drugo',
]

const FORM_NAME = 'kontakt'
const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: services[0], message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const mailtoFallback = () => {
    const subject = `Novi upit: ${form.service}`
    const body = [`Ime: ${form.name}`, `Email: ${form.email}`, `Usluga: ${form.service}`, '', form.message].join('\n')
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...form }),
      })
      if (!res.ok) throw new Error('bad status')
      setStatus('sent')
    } catch {
      // Van Netlifyja (npr. lokalno) prelazi na mail klijent, da se ništa ne izgubi.
      mailtoFallback()
      setStatus('idle')
    }
  }

  const wa = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`

  return (
    <>
      <Seo
        title="Kontakt"
        path="/kontakt"
        description="Započnimo vaš projekat. Pišite nam na WhatsApp ili email, javljamo se u roku od 24 sata."
      />
      <PageHero
        title="Započnimo vaš projekat."
        subtitle="Recite nam nešto o svom poslovanju i ciljevima, a mi se javljamo u roku od 24 sata s prijedlogom sljedećih koraka."
      />

      <section className="band band--shelf">
        <div className="container order__grid">
          <aside className="order__aside">
            <a className="btn btn--red" href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={26} />
              Piši nam na WhatsApp
            </a>
            <dl className="decl">
              <div className="decl__row">
                <dt>Telefon</dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                </dd>
              </div>
              <div className="decl__row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div className="decl__row">
                <dt>Vrijeme odgovora</dt>
                <dd>do 24 sata</dd>
              </div>
            </dl>
            <p className="lede">
              Bilo da vam treba nova web trgovina, stranica ili osvježenje
              postojećeg sajta, tu smo da pomognemo.
            </p>
          </aside>

          <div className="order-form">
            <div className="order-form__head">
              <h2>Narudžbenica</h2>
              <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
                Upit bez obaveze
              </span>
            </div>

            {status === 'sent' ? (
              <div className="order-done" role="status">
                <h2>Hvala na poruci!</h2>
                <p className="lede">Primili smo vaš upit i javljamo se u roku od 24 sata.</p>
              </div>
            ) : (
              <form
                className="order-form__body"
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <p className="hp">
                  <label>
                    Ne popunjavati: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="field">
                  <label htmlFor="name">Ime i prezime</label>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Vaše ime" value={form.name} onChange={update('name')} />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="vas@email.com" value={form.email} onChange={update('email')} />
                </div>

                <div className="field">
                  <label htmlFor="service">Usluga</label>
                  <select id="service" name="service" value={form.service} onChange={update('service')}>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="message">Poruka</label>
                  <textarea id="message" name="message" rows={5} required placeholder="Šta prodajete, gdje sada prodajete i šta vam treba." value={form.message} onChange={update('message')} />
                </div>

                <button type="submit" className="btn btn--red order-form__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Šaljem…' : 'Pošalji upit'}
                  {status !== 'sending' && <Icon name="arrow" className="icon--arrow" />}
                </button>
                <p className="order-form__note">Odgovaramo u roku od 24 sata. Bez spama.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
