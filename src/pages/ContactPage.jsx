import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
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

  return (
    <>
      <Seo
        title="Kontakt"
        path="/kontakt"
        description="Započnimo vaš projekat. Pišite nam na WhatsApp ili email, javljamo se u roku od 24 sata."
      />
      <PageHero
        eyebrow="Kontakt"
        title="Započnimo vaš projekat."
        subtitle="Recite nam nešto o svom poslovanju i ciljevima, a mi se javljamo u roku od 24 sata s prijedlogom sljedećih koraka."
      />

      <section className="contact">
        <div className="container contact__grid">
          <aside className="contact__aside" data-reveal>
            <h2 className="contact__aside-title">Razgovarajmo</h2>
            <p className="contact__aside-text">
              Bilo da vam treba nova web trgovina, stranica ili osvježenje
              postojećeg sajta, tu smo da pomognemo.
            </p>

            <div className="contact__actions">
              <a
                className="btn btn--md btn--wa"
                href={`${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Piši nam na WhatsApp
              </a>
            </div>

            <div className="contact__detail">
              <span className="contact__detail-label">Email</span>
              <a href={`mailto:${contact.email}`} className="contact__detail-value">
                {contact.email}
              </a>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">Telefon</span>
              <a href={contact.phoneHref} className="contact__detail-value">
                {contact.phoneDisplay}
              </a>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">Vrijeme odgovora</span>
              <span className="contact__detail-value">U roku od 24 sata</span>
            </div>
          </aside>

          {status === 'sent' ? (
            <div className="contact__done" data-reveal>
              <div className="contact__done-check">
                <i />
              </div>
              <h2>Hvala na poruci!</h2>
              <p>Primili smo vaš upit i javljamo se u roku od 24 sata.</p>
            </div>
          ) : (
            <form
              className="contact__form"
              data-reveal
              data-reveal-delay="90"
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p className="contact__hp">
                <label>
                  Ne popunjavati: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="field">
                <label htmlFor="name">Ime i prezime</label>
                <input id="name" name="name" type="text" required placeholder="Vaše ime" value={form.name} onChange={update('name')} />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="vas@email.com" value={form.email} onChange={update('email')} />
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
                <textarea id="message" name="message" rows={5} required placeholder="Ukratko o vašem projektu..." value={form.message} onChange={update('message')} />
              </div>

              <button type="submit" className="btn btn--md btn--primary contact__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Šaljem…' : 'Pošalji upit →'}
              </button>
              <p className="contact__note">Odgovaramo u roku od 24 sata. Bez spama.</p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
