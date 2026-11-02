// Tekst stranice /olx: web shop koji sam drži OLX oglase ažurnim. Na nju vode poruke firmama
// na OLX-u i WhatsAppu, pa je samo na bosanskom (OLX je bh. tržište). Činjenice su iz studije
// mrt.ba (src/content/radovi/mrt.md) i zapisa snimka (public/olx/mrt-olx.json).

export const jezik = 'bs'
export const put = '/olx'

export const seo = {
  naslov: 'Web shop koji sam drži OLX oglase ažurnim · Hunar',
  opis: 'Promijenite cijenu u web shopu, a OLX oglas se ispravi sam. Snimak sa mrt.ba, koji ovako drži preko 3.000 oglasa (11. 10. 2026).',
}

export const vrh = {
  nad: 'OLX veza za trgovine',
  naslov: 'Promijenite cijenu na sajtu. OLX oglas se ispravi sam.',
  uvod: 'Za trgovinu mrt.ba smo napravili web shop koji sam drži njihove OLX oglase ažurnim. Pogledajte snimak od 40 sekundi sa stvarnim artiklom.',
  snimak: 'Pogledajte snimak',
  pitaj: 'Pitajte za svoju trgovinu',
}

export const snimak = {
  nad: 'Stvaran snimak, 6. 10. 2026.',
  naslov: '14 sekundi od klika do OLX-a.',
  uvod: 'Na mrt.ba smo kosilici promijenili cijenu sa 1.399 na 1.400 KM i kliknuli Ažuriraj (6. 10. 2026). Oglas na OLX-u je novu cijenu pokazao 14 sekundi kasnije, bez ijednog klika na OLX-u. Cijenu smo odmah vratili, a OLX ju je pratio za 31 sekundu.',
  video: '/olx/mrt-olx.mp4',
  slika: { src: '/olx/mrt-olx.webp', width: 720, height: 1280 },
  alt: 'Snimak: oglas za kosilicu na OLX-u pokazuje novu cijenu 14 sekundi poslije promjene na mrt.ba',
  pusti: 'Pusti snimak',
  trajanje: '40 s',
  opis: 'Snimak je napravljen na živom mrt.ba i živom OLX-u. Zvuka nema.',
}

export const koraci = {
  nad: 'Kako radi',
  naslov: 'Trgovina vodi, OLX prati.',
  lista: [
    {
      naslov: 'Sve je u Vašem web shopu',
      opis: 'Artikle, cijene, zalihu i opise vodite na jednom mjestu. Shop je izvor istine, a OLX ga prati.',
    },
    {
      naslov: 'Pravila po kategorijama',
      opis: 'Za svaku kategoriju shopa jednom odredimo OLX kategoriju i atribute. Svaki sljedeći artikal te kategorije ih dobije sam.',
    },
    {
      naslov: 'OLX se mijenja sam',
      opis: 'Promijenite cijenu, zalihu ili opis u shopu i promjena ode na oglas. Sve radi na serveru: ne treba upaljen računar ni klik na OLX-u.',
    },
  ],
}

export const dobijate = {
  nad: 'Šta dobijate',
  naslov: 'Kraj prepisivanja oglas po oglas.',
  stavke: [
    'Novi artikal iz shopa sam ode na OLX, sa kategorijom i atributima.',
    'Promjena cijene, zalihe ili opisa ode i na oglas.',
    'Provjera svakih 15 minuta uhvati izmjene koje bi inače promakle.',
    'Artikal kojem fali obavezan podatak čeka, umjesto da ode na OLX napamet.',
    'Kad objavite puno artikala odjednom, objava sama nastavi sljedeći dan, jer OLX prima najviše 350 novih oglasa dnevno.',
  ],
  brojke: [
    { do: 3061, opis: 'Toliko aktivnih oglasa mrt.ba ima na OLX-u, i svi se ovako drže ažurnim.', datum: 'izbrojano na OLX-u 11. 10. 2026.' },
    { do: 14, poslije: ' s', opis: 'Od klika na Ažuriraj do nove cijene na OLX-u.', datum: 'izmjereno 6. 10. 2026.' },
  ],
  brojkeNad: 'Na mrt.ba',
}

// Igra je ista kao na Uslugama; napomena ispod nje nosi broj oglasa sa ove stranice.
export const igraNapomena = 'Ilustracija. Na mrt.ba ovako radi 3.061 oglas (11. 10. 2026).'

export const pitanja = {
  nad: 'Česta pitanja',
  naslov: 'Prije nego što pišete.',
  lista: [
    {
      p: 'Moram li imati web shop?',
      o: 'Da, jer OLX prati Vašu trgovinu. Ako je još nemate, napravimo je zajedno sa OLX vezom.',
    },
    {
      p: 'Već imam web shop. Može li se veza dodati?',
      o: 'Često može. Pošaljite nam link, pa Vam za dan ili dva kažemo šta se može dodati, a kada je brže i jeftinije napraviti nov shop.',
    },
    {
      p: 'Kako artikli uđu u shop?',
      o: 'Ako ih imate u tabeli ili programu, uvezemo ih odatle, pa ne kucate sve ispočetka.',
    },
    {
      p: 'Šta ako artikal nema sve što OLX traži?',
      o: 'Čeka. Oglas ne šaljemo napamet: kad dopunite podatak u shopu, oglas ode sam.',
    },
    {
      p: 'Koliko košta?',
      o: 'Zavisi od broja artikala i kategorija. Pošaljemo ponudu sa tri paketa i tačnim iznosima u roku od 24 sata. Iznosi su konačni, PDV se ne dodaje.',
    },
  ],
}

export const vise = {
  nad: 'Detaljnije',
  linkovi: [
    { tekst: 'Kako smo radili mrt.ba', put: '/radovi/mrt' },
    { tekst: 'Vodič: kako povezati web shop sa OLX-om', put: '/savjeti/povezivanje-web-shopa-sa-olx-om' },
  ],
}

export const poziv = {
  nad: 'Vaša trgovina',
  naslov: 'Recite nam koliko artikala imate.',
  opis: 'Pogledamo Vaš OLX profil i kažemo šta bi veza uradila kod Vas. Odgovaramo lično.',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
  poruka: 'Zdravo! Imam trgovinu na OLX-u i zanima me web shop koji sam ažurira oglase (hunar.ba/olx).',
}
