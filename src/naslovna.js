// Nova početna (Claude Design, 19. 11. 2026): podaci za liste. Tekst ostalih dijelova je u Naslovna.jsx.
import { gradovi as sviGradovi, putGrada } from './stranice/gradovi.js'

export const WA = 'https://wa.me/387603000751'
export const WA_SKICA = `${WA}?text=${encodeURIComponent('Zdravo, želim besplatnu skicu stranice za svoju firmu.')}`
export const WA_PREGLED = `${WA}?text=${encodeURIComponent('Zdravo, imam stranicu i zanima me besplatan pregled.')}`
export const WA_POSAO = `${WA}?text=${encodeURIComponent('Zdravo, evo čime se bavim: ')}`
export const VIBER = 'viber://chat?number=%2B387603000751'

export const meni = [
  { ime: 'Usluge', link: '/usluge' },
  { ime: 'Radovi', link: '/radovi' },
  { ime: 'Cijene', link: '/cijene' },
  { ime: 'O Hunaru', link: '/o-nama' },
  { ime: 'Savjeti', link: '/savjeti' },
  { ime: 'Besplatna skica', link: '/skica' },
  { ime: 'Kontakt', link: '/kontakt' },
]

export const stubovi = [
  { naslov: 'Veze koje traži bh. trgovina', tekst: 'OLX oglasi se ažuriraju sami, Ananas feed i uvoz kataloga od dobavljača. Artikal unesete jednom.', ikona: 'M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8' },
  { naslov: 'Sve na jednom mjestu', tekst: 'Dizajn, kod, hosting i održavanje u istom studiju. Kad nešto zatreba, zovete jedan broj.', ikona: 'M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5' },
  { naslov: 'AI koji radi posao', tekst: 'Asistent Kobi na mrt.ba odgovara kupcima i noću. Opisi artikala i sitni poslovi idu sami.', ikona: 'M12 3v3M12 18v3M3 12h3M18 12h3M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2' },
  { naslov: 'Brzina koju mjerite sami', tekst: 'Ne tražimo da nam vjerujete na riječ. Ubacite adresu u PageSpeed i pogledajte.', ikona: 'M12 14l4-4M4 18a9 9 0 1 1 16 0' },
]

export const usluge = [
  { br: '01', naslov: 'Web stranice', opis: 'Da Vas kupci nađu i shvate za pola minute.', link: '/izrada-web-stranica', ikona: 'M3 5h18v14H3zM3 9h18' },
  { br: '02', naslov: 'Web shop', opis: 'Radnja koja je otvorena i kad ste Vi zatvorili. Može i uz OLX.', link: '/izrada-web-shopa', ikona: 'M5 7h14l-1 13H6zM9 7a3 3 0 0 1 6 0' },
  { br: '03', naslov: 'Online rezervacije', opis: 'Kupac sam rezerviše termin, i kad ste zatvoreni.', link: '/zakazivanje', ikona: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4' },
  { br: '04', naslov: 'AI chatbot', opis: 'Asistent koji kupcima odgovara na stranici, i noću.', link: '/usluge', ikona: 'M4 5h16v11H9l-5 4zM9 10h.01M15 10h.01' },
]

export const koraci = [
  { br: 'Korak 01', naslov: 'Razgovor', tekst: 'Na WhatsAppu ili telefonom: šta prodajete, kome i šta Vam danas smeta.' },
  { br: 'Korak 02', naslov: 'Ponuda', tekst: 'Pisana ponuda sa cijenom, rokom i spiskom onoga što dobijate.' },
  { br: 'Korak 03', naslov: 'Dizajn i izrada', tekst: 'Stranicu gledate dok nastaje, na probnom linku, i kažete šta mijenjamo.' },
  { br: 'Korak 04', naslov: 'Objava', tekst: 'Domena, hosting, Google i veze sa OLX-om ili dobavljačima. Sve podesimo mi.' },
  { br: 'Korak 05', naslov: 'Održavanje', tekst: 'Pratimo da stranica radi i dopunjujemo je kad posao raste.' },
]

export const djelatnosti = [
  { naslov: 'Trgovine i web shopovi', tekst: 'Katalog, korpa, pouzeće, OLX', link: '/olx' },
  { naslov: 'Alati, oprema, dijelovi', tekst: 'Hiljade artikala od dobavljača', link: '/radovi/mrt' },
  { naslov: 'Veleprodaja (B2B)', tekst: 'Portal sa cijenama za partnere', link: '/radovi/mrt' },
  { naslov: 'Frizeri i saloni', tekst: 'Termini bez poziva i poruka', link: '/zakazivanje' },
  { naslov: 'Stomatolozi i ordinacije', tekst: 'Zakazivanje i podsjetnici', link: '/zakazivanje' },
  { naslov: 'Restorani i kafići', tekst: 'Meni, rezervacije, narudžbe', link: '/usluge' },
]

export const gradovi = sviGradovi.map((g) => ({ ime: g.ime, slug: g.slug, link: putGrada(g) }))

export const pitanja = [
  { q: 'Koliko košta izrada web stranice?', a: 'Zavisi od toga šta Vam treba: broj stranica, web shop, veze sa OLX-om ili dobavljačima. Zato nemamo fiksni cjenovnik. Poslije kratkog razgovora šaljemo pisanu ponudu sa cijenom i rokom.' },
  { q: 'Koliko traje izrada?', a: 'Rok pišemo u ponudi i držimo ga. Jednostavna stranica je gotova brže, a web shop sa vezama treba više vremena.' },
  { q: 'Da li je stranica moja?', a: 'Da. Stranica, domena i materijali su Vaši.' },
  { q: 'Plaćam li nešto svaki mjesec?', a: 'Ne. Plaćate izradu, 30 % na početku i 70 % na kraju, a za stranicu nema mjesečne naknade.' },
  { q: 'Šta ako nešto zatreba poslije predaje?', a: 'Prvih 30 dana poslije predaje sitne izmjene i pitanja su uključeni. Na poruke odgovaramo najkasnije za 24 sata.' },
  { q: 'Mogu li sam mijenjati sadržaj?', a: 'Da. Tekst, slike i artikle mijenjate sami, a mi pomognemo kad zatreba.' },
  { q: 'Možete li povezati trgovinu sa OLX-om?', a: 'Možemo. Na mrt.ba se OLX oglasi prave i ažuriraju iz istog kataloga kao web shop, pa cijenu ili zalihu mijenjate na jednom mjestu.' },
  { q: 'Radite li redizajn postojeće stranice?', a: 'Da. Pošaljite nam link, pa Vam kažemo šta bismo promijenili i zašto.' },
  { q: 'Radite li za firme van BiH?', a: 'Da. Za firme van BiH imamo stranicu na engleskom, a razgovor može na bosanskom ili engleskom.' },
]
