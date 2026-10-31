// Tekst stranice /zakazivanje: online zakazivanje za berbernice i frizerske salone. Na nju vode
// poruke berbernicama, pa je samo na bosanskom (kao /olx). Uz nju ide živi demo
// /demo-berbernica (public/demo-berbernica.html), koji u linku može nositi ime berbernice.
// Dokaz je SmartTime (src/content/radovi/smarttime.md), gdje kupci termin zakazuju sami.

export const jezik = 'bs'
export const put = '/zakazivanje'
export const demo = '/demo-berbernica'

export const seo = {
  naslov: 'Online zakazivanje za berbernice i salone · Hunar',
  opis: 'Mušterija sama izabere uslugu, berbera i slobodan termin, a podsjetnik stigne na Viber. Isprobajte demo kao mušterija i kao berber.',
}

export const vrh = {
  nad: 'Zakazivanje za berbernice i frizerske salone',
  naslov: 'Mušterija zakaže sama. Telefon ne zvoni usred šišanja.',
  uvod: 'Na Vašoj stranici mušterija izabere uslugu, berbera i slobodan termin, a Vi termin vidite na telefonu. Dan prije joj stigne podsjetnik. Isprobajte demo, pa nam recite kako radite.',
  demo: 'Isprobajte demo',
  pitaj: 'Pitajte za svoju berbernicu',
}

export const probajte = {
  nad: 'Živi demo',
  naslov: 'Probajte sa obje strane.',
  uvod: 'Zakažite termin kao mušterija, pa otvorite raspored i vidite kako ga dobije berber. Termini su izmišljeni i ništa se ne šalje.',
  dijelovi: [
    {
      naslov: 'Mušterija zakazuje',
      opis: 'Usluga, berber ili "prvi slobodan", pa dan i sat. Nude se samo slobodni termini, sa tačnim trajanjem usluge.',
      link: 'Zakažite termin',
      put: '',
    },
    {
      naslov: 'Berber vidi svoj dan',
      opis: 'Termini po berberima, rupe u danu i pauza. Jednim dodirom otkaže termin ili označi da mušterija nije došla.',
      link: 'Otvorite raspored',
      put: '#raspored',
    },
    {
      naslov: 'Podsjetnik na Viber',
      opis: 'Potvrda odmah, podsjetnik dan prije i sat prije termina. U poruci je link za otkazivanje, pa se termin oslobodi.',
      link: 'Pogledajte poruke',
      put: '',
    },
  ],
  izgledi: {
    nad: 'Isti demo u tri izgleda',
    lista: [
      { ime: 'Moderna', izgled: 'moderna' },
      { ime: 'Klasika', izgled: 'klasika' },
      { ime: 'Kao aplikacija', izgled: 'aplikacija' },
    ],
  },
}

export const koraci = {
  nad: 'Kako radi',
  naslov: 'Link u bio, termin u rasporedu.',
  lista: [
    {
      naslov: 'Link gdje Vas traže',
      opis: 'Zakazivanje stoji na Vašoj stranici, a isti link stavite na Instagram, Facebook i Google profil. Mušterija zakaže i u ponoć.',
    },
    {
      naslov: 'Raspored na telefonu',
      opis: 'Svaki berber vidi svoje termine. Mušteriju koja zove upišete u isti raspored, pa se dva termina nikad ne preklope.',
    },
    {
      naslov: 'Podsjetnik umjesto praznog termina',
      opis: 'Mušterija dobije podsjetnik i link za otkazivanje. Kad otkaže, termin je opet slobodan na stranici.',
    },
  ],
}

export const dobijate = {
  nad: 'Šta dobijate',
  naslov: 'Manje poziva, manje praznih termina.',
  stavke: [
    'Usluge sa trajanjem i cijenom, pa Fade dobije 45 minuta, a brada 30.',
    'Svaki berber sa svojim radnim vremenom, pauzom i slobodnim danima.',
    'Izbor "prvi slobodan" za mušteriju kojoj je svejedno kod koga.',
    'Potvrda i podsjetnik na Viber ili SMS, sa linkom za otkazivanje.',
    'Termini sa telefona i sa stranice u istom rasporedu.',
    'Stranica berbernice sa cjenovnikom, adresom i radnim vremenom, ako je još nemate.',
  ],
  dokaz: {
    nad: 'Već radi',
    naslov: 'SmartTime, radnja za satove',
    opis: 'Kupci SmartTimea sami zakazuju zamjenu baterije, graviranje i popravku: izaberu uslugu, slobodan dan i sat, pa potvrde. Nudi se samo termin koji je slobodan.',
    link: 'Kako smo radili SmartTime',
    put: '/radovi/smarttime',
  },
}

export const pitanja = {
  nad: 'Česta pitanja',
  naslov: 'Prije nego što pišete.',
  lista: [
    {
      p: 'Treba li mušteriji aplikacija?',
      o: 'Ne. Zakazuje na Vašoj stranici, sa telefona ili računara, bez instaliranja i bez naloga. Upiše samo ime i broj telefona.',
    },
    {
      p: 'Šta sa mušterijama koje zovu?',
      o: 'Upišete ih u isti raspored. Termin onda nestane sa stranice, pa ga niko drugi ne može uzeti.',
    },
    {
      p: 'Mogu li dobiti ovaj demo sa imenom svoje berbernice?',
      o: 'Možete. Pošaljite nam naziv, grad i imena berbera, pa Vam pošaljemo link sa Vašim imenom.',
    },
    {
      p: 'Imam samo Instagram. Treba li mi stranica?',
      o: 'Zakazivanje mora negdje stajati, pa napravimo kratku stranicu berbernice sa cjenovnikom i zakazivanjem. Link na nju stavite u bio na Instagramu.',
    },
    {
      p: 'Koliko košta?',
      o: 'Zavisi od broja berbera i da li već imate stranicu. Pošaljemo ponudu sa tri paketa i tačnim iznosima u roku od 24 sata. Poruke na Viber i SMS se plaćaju po poruci, pa i taj iznos piše u ponudi.',
    },
  ],
}

export const vise = {
  nad: 'Detaljnije',
  linkovi: [
    { tekst: 'Kako smo radili SmartTime', put: '/radovi/smarttime' },
    { tekst: 'Vodič: online zakazivanje termina', put: '/savjeti/online-zakazivanje-termina' },
  ],
}

export const poziv = {
  nad: 'Vaša berbernica',
  naslov: 'Recite nam kako radite.',
  opis: 'Koliko berbera, koje usluge i kako sada primate termine. Pošaljemo Vam demo sa Vašim imenom. Odgovaramo lično.',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
  poruka: 'Zdravo! Imam berbernicu i zanima me online zakazivanje termina (hunar.ba/zakazivanje).',
}
