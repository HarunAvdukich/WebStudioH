// Stranice "Izrada web stranica <grad>" (/izrada-web-stranica/<slug>), 19. 11. 2026.
// Svaki grad ima svoj dio teksta (lokalno, pitanje), da stranice ne budu kopije sa drugim imenom.
// Stvaran rad navodimo samo gdje postoji: SmartTime (poslovnice u Kantonu Sarajevo, smarttime.ba/kontakt)
// i mrt.ba (Brčko, mrt.ba/kontakt), provjereno 19. 11. 2026.

export const gradovi = [
  {
    slug: 'sarajevo', ime: 'Sarajevo', gen: 'Sarajeva', iz: 'iz Sarajeva', u: 'u Sarajevu',
    podrucje: 'Kanton Sarajevo', susjedi: ['visoko', 'zenica', 'gorazde'],
    opis: 'Izrada web stranica i web shopa za firme iz Sarajeva: dizajn za telefon, SEO osnova, zakazivanje i održavanje. Primjer: SmartTime. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Sarajeva i okoline, od Ilidže i Vogošće do Ilijaša. Jedna od njih je SmartTime, radnja satova sa tri poslovnice.',
    lokalno: {
      naslov: 'Na najjačem tržištu u BiH pobjeđuje jasna stranica',
      tekst: 'Kad kupac ukuca „frizer Sarajevo" ili „servis klima Sarajevo", dobije desetine firmi. Tada ne odlučuje samo izgled, nego to da li stranica za svaku uslugu ima svoj tekst, okvir cijene i jasan put do poziva. Firma sa više poslovnica treba za svaku adresu, radno vrijeme i telefon, isto kao na Google profilu. Sarajevo ima i mnogo gostiju iz inostranstva i dijaspore, pa ugostiteljima, smještaju i radnjama često treba i engleska verzija.',
    },
    pitanje: {
      q: 'Imamo više poslovnica. Kako ih prikazati?',
      a: 'Svaka poslovnica dobije adresu, radno vrijeme, telefon i link na mapu, tako da kupac odmah vidi koja mu je najbliža. Isti podaci trebaju stajati i na Google profilu svake poslovnice. Tako smo uradili i za SmartTime, koji ima poslovnice na Ilidži, u Vogošći i Ilijašu.',
    },
  },
  {
    slug: 'banja-luka', ime: 'Banja Luka', gen: 'Banje Luke', iz: 'iz Banje Luke', u: 'u Banjoj Luci',
    podrucje: 'Republika Srpska', susjedi: ['prijedor', 'doboj', 'bijeljina'],
    opis: 'Izrada web stranica i web shopa za firme iz Banje Luke: latinica i ćirilica, dizajn za telefon, SEO osnova i održavanje. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Banje Luke i okoline, od Laktaša do Gradiške i Čelinca. Stranicu možemo napraviti na latinici, na ćirilici ili na oba pisma.',
    lokalno: {
      naslov: 'Latinica, ćirilica ili oba pisma',
      tekst: 'Dio kupaca u Banjoj Luci čita radije ćirilicu, a dio latinicu. Stranica može imati oba pisma, sa prekidačem na vrhu, a tekst se piše samo jednom. Važno je da obje verzije imaju svoje adrese, da ih Google prikaže onome ko pretražuje na tom pismu. Za firme koje rade i sa partnerima iz Srbije i Hrvatske dogovorimo i koji izrazi i valute stoje na stranici, da kupac ne mora pogađati.',
    },
    pitanje: {
      q: 'Možete li napraviti stranicu na ćirilici?',
      a: 'Da. Možemo napraviti stranicu samo na ćirilici ili na oba pisma, pri čemu svaka verzija ima svoju adresu i naslove za Google. Kontakt obrazac i poruke kupcima prate pismo koje je kupac izabrao.',
    },
  },
  {
    slug: 'tuzla', ime: 'Tuzla', gen: 'Tuzle', iz: 'iz Tuzle', u: 'u Tuzli',
    podrucje: 'Tuzlanski kanton', susjedi: ['lukavac', 'gracanica', 'bijeljina'],
    opis: 'Izrada web stranica i web shopa za firme iz Tuzle: dizajn za telefon, zakazivanje termina, dostava, SEO osnova i održavanje. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Tuzle i cijelog kantona, od Živinica i Lukavca do Srebrenika i Kalesije.',
    lokalno: {
      naslov: 'Kupci dolaze iz cijelog kantona',
      tekst: 'Tuzla je centar sjeveroistoka BiH, pa radnje i servisi imaju kupce i iz okolnih općina. Takav kupac ne želi putovati uzalud. Prije polaska hoće znati da li artikal ima na stanju, kada je slobodan termin i da li može naručiti sa dostavom. Zato stranica treba pokazati zalihu ili mogućnost narudžbe, termin koji se bira sam i jasno napisano područje dostave.',
    },
    pitanje: {
      q: 'Može li kupac zakazati termin na stranici?',
      a: 'Da. Kupac bira uslugu, slobodan dan i sat, upiše podatke i potvrdi, a Vi dobijete obavijest. Nudi se samo termin koji je slobodan. Više je na stranici [online zakazivanje](/zakazivanje).',
    },
  },
  {
    slug: 'zenica', ime: 'Zenica', gen: 'Zenice', iz: 'iz Zenice', u: 'u Zenici',
    podrucje: 'Zeničko-dobojski kanton', susjedi: ['visoko', 'travnik', 'doboj'],
    opis: 'Izrada web stranica za firme iz Zenice: reference, upit za ponudu, dizajn za telefon, SEO osnova i održavanje. Web shop i B2B portal po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Zenice i okoline, od Kaknja i Viteza do Žepča i Maglaja. Posebno firmama koje rade za druge firme.',
    lokalno: {
      naslov: 'Firmama koje rade za druge firme',
      tekst: 'Zenica ima mnogo proizvodnih, građevinskih i transportnih firmi kojima kupac nije prolaznik, nego druga firma. Takav kupac na stranici traži dokaz da posao možete izvesti: reference, opremu, kapacitet i ljude za kontakt. Zato stranica treba imati izvedene radove sa slikama, jasan opis onoga što radite i obrazac za upit u koji se može priložiti nacrt ili specifikacija. Za stalne kupce možemo napraviti i B2B portal sa njihovim cijenama.',
    },
    pitanje: {
      q: 'Možemo li na stranici primati upite sa nacrtima?',
      a: 'Da. Obrazac za upit može primati priloge, na primjer nacrt, specifikaciju ili fotografiju, i poslati ih na Vaš mail. Polja obrasca dogovorimo prema tome šta Vam treba za ponudu.',
    },
  },
  {
    slug: 'mostar', ime: 'Mostar', gen: 'Mostara', iz: 'iz Mostara', u: 'u Mostaru',
    podrucje: 'Hercegovačko-neretvanski kanton', susjedi: ['siroki-brijeg', 'livno', 'sarajevo'],
    opis: 'Izrada web stranica za firme iz Mostara: više jezika, meni i radno vrijeme, dizajn za telefon, SEO osnova i održavanje. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Mostara i okoline, od Blagaja i Čapljine do Konjica i Jablanice. I za one čiji su kupci većinom gosti iz inostranstva.',
    lokalno: {
      naslov: 'Ugostitelji i radnje kojima dolaze gosti',
      tekst: 'U Mostaru veliki dio kupaca čine turisti koji grad ne poznaju. Restoran, kafić ili radnja tada treba stranicu koja na telefonu, na engleskom i po potrebi na još jednom jeziku pokaže meni ili ponudu, radno vrijeme i put do vrata. Gost odluku često donosi na ulici, pa stranica mora biti brza i preko mobilnog interneta. Iste podatke treba držati tačnim i na Google profilu, jer turist prvo gleda mapu.',
    },
    pitanje: {
      q: 'Možete li napraviti stranicu na više jezika?',
      a: 'Da. Svaki jezik dobije svoju adresu i naslove, da ga Google prikaže gostu koji pretražuje na tom jeziku. Prevod možete dati Vi, ili ga pripremimo pa ga provjeri neko ko jezik dobro zna.',
    },
  },
  {
    slug: 'bijeljina', ime: 'Bijeljina', gen: 'Bijeljine', iz: 'iz Bijeljine', u: 'u Bijeljini',
    podrucje: 'Republika Srpska', susjedi: ['brcko', 'tuzla', 'banja-luka'],
    opis: 'Izrada web stranica i web shopa za firme iz Bijeljine: OLX veza, katalog, dostava, dizajn za telefon i SEO osnova. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Bijeljine i Semberije, od Janje do Ugljevika i Lopara. Naš najbliži primjer je mrt.ba iz susjednog Brčkog.',
    lokalno: {
      naslov: 'Trgovine opreme koje već prodaju preko OLX-a',
      tekst: 'U Semberiji mnogo trgovina prodaje poljoprivrednu i vrtnu opremu, alat i rezervne dijelove, a velik dio prodaje ide preko OLX-a. Takvoj trgovini ne treba stranica koja se vodi odvojeno od oglasa. Bolje je da web shop bude izvor podataka, a da se OLX oglasi drže ažurnim sami. Upravo to smo napravili za mrt.ba u Brčkom: promjena cijene ili zalihe na stranici ode i na oglas.',
    },
    pitanje: {
      q: 'Možemo li zadržati OLX i imati web shop?',
      a: 'Da. Artikal unesete jednom, a cijena i zaliha ostaju iste na stranici i na OLX-u. Kako to izgleda na mrt.ba pogledajte na stranici [za OLX trgovine](/olx).',
    },
  },
  {
    slug: 'prijedor', ime: 'Prijedor', gen: 'Prijedora', iz: 'iz Prijedora', u: 'u Prijedoru',
    podrucje: 'Republika Srpska', susjedi: ['banja-luka', 'bihac', 'cazin'],
    opis: 'Izrada web stranica za firme iz Prijedora: galerija radova, upit sa slikom, dizajn za telefon, SEO osnova i održavanje. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice za firme iz Prijedora i okoline, od Kozarske Dubice do Novog Grada i Sanskog Mosta. Posebno za majstore i servise koji rade na terenu.',
    lokalno: {
      naslov: 'Majstori i servisi koji rade na terenu',
      tekst: 'Firmi koja radi kod kupca, na primjer vodoinstalateru, električaru, stolaru ili servisu klima uređaja, stranica služi da kupac vidi urađene poslove i javi se sa dovoljno podataka. Zato su važni galerija radova sa kratkim opisom, spisak mjesta u kojima radite i obrazac u koji kupac može dodati fotografiju kvara ili prostora. Tako ponudu ili procjenu možete dati prije nego što izađete na teren.',
    },
    pitanje: {
      q: 'Može li kupac poslati sliku kvara preko stranice?',
      a: 'Da. Obrazac može primati fotografije sa telefona, ili kupca jednim dodirom prebaciti na WhatsApp, gdje sliku pošalje kao i inače. Šta je praktičnije dogovorimo prema tome kako radite.',
    },
  },
  {
    slug: 'brcko', ime: 'Brčko', gen: 'Brčkog', iz: 'iz Brčkog', u: 'u Brčkom',
    podrucje: 'Brčko distrikt BiH', susjedi: ['bijeljina', 'tuzla', 'gracanica'],
    opis: 'Izrada web stranica i web shopa za firme iz Brčkog: OLX veza, uvoz od dobavljača, dizajn za telefon i SEO. Primjer: mrt.ba. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Brčko distrikta. Jedna od njih je mrt.ba, trgovina alata i mašina koja prodaje i preko OLX-a.',
    lokalno: {
      naslov: 'Za firme iz Brčkog koje prodaju i van grada',
      tekst: 'Trgovina iz Brčkog često ima kupce i u drugim gradovima, koji naručuju preko OLX-a, telefona ili stranice. Web stranica tada radi dva posla. Kupcu iz grada kaže gdje ste i kada radite, a kupcu izdaleka da može pronaći artikal, vidjeti zalihu i naručiti sa dostavom, bez dolaska u radnju.',
    },
    pitanje: {
      q: 'Pravite li i obične web stranice, ne samo trgovine?',
      a: 'Da. Firmi koja ne prodaje artikle pravimo [web stranicu](/izrada-web-stranica) sa uslugama, radovima i kontaktom. Trgovinu ili zakazivanje možemo dodati kasnije.',
    },
  },
  {
    slug: 'doboj', ime: 'Doboj', gen: 'Doboja', iz: 'iz Doboja', u: 'u Doboju',
    podrucje: 'Republika Srpska', susjedi: ['zenica', 'gracanica', 'banja-luka'],
    opis: 'Izrada web stranica za firme iz Doboja: stranica za svaku uslugu i mjesto, Google profil, dizajn za telefon i SEO osnova. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice za firme iz Doboja i okoline, od Maglaja i Tešnja do Dervente i Modriče. I za one koje rade u više općina odjednom.',
    lokalno: {
      naslov: 'Kad radite u više općina',
      tekst: 'Mnoge firme iz Doboja rade i u Maglaju, Tešnju, Derventi ili Modriči. Kupac iz tih mjesta pretražuje sa imenom svog mjesta, pa stranica treba jasno reći gdje radite, a ne samo „Doboj i okolina". Pomaže i da svaka glavna usluga ima svoju stranicu sa opisom, primjerom i cijenom ili okvirom cijene. Na Google profilu u područje rada upišete ista mjesta kao na stranici.',
    },
    pitanje: {
      q: 'Trebamo li posebnu stranicu za svako mjesto?',
      a: 'Samo ako za to mjesto imate šta posebno reći, na primjer radove ili poslovnicu. Inače je bolje da svaka usluga ima svoju stranicu, a mjesta u kojima radite budu jasno navedena na njoj i na Google profilu.',
    },
  },
  {
    slug: 'cazin', ime: 'Cazin', gen: 'Cazina', iz: 'iz Cazina', u: 'u Cazinu',
    podrucje: 'Unsko-sanski kanton', susjedi: ['bihac', 'prijedor', 'banja-luka'],
    opis: 'Izrada web stranica i web shopa za firme iz Cazina: kupci iz dijaspore, njemački jezik, plaćanje karticom, dizajn za telefon. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Cazina i okoline, od Bužima do Velike Kladuše i Bosanske Krupe. I za one čiji su kupci u dijaspori.',
    lokalno: {
      naslov: 'Kupci iz dijaspore',
      tekst: 'Krajina ima veliku dijasporu, pa dobar dio kupaca firmi iz Cazina živi u Njemačkoj, Austriji ili Sloveniji. Takav kupac naručuje za porodicu, rezerviše termin za ljeto ili traži majstora za kuću na koju dolazi jednom godišnje. Njemu treba stranica na njegovom jeziku, plaćanje karticom ili uplatom iz inostranstva i brz odgovor na WhatsApp, bez obzira na vremensku razliku.',
    },
    pitanje: {
      q: 'Može li kupac iz inostranstva platiti karticom?',
      a: 'Da, uz dogovor sa Vašom bankom o naplati karticom. Za usluge kojima ne treba naplata unaprijed dovoljni su rezervacija ili upit, a plaćanje ide na licu mjesta.',
    },
  },
  {
    slug: 'bihac', ime: 'Bihać', gen: 'Bihaća', iz: 'iz Bihaća', u: 'u Bihaću',
    podrucje: 'Unsko-sanski kanton', susjedi: ['cazin', 'prijedor', 'livno'],
    opis: 'Izrada web stranica za smještaj i firme iz Bihaća: direktne rezervacije, više jezika, dizajn za telefon i SEO osnova. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Bihaća i okoline, od Bosanske Krupe do Bosanskog Petrovca. I za smještaj i aktivnosti na Uni.',
    lokalno: {
      naslov: 'Smještaj i aktivnosti na Uni',
      tekst: 'Apartmani, kampovi i firme koje organizuju rafting ili izlete na Uni većinu gostiju dobiju preko platformi za rezervacije, uz proviziju. Vlastita stranica sa kalendarom slobodnih termina i direktnom rezervacijom ne mora zamijeniti platforme, ali gost koji se vraća ili Vas pronađe na Googleu može rezervisati direktno. Stranica treba fotografije, cijene po sezoni, uslove otkazivanja i bar engleski jezik.',
    },
    pitanje: {
      q: 'Može li gost rezervisati direktno na stranici?',
      a: 'Da. Gost vidi slobodne datume, pošalje rezervaciju i dobije potvrdu, a Vi obavijest. Uslove plaćanja i otkazivanja dogovorimo prema tome kako radite sada.',
    },
  },
  {
    slug: 'travnik', ime: 'Travnik', gen: 'Travnika', iz: 'iz Travnika', u: 'u Travniku',
    podrucje: 'Srednjobosanski kanton', susjedi: ['zenica', 'visoko', 'sarajevo'],
    opis: 'Izrada web stranica i web shopa za firme iz Travnika: online prodaja domaćih proizvoda, dostava, dizajn za telefon i SEO. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Travnika i okoline, od Viteza i Novog Travnika do Vlašića. I za male proizvođače koji žele prodavati online.',
    lokalno: {
      naslov: 'Mali proizvođači koji prodaju online',
      tekst: 'Srednja Bosna ima mnogo malih proizvođača: sira, meda, suhomesnatih proizvoda i rukotvorina. Takvoj firmi ne treba velika trgovina, nego nekoliko dobro fotografisanih artikala, jasna cijena dostave i jednostavna narudžba sa telefona. Kupac iz drugog grada treba znati kako se proizvod pakuje i koliko putuje, a stalni kupac da može ponoviti narudžbu bez traženja.',
    },
    pitanje: {
      q: 'Isplati li se web shop za nekoliko artikala?',
      a: 'Za mali broj artikala trgovina može biti jednostavna, sa narudžbom i pouzećem. Ako već prodajete preko Instagrama ili telefona, stranica Vam štedi vrijeme na odgovaranju na ista pitanja o cijeni i dostavi.',
    },
  },
  {
    slug: 'gracanica', ime: 'Gračanica', gen: 'Gračanice', iz: 'iz Gračanice', u: 'u Gračanici',
    podrucje: 'Tuzlanski kanton', susjedi: ['tuzla', 'lukavac', 'doboj'],
    opis: 'Izrada web stranica i web shopa za firme iz Gračanice: veleprodaja i maloprodaja, B2B cijene, katalog i SEO osnova. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Gračanice i okoline, od Doboj Istoka do Petrova. I za proizvođače koji prodaju i veleprodaji i krajnjem kupcu.',
    lokalno: {
      naslov: 'Veleprodaja i maloprodaja na jednoj stranici',
      tekst: 'Firma koja prodaje i trgovinama i krajnjem kupcu ima dvije vrste cijena i dvije vrste kupaca. Krajnji kupac vidi maloprodajnu cijenu i naručuje kao u svakoj trgovini. Poslovni kupac se prijavi i vidi svoje cijene, minimalne količine i istoriju narudžbi. Takav B2B portal smo napravili za mrt.ba, pa znamo šta treba dogovoriti prije početka.',
    },
    pitanje: {
      q: 'Mogu li poslovni kupci vidjeti svoje cijene?',
      a: 'Da. Poslovni kupac se prijavi i vidi cijene i uslove koje ste mu dodijelili, dok ostali kupci vide maloprodajne cijene. Kako je to urađeno na mrt.ba opisano je u studiji [mrt.ba](/radovi/mrt).',
    },
  },
  {
    slug: 'lukavac', ime: 'Lukavac', gen: 'Lukavca', iz: 'iz Lukavca', u: 'u Lukavcu',
    podrucje: 'Tuzlanski kanton', susjedi: ['tuzla', 'gracanica', 'zenica'],
    opis: 'Izrada web stranica za male firme iz Lukavca: jednostavna stranica za početak, Google profil, dizajn za telefon i SEO osnova. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice za firme iz Lukavca i okoline, od Puračića do Banovića. I za male firme koje prvi put izlaze na internet.',
    lokalno: {
      naslov: 'Prva stranica za malu firmu',
      tekst: 'Mala firma ne mora početi velikom stranicom. Za početak su dovoljne usluge sa kratkim opisom, nekoliko fotografija rada, radno vrijeme, mapa i dugme za poziv ili WhatsApp. Uz to uredimo Google profil, jer ga kupac u manjem mjestu često vidi prije stranice. Kad posao poraste, stranica se dopunjava: novim uslugama, cjenovnikom ili zakazivanjem.',
    },
    pitanje: {
      q: 'Šta nam treba za početak?',
      a: 'Naziv firme, spisak usluga, nekoliko fotografija i kontakt. Tekst možemo pripremiti zajedno sa Vama, iz razgovora o tome šta radite i šta Vas kupci najčešće pitaju.',
    },
  },
  {
    slug: 'visoko', ime: 'Visoko', gen: 'Visokog', iz: 'iz Visokog', u: 'u Visokom',
    podrucje: 'Zeničko-dobojski kanton', susjedi: ['sarajevo', 'zenica', 'travnik'],
    opis: 'Izrada web stranica i web shopa za firme iz Visokog: vlastiti proizvodi, turisti, dizajn za telefon i SEO osnova. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Visokog i okoline, od Kaknja i Breze do Kiseljaka. I za radnje koje prodaju vlastite proizvode.',
    lokalno: {
      naslov: 'Vlastiti proizvodi za kupce iz cijele BiH',
      tekst: 'Visoko je poznato po kožarstvu i zanatima, a u grad dolazi i mnogo posjetilaca. Radnja koja pravi vlastite proizvode, na primjer kožnu galanteriju, može prodavati i kupcima koji su je upoznali u prolazu. Za to je dovoljna trgovina sa manje artikala, ali dobrim fotografijama, mjerama i materijalima, uz jasnu dostavu po BiH i, ako treba, u inostranstvo.',
    },
    pitanje: {
      q: 'Možemo li prodavati i u inostranstvo?',
      a: 'Da. Trgovina može imati posebne cijene dostave po zemljama i engleski jezik. Prije toga dogovorimo sa Vama kurirsku službu i način plaćanja.',
    },
  },
  {
    slug: 'livno', ime: 'Livno', gen: 'Livna', iz: 'iz Livna', u: 'u Livnu',
    podrucje: 'Kanton 10', susjedi: ['siroki-brijeg', 'mostar', 'bihac'],
    opis: 'Izrada web stranica za firme iz Livna: kupci iz kantona i Dalmacije, hrvatski jezik, dizajn za telefon i SEO osnova. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Livna i okoline, od Tomislavgrada do Kupresa i Glamoča.',
    lokalno: {
      naslov: 'Kupci iz kantona i iz Dalmacije',
      tekst: 'Livno je blizu granice, pa dio kupaca dolazi i iz Dalmacije. Takvom kupcu je prirodnije da stranica govori hrvatskim standardom i da cijene vidi i u eurima. Za domaće kupce važno je da stranica jasno kaže koja mjesta pokrivate, od Tomislavgrada do Kupresa, jer u manjim mjestima ljudi traže sa imenom svog mjesta.',
    },
    pitanje: {
      q: 'Može li stranica biti na hrvatskom jeziku?',
      a: 'Da. Tekst pišemo jezikom kojim se obraćate kupcima, a cijene mogu stajati u KM i u eurima. Ako imate kupce sa obje strane granice, dogovorimo jednu ili dvije jezičke verzije.',
    },
  },
  {
    slug: 'siroki-brijeg', ime: 'Široki Brijeg', gen: 'Širokog Brijega', iz: 'sa Širokog Brijega', u: 'na Širokom Brijegu',
    podrucje: 'Zapadnohercegovački kanton', susjedi: ['mostar', 'livno', 'sarajevo'],
    opis: 'Izrada web stranica i web shopa za firme sa Širokog Brijega: kupci iz EU, cijene u eurima, više jezika i SEO osnova. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme sa Širokog Brijega i iz okoline, od Ljubuškog do Posušja i Gruda. I za one koje prodaju u Hrvatsku i EU.',
    lokalno: {
      naslov: 'Firme koje prodaju u Hrvatsku i EU',
      tekst: 'Mnoge firme iz Zapadne Hercegovine prodaju kupcima u Hrvatskoj i drugim zemljama EU. Za njih stranica treba cijene i u eurima, uslove dostave po zemljama i bar engleski uz hrvatski. Poslovni kupac iz inostranstva traži i katalog sa tehničkim podacima, dokumentaciju za preuzimanje i jasan kontakt za ponudu.',
    },
    pitanje: {
      q: 'Možemo li imati cijene u eurima?',
      a: 'Da. Cijene mogu stajati u KM i u eurima, a kupac iz inostranstva može dobiti i posebne uslove dostave. Kako se naplaćuje dogovorimo prema Vašoj banci i kuriru.',
    },
  },
  {
    slug: 'gorazde', ime: 'Goražde', gen: 'Goražda', iz: 'iz Goražda', u: 'u Goraždu',
    podrucje: 'Bosansko-podrinjski kanton', susjedi: ['sarajevo', 'visoko', 'mostar'],
    opis: 'Izrada web stranica za firme iz Goražda: jasna stranica, Google profil, dizajn za telefon i SEO osnova za lokalne upite. Ponuda po dogovoru.',
    uvod: 'Pravimo web stranice i web trgovine za firme iz Goražda i okoline, od Prače do Ustikoline. I za firme koje žele da ih kupac nađe prije konkurencije.',
    lokalno: {
      naslov: 'U manjem gradu stranica brže dođe do kupca',
      tekst: 'U Goraždu manje firmi ima urednu web stranicu nego u velikim gradovima, pa je i konkurencija za lokalne upite obično manja. Stranica koja jasno kaže šta radite i gdje, uz uređen Google profil i nekoliko recenzija kupaca, ima dobre izglede da se pokaže kad neko traži Vašu uslugu u gradu. Mjesta na Googleu ne obećavamo, ali osnovu postavimo kako treba.',
    },
    pitanje: {
      q: 'Koliko recenzija treba na Google profilu?',
      a: 'Nema tačnog broja, ali kupac i Google više vjeruju profilu sa redovnim, stvarnim recenzijama. Najlakše je zamoliti zadovoljne kupce odmah poslije posla i poslati im direktan link za recenziju.',
    },
  },
]

// Šta firmama iz tog grada najčešće treba na stranici; svaki grad svoj spisak.
const POTREBE = {
  sarajevo: ['Stranicu za svaku uslugu, sa okvirom cijene i odgovorima na česta pitanja.', 'Poslovnice sa adresom, radnim vremenom i telefonom, iste kao na Google profilu.', 'Englesku verziju za goste i kupce iz dijaspore.', 'Zakazivanje termina za salone, servise i ordinacije.'],
  'banja-luka': ['Stranicu na ćirilici, latinici ili oba pisma, sa posebnim adresama.', 'Jasne usluge i cjenovnik za firme sa mnogo konkurencije u gradu.', 'Kontakt obrazac i WhatsApp koji prate pismo kupca.', 'Web shop sa dostavom po Republici Srpskoj i cijeloj BiH.'],
  tuzla: ['Prikaz zalihe ili narudžbu, da kupac iz okoline ne putuje uzalud.', 'Zakazivanje termina za servise, salone i ordinacije.', 'Jasno napisano područje dostave po kantonu.', 'Kontakt sa mapom i radnim vremenom za svaku radnju.'],
  zenica: ['Reference i izvedene radove sa slikama i opisom.', 'Obrazac za upit sa prilogom nacrta ili specifikacije.', 'Stranicu o opremi i kapacitetu za firme koje rade za druge firme.', 'B2B portal sa cijenama za stalne kupce.'],
  mostar: ['Meni ili ponudu na engleskom i po potrebi još jednom jeziku.', 'Brzu stranicu koja radi i preko mobilnog interneta.', 'Radno vrijeme, mapu i put do vrata na prvom ekranu.', 'Rezervaciju stola ili termina bez poziva.'],
  bijeljina: ['Web shop povezan sa OLX-om, da se artikal unosi jednom.', 'Katalog opreme i rezervnih dijelova sa pretragom po šifri.', 'Dostavu po BiH i plaćanje pouzećem.', 'Uvoz artikala od dobavljača, umjesto ručnog prepisivanja.'],
  prijedor: ['Galeriju urađenih poslova sa kratkim opisom.', 'Spisak mjesta u kojima radite.', 'Obrazac sa slikom kvara ili prostora, ili prelaz na WhatsApp.', 'Dugme za poziv koje se vidi na telefonu bez traženja.'],
  brcko: ['Web shop povezan sa OLX-om i dobavljačima.', 'Pretragu po nazivu, šifri i EAN barkodu.', 'Dostavu po cijeloj BiH za kupce van grada.', 'Stranicu o firmi sa adresom i radnim vremenom za kupce iz grada.'],
  doboj: ['Posebnu stranicu za svaku glavnu uslugu.', 'Jasno navedena mjesta u kojima radite.', 'Isto područje rada na stranici i na Google profilu.', 'Upit ili poziv sa svake stranice usluge.'],
  cazin: ['Verziju na njemačkom za kupce iz dijaspore.', 'Plaćanje karticom ili uplatom iz inostranstva.', 'Rezervaciju termina za ljeto, unaprijed.', 'WhatsApp za brz dogovor bez obzira na vremensku razliku.'],
  bihac: ['Kalendar slobodnih datuma i direktnu rezervaciju.', 'Cijene po sezoni i uslove otkazivanja.', 'Fotografije smještaja i aktivnosti na Uni.', 'Bar englesku verziju za strane goste.'],
  travnik: ['Malu web trgovinu sa nekoliko dobro fotografisanih proizvoda.', 'Jasnu cijenu dostave i opis pakovanja.', 'Narudžbu sa telefona i plaćanje pouzećem.', 'Priču o proizvodu i proizvođaču, koja gradi povjerenje.'],
  gracanica: ['Maloprodajne cijene za krajnjeg kupca.', 'Prijavu za poslovne kupce sa njihovim cijenama i minimalnim količinama.', 'Katalog proizvoda sa tehničkim podacima.', 'Istoriju narudžbi za stalne kupce.'],
  lukavac: ['Jednostavnu stranicu sa uslugama, slikama i kontaktom.', 'Uređen Google profil sa radnim vremenom i fotografijama.', 'Dugme za poziv i WhatsApp.', 'Mogućnost da se stranica kasnije dopuni cjenovnikom ili zakazivanjem.'],
  visoko: ['Web trgovinu za vlastite proizvode, sa mjerama i materijalima.', 'Dobre fotografije proizvoda iz više uglova.', 'Dostavu po BiH i, po potrebi, u inostranstvo.', 'Englesku verziju za posjetioce i kupce izvana.'],
  livno: ['Tekst na hrvatskom standardu, kad su kupci većinom sa te strane.', 'Cijene u KM i u eurima.', 'Spisak mjesta koja pokrivate u kantonu.', 'Kontakt i radno vrijeme na prvom ekranu.'],
  'siroki-brijeg': ['Cijene u eurima i uslove dostave po zemljama.', 'Hrvatsku i englesku verziju.', 'Katalog sa tehničkim podacima i dokumentacijom za preuzimanje.', 'Obrazac za upit za poslovne kupce iz inostranstva.'],
  gorazde: ['Jasnu stranicu o tome šta radite i gdje.', 'Uređen Google profil i link za recenzije kupaca.', 'Dugme za poziv i WhatsApp.', 'Osnovu za Google: naslove, opise i prijavu u Search Console.'],
}

const PRIMJERI = `## Primjeri našeg rada

Najbliži javni primjeri su SmartTime, radnja satova sa poslovnicama u Kantonu Sarajevo, i mrt.ba, trgovina alata i mašina iz Brčkog, uz još dosta projekata. Oba sajta i danas održavamo, pa ih možete otvoriti i provjeriti sami.

- [SmartTime: usluge i zakazivanje termina](/radovi/smarttime)
- [mrt.ba: trgovina i veze sa dobavljačima](/radovi/mrt)`

const POSEBNI_PRIMJERI = {
  sarajevo: `## Primjer iz Sarajeva: SmartTime

SmartTime je radnja satova sa poslovnicama na Ilidži (KSC), u Vogošći i Ilijašu. Za njih smo napravili web trgovinu na WordPressu i WooCommerceu i održavamo je.

- Katalog satova u kojem kupac na telefonu filtrira po brendu, cijeni i spolu. Na dan 1. 10. 2026. imao je 538 artikala.
- Posebne stranice za graviranje i servis, sa cjenovnikom i opisom postupka.
- Zakazivanje termina na stranici, da kupac za zamjenu baterije ili graviranje ne mora zvati.
- Recenzije radnje sa Googlea prikazane na početnoj.

Cijelu priču, sa brojkama i datumima, pročitajte u studiji [SmartTime: usluge i zakazivanje termina](/radovi/smarttime). Uz SmartTime imamo još dosta projekata, a drugi javni primjer je [mrt.ba](/radovi/mrt).`,
  brcko: `## Primjer iz Brčkog: mrt.ba

Motor Remont Trade je trgovina iz Brčkog: alati, mašine, vrtna i poljoprivredna oprema i rezervni dijelovi. Napravili smo im web trgovinu na WordPressu i WooCommerceu, sa temom pisanom samo za mrt.ba. Javna je od 6. 9. 2026.

- Katalog od više dobavljača, sveden na isti oblik: naziv, cijena, zaliha, slike, karakteristike i EAN barkod.
- OLX oglasi koji se drže ažurnim sami: promjena cijene ili zalihe na stranici ode i na oglas.
- Vlastite šifre i opisi artikala, da se ne vidi dobavljač i da Google razlikuje trgovinu od preprodavača sa istim tekstom.
- Pretraga po nazivu, šifri i EAN barkodu, sa filterima po karakteristikama.

Cijelu priču pročitajte u studiji [mrt.ba: trgovina i veze sa dobavljačima](/radovi/mrt). Uz mrt.ba imamo još dosta projekata, a drugi javni primjer je [SmartTime](/radovi/smarttime). Kako OLX veza radi u praksi pogledajte na stranici [za OLX trgovine](/olx).`,
}

export const putGrada = (g) => `/izrada-web-stranica/${g.slug}`
const poSlugu = Object.fromEntries(gradovi.map((g) => [g.slug, g]))

// Markdown cijele stranice grada; dijeljeni dijelovi su namjerno kratki, a lokalni dio i pitanje su svoji.
export function tekstGrada(g) {
  const susjedi = g.susjedi.map((s) => `[${poSlugu[s].ime}](${putGrada(poSlugu[s])})`).join(', ')
  return `## ${g.lokalno.naslov}

${g.lokalno.tekst}

## Šta firmama ${g.iz} najčešće treba

${POTREBE[g.slug].map((p) => `- ${p}`).join('\n')}

${POSEBNI_PRIMJERI[g.slug] || PRIMJERI}

## Šta dobijate uz izradu

- Dizajn prilagođen firmi i raspored za telefon, tablet i računar.
- WhatsApp, telefon, mail i kontakt obrazac prema dogovoru.
- Tehničku SEO osnovu: naslove, opise, interne linkove, sitemap i provjeru u Search Consoleu.
- Po potrebi [web shop](/izrada-web-shopa), [online zakazivanje](/zakazivanje) ili [vezu sa OLX-om](/olx).
- Obuku za izmjene sadržaja i dogovor o domeni, hostingu i održavanju.

## Kako radimo sa firmama ${g.iz}

Ponudu, sadržaj i izmjene dogovaramo preko WhatsAppa, telefona i maila, pa za izradu ne morate dolaziti na sastanke. Pošaljete naziv firme, šta nudite i postojeću stranicu ako je imate. Mi predložimo raspored i obim, a Vi prije objave dobijete pregled na svom telefonu i provjerite svaki podatak.

## Koliko košta izrada web stranice ${g.u}

Cijena ne zavisi od grada, nego od posla: broja stranica, pripreme sadržaja, jezika i funkcija kao što su trgovina ili zakazivanje. U ponudi odvojimo izradu od domene, hostinga i održavanja. Pogledajte [kako nastaje ponuda](/cijene) i [šta utiče na cijenu web stranice](/savjeti/koliko-kosta-web-stranica), ili nam [pošaljite šta Vam treba](/kontakt).

## Česta pitanja

### ${g.pitanje.q}

${g.pitanje.a}

### Radite li i za firme van ${g.gen}?

Da, za firme iz cijele Bosne i Hercegovine. Pogledajte i stranice za ${susjedi}, ili sve na stranici [izrada web stranica](/izrada-web-stranica).

### Hoće li stranica biti na Googleu?

Pripremimo tehničku osnovu i prijavimo stranicu u Search Console. Pozicije ne obećavamo, jer zavise i od sadržaja, konkurencije i recenzija. Za upite sa imenom grada važan je i Google profil firme, pa pomognemo i oko njega.
`
}
