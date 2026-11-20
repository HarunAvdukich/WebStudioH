// Tekst stranice /skica: besplatna skica stranice za firmu. Spaja dvije stvari:
// osnovnu skicu odmah (šablon public/demoskica.html sa ?ime=&grad=&vrsta=) i kratku formu
// (Netlify Forms, ime "skica") za jaču skicu po mjeri, koju radi vlasnik. Na nju vode dugmad
// "Besplatna skica" sa početne, meni i reklame. Samo na bosanskom, kao /olx. Bez cijena.

export const jezik = 'bs'
export const put = '/skica'
export const sablon = '/demoskica.html'

export const seo = {
  naslov: 'Besplatna skica stranice za Vašu firmu · Hunar',
  opis: 'Upišite naziv firme i djelatnost, pa odmah vidite osnovnu skicu stranice. Za skicu po mjeri Vaše firme pošaljite kratku formu. Besplatno je.',
}

export const vrh = {
  nad: 'Besplatna skica',
  naslov: 'Pogledajte svoju stranicu prije nego platite išta.',
  uvod: 'Upišite naziv firme, grad i djelatnost, pa odmah dobijete osnovnu skicu. Ako Vam se smjer sviđa, pošaljite kratku formu i napravimo skicu po mjeri Vaše firme, besplatno i bez obaveze.',
  probaj: 'Napravite skicu odmah',
  trazi: 'Tražite skicu po mjeri',
}

export const odmah = {
  nad: 'Odmah, iz šablona',
  naslov: 'Osnovna skica za Vašu vrstu firme.',
  uvod: 'Šablon dobije Vaše ime i grad. Tekst, usluge i slike su primjer, a ništa se ne šalje. Pravu skicu radimo posebno za Vas.',
  polja: { ime: 'Naziv firme', grad: 'Grad', vrsta: 'Djelatnost' },
  vrste: [
    { v: 'frizer', ime: 'Frizer, berbernica' },
    { v: 'ljepota', ime: 'Kozmetički salon' },
    { v: 'stomatolog', ime: 'Stomatolog, ordinacija' },
    { v: 'restoran', ime: 'Restoran, kafić' },
    { v: 'radnja', ime: 'Radnja, web trgovina' },
    { v: 'usluge', ime: 'Druge usluge' },
  ],
  dugme: 'Pokaži skicu',
  oznaka: 'Osnovna skica iz šablona',
  cijeli: 'Otvorite preko cijelog ekrana',
  prazno: 'Ovdje se pojavi skica čim upišete naziv firme.',
  dalje: 'Sviđa Vam se smjer? Tražite skicu po mjeri',
}

export const razlika = {
  nad: 'Dvije skice',
  naslov: 'Šablon pokaže ideju. Skica po mjeri pokaže Vašu firmu.',
  osnovna: {
    naslov: 'Osnovna skica',
    stavke: ['Odmah, ovdje na stranici', 'Šablon za Vašu vrstu firme', 'Vaše ime i grad, ostalo je primjer'],
  },
  mjera: {
    nad: 'Preporučujemo',
    naslov: 'Skica po mjeri',
    stavke: [
      'Radimo je mi, posebno za Vašu firmu',
      'Vaše usluge, tekst i slike, sa Instagrama ili stare stranice',
      'Liči na stranicu koju poslije dobijete',
      'Besplatno i bez obaveze',
    ],
  },
}

export const koraci = {
  nad: 'Kako ide',
  naslov: 'Od forme do razgovora.',
  lista: [
    {
      naslov: 'Pošaljete formu',
      opis: 'Naziv firme, djelatnost i gdje Vas ljudi nađu: Instagram, Facebook ili stara stranica.',
    },
    {
      naslov: 'Napravimo skicu',
      opis: 'Pogledamo šta radite i složimo početnu stranicu sa Vašim uslugama i slikama.',
    },
    {
      naslov: 'Pošaljemo link',
      opis: 'Skicu otvorite na telefonu kao pravu stranicu i pokažete je kome hoćete.',
    },
    {
      naslov: 'Razgovaramo',
      opis: 'Ako Vam se sviđa, dogovorimo šta stranica treba imati. Ako ne, ništa ne dugujete.',
    },
  ],
}

export const obrazac = {
  nad: 'Skica po mjeri',
  naslov: 'Pošaljite nam svoju firmu.',
  uvod: 'Dovoljno je par riječi. Javimo se na kontakt koji ostavite, sa linkom na skicu.',
  polja: {
    firma: 'Naziv firme',
    djelatnost: 'Djelatnost',
    grad: 'Grad',
    kontakt: 'Telefon, Viber ili email',
    link: 'Instagram, Facebook ili stara stranica (ako imate)',
    napomena: 'Šta Vam je najvažnije na stranici? (nije obavezno)',
  },
  primjer: 'Na primjer: da mušterije vide cjenovnik i zakažu termin.',
  dugme: 'Tražim besplatnu skicu',
  saljem: 'Šaljem',
  ispod: 'Besplatno i bez obaveze. Podatke koristimo samo da Vam odgovorimo.',
  hvala: {
    naslov: 'Hvala, stiglo je.',
    opis: 'Pogledamo Vašu firmu i javimo se sa skicom na kontakt koji ste ostavili.',
  },
  greska: 'Forma nije otišla. Pokušajte ponovo ili pišite na WhatsApp 060 3000 751.',
  zamka: 'Ne popunjavati:',
}

export const pitanja = {
  nad: 'Česta pitanja',
  naslov: 'Prije nego što pošaljete.',
  lista: [
    {
      p: 'Je li skica zaista besplatna?',
      o: 'Jeste. Skicu ne plaćate i ne potpisujete ništa. Ako Vam se ne sviđa, ništa ne dugujete.',
    },
    {
      p: 'Po čemu se skica po mjeri razlikuje od osnovne?',
      o: 'Osnovna je isti šablon za sve firme iste vrste. Skicu po mjeri radimo mi, sa Vašim uslugama, tekstom i slikama, pa liči na stranicu koju poslije dobijete.',
    },
    {
      p: 'Šta ako skica nije ono što tražim?',
      o: 'Recite nam šta Vam ne odgovara, pa je doradimo. Ako ne želite dalje, i to je u redu.',
    },
    {
      p: 'Imam samo Instagram. Može li skica?',
      o: 'Može. Iz Instagrama uzmemo slike i usluge, a stranicu poslije povežete sa profilom.',
    },
    {
      p: 'Koliko košta stranica?',
      o: 'Zavisi od toga šta stranica treba imati. Cijenu dogovorimo poslije skice, kad znamo šta Vam treba, i pošaljemo ponudu sa tačnim iznosima.',
    },
  ],
}

export const vise = {
  nad: 'Detaljnije',
  linkovi: [
    { tekst: 'Radovi i studije slučaja', put: '/radovi' },
    { tekst: 'Šta sve radimo', put: '/usluge' },
  ],
}

export const poziv = {
  nad: 'Radije pišete?',
  naslov: 'Skicu možete tražiti i na WhatsApp.',
  opis: 'Pošaljite naziv firme i šta radite, pa Vam skicu pošaljemo i tako. Odgovaramo lično.',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
  poruka: 'Zdravo, želim besplatnu skicu stranice za svoju firmu.',
}
