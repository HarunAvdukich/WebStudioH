---
name: WebStudioH
description: Web trgovine za bh. prodavnice, predstavljene kao artikli sa etiketom na polici.
colors:
  action-yellow: "#ffd400"
  signal-red: "#e30613"
  signal-red-press: "#b8000d"
  ink: "#111111"
  ink-soft: "#454545"
  ink-on-yellow: "#3d3200"
  label-paper: "#ffffff"
  shelf-grey: "#eceef0"
  thermal-paper: "#f8f8f6"
  rail-metal: "#b9bfc6"
  rail-line: "#6f767e"
  whatsapp-green: "#1fae52"
  hairline: "rgba(17, 17, 17, 0.16)"
typography:
  display:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.85rem, 1.5rem + 4.6vw, 5.4rem)"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 68"
  headline:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.3rem, 1.4rem + 3.2vw, 3.9rem)"
    fontWeight: 900
    lineHeight: 0.96
    fontVariation: "'wdth' 70"
  title:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.6rem, 1.3rem + 1vw, 2.1rem)"
    fontWeight: 900
    lineHeight: 1
    fontVariation: "'wdth' 72"
  price:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "30px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 66"
  button:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "18px"
    fontWeight: 800
    lineHeight: 1
    fontVariation: "'wdth' 88"
  body:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Red Hat Mono', ui-monospace, 'Cascadia Mono', monospace"
    fontSize: "12.5px"
    fontWeight: 600
    letterSpacing: "0.04em"
  data:
    fontFamily: "'Red Hat Mono', ui-monospace, 'Cascadia Mono', monospace"
    fontSize: "17px"
    fontWeight: 600
    fontFeature: "'tnum' 1"
rounded:
  none: "0"
  sticker: "50%"
spacing:
  gutter: "20px"
  gutter-wide: "32px"
  section: "64px"
  section-wide: "96px"
  shelf-gap: "22px"
  shelf-row: "44px"
  head-gap: "40px"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.label-paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.signal-red-press}"
    textColor: "{colors.label-paper}"
  button-paper:
    backgroundColor: "{colors.label-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "52px"
  button-paper-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.label-paper}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.label-paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "52px"
  tag:
    backgroundColor: "{colors.label-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  tag-head:
    backgroundColor: "{colors.label-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "9px 14px"
  tag-head-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.label-paper}"
    typography: "{typography.label}"
    padding: "9px 14px"
  price-red:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.label-paper}"
    typography: "{typography.price}"
    padding: "8px 12px 9px"
  roundel:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.label-paper}"
    rounded: "{rounded.sticker}"
    size: "88px"
    padding: "10px"
  rail:
    backgroundColor: "{colors.rail-metal}"
    height: "10px"
  mini-tag:
    backgroundColor: "{colors.label-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 14px 7px"
  receipt:
    backgroundColor: "{colors.thermal-paper}"
    textColor: "{colors.ink}"
    padding: "22px 22px 40px"
  field:
    backgroundColor: "{colors.label-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 0 6px"
  nav-link:
    textColor: "{colors.ink}"
    padding: "9px 12px 8px"
  nav-link-active:
    backgroundColor: "{colors.action-yellow}"
    textColor: "{colors.ink}"
  whatsapp-fab:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "{colors.label-paper}"
    rounded: "{rounded.sticker}"
    size: "58px"
---

# Design System: WebStudioH

## Overview

**Creative North Star: "Etiketa na polici"**

Svaka usluga i svaki rad je artikal u radnji: bijela papirna etiketa sa tankom crnom linijom, šifrom, deklaracijom izmjerenih vrijednosti, cijenom "po dogovoru" i EAN bar-kodom sa bh. prefiksom 387. Etikete vise o sivom metalnom nosaču police, a nosač je istovremeno navigacija i razdjelnik. Akcijska žuta vlada cijelim pojasevima kao zid prodavnice na akciji, signalno crvena se pojavljuje tamo gdje bi se u radnji pojavila: na cijeni, na okruglom pečatu i na dugmetu kojim se kupuje, ovdje "Piši na WhatsApp". Spiskovi (šta je uključeno, kako radimo, recenzije) štampaju se na termo papiru računa sa nazubljenom donjom ivicom.

Gustina je gustina police, ne galerije: pojasevi puni do ivice, etikete različitih širina u istom redu, deklaracije sa punim linijama između redova. Dokaz ide ispred obećanja: stvarni datirani snimci (stranica artikla na mrt.ba i OLX oglas koji je trgovina sama objavila) stoje u etiketama umjesto maketa. Tekst tvrdi samo ono što snimak ili izmjera pokazuju.

Svijet svjesno odbija agencijski default: tamni hero sa staklom, sjajem i mrežom istih kartica, nadnaslove iznad naslova i brojeve sekcija.

**Key Characteristics:**
- Žuti pojasevi preko cijele širine, bijele etikete sa crnom linijom od 1px, sivi nosač police.
- Uska crna Archivo (širina 62 do 72%, težina 900) za naslove i cijene, normalna širina za tekst.
- Red Hat Mono samo za šifre, EAN cifre i izmjerene vrijednosti.
- Nulti radijus svuda; krug samo za naljepnice (pečat, WhatsApp dugme, strelica dokaza).
- Jedan potpisni pokret: etiketa se jednom zanjiše oko stezaljke.

## Colors

Paleta prodavnice na akciji: jedna vladajuća žuta, jedna signalna crvena koja se štedi, crna štampa i tri papira (etiketa, polica, termo).

### Primary
- **Akcijska žuta** (action-yellow): boja cijelih pojaseva (hero, traka prednosti, zaglavlja unutrašnjih stranica, završni poziv, 404), aktivna stavka menija i istaknuta etiketa cijena. Nikad kao tanki akcent na bijelom; žuta je površina, ne detalj.

### Secondary
- **Signalno crvena** (signal-red): cijena na etiketi, okrugli pečat i glavno dugme "Piši na WhatsApp". Crvena slova "H" u logotipu su ista boja.
- **Crvena pod prstom** (signal-red-press): stanje prelaza i pritiska crvenog dugmeta, nigdje drugdje.

### Tertiary
- **WhatsApp zelena** (whatsapp-green): isključivo plutajuće okruglo WhatsApp dugme, koje se pojavi tek kad glavno crveno dugme ode sa ekrana.

### Neutral
- **Štamparska crna** (ink): sav tekst, linije etiketa, okviri dugmadi, crna zaglavlja etiketa, podnožje, fokus prsten.
- **Siva štampa** (ink-soft): opisni tekst na bijelom i termo papiru (lede, tekst etikete, odgovori).
- **Crna na žutoj** (ink-on-yellow): sporedni tekst na žutim pojasevima, gdje bi siva štampa izgledala prljavo.
- **Papir etikete** (label-paper): etikete, zaglavlje sajta, narudžbenica, članak.
- **Siva polica** (shelf-grey): pozadina stranice i pojasevi sa redovima etiketa.
- **Termo papir** (thermal-paper): računi i recenzije.
- **Metal nosača** (rail-metal) i **linija nosača** (rail-line): nosač police i stezaljke etiketa.
- **Tanka linija** (hairline): razdjelnici unutar spiskova na etiketi i u meniju za telefon.

### Named Rules
**The Tri Crvene Rule.** Crvena ima tačno tri posla: cijena, pečat i glavna akcija ekrana (WhatsApp, slanje upita, posjeta sajtu klijenta). Ako crvena ne znači "ovo košta", "ovo je posebno" ili "ovo je sljedeći korak", nije crvena.

**The Žuta Je Zid Rule.** Žuta zauzima cijeli pojas od ivice do ivice ili cijelu površinu etikete. Žuta linija, žuti okvir ili žuti tekst na bijelom ne postoje.

**The Ravni Metal Rule.** Nosač i stezaljke su jedna siva (rail-metal) sa linijom od 2px (rail-line), bez prelaza boje i bez sjene. Metal je ravan; dubinu nose etikete koje o njemu vise.

## Typography

**Display Font:** Archivo, varijabilna širina 62 do 125 i težina 400 do 900 (sa Arial Narrow)
**Body Font:** Archivo u normalnoj širini (100%)
**Label/Mono Font:** Red Hat Mono 500, 600 i 700 (sa ui-monospace)

**Character:** Uska crna Archivo je slovo sa police: ono što kupac pročita s tri metra, naziv artikla i cijena. Red Hat Mono je slovo štampača etiketa, i zato se pojavljuje samo tamo gdje bi ga štampač odštampao.

### Hierarchy
- **Display** (900, širina 68%, fluidno do 5.4rem, 0.94): naslov heroja i unutrašnjih stranica, završni poziv.
- **Headline** (900, širina 70%, fluidno do 3.9rem, 0.96): naslov sekcije.
- **Title** (900, širina 72%, fluidno do 2.1rem, 1): naziv artikla na etiketi, naslov u letku članaka.
- **Price** (900, širina 66%, 30px; velika do 52px): cijena i datum na crvenoj cijeni, "po dogovoru".
- **Button** (800, širina 88%, 18px): dugmad.
- **Body** (400, 17px, 1.55) i **Lede** (400, 19px, 1.5, najviše 58ch): tekst. Članak ide na 18px i 1.7, najviše 68ch.
- **Label** (Red Hat Mono 600, 12.5px, razmak 0.04em, velika slova): šifra u zaglavlju etikete.
- **Data** (Red Hat Mono 600, 17px, tabelarne cifre): izmjerene vrijednosti u deklaraciji, EAN cifre ispod bar-koda.

### Named Rules
**The Štampač Etiketa Rule.** Mono samo za šifre, EAN cifre, izmjerene vrijednosti i datum snimka. Termo račun se štampa u mono jer tako štampa blagajna. Nadnaslovi, obične oznake i rečenice nikad nisu u mono.

**The Bez Nadnaslova Rule.** Iznad naslova nema nadnaslova ni broja sekcije. Naslov sekcije stoji sam, eventualno sa lede rečenicom ispod.

## Layout

Stranica je niz pojaseva preko cijele širine (žuti, papirni, sivi) sa sadržajem u kontejneru od najviše 1240px i unutrašnjom marginom gutter (20px, od 900px gutter-wide). Pojas ima vertikalni razmak section (64px, od 900px section-wide).

Etikete stoje u redovima police: svaki red je mreža od 12 kolona sa vlastitim nosačem na vrhu (prelazi 12px preko kontejnera sa obje strane), razmakom shelf-gap između etiketa i shelf-row između redova. Širine se smjenjuju po redovima: 7 i 5, pa 5 i 7, pa 6 i 6, a pun red od 12 polaže etiketu u širinu (tekst lijevo, cijena i kod u desnoj koloni od 250px). Na telefonu svaka etiketa zauzima punu širinu.

Dvokolonski rasporedi su uvijek nesimetrični (hero 1.14 prema 0.86, "zašto" 1.25 prema 0.75, studija slučaja 1.3 prema 0.9, kontakt 0.8 prema 1.2); desna deklaracija ili specifikacija je od 960px ljepljiva. Recenzije su tri trake termo papira sa pomaknutim visinama (0, 36px, 12px), ne poravnate kartice.

Na telefonu (do 600px) stvaran rad mora ući u prvi ekran: naslov heroja pada na 2.35rem, sporedno dugme se skriva, crveno WhatsApp dugme ostaje, a etiketa mrt.ba ide ispod naslova.

### Named Rules
**The Polica Bez Mreže Rule.** Nijedan red ne slaže iste kartice iste širine. Red etiketa koristi smjenu 7/5, 5/7, 6/6 ili 12 u širinu; tri etikete cijena od po 4 su jedina polica sa jednakim širinama, i među njima jedna je žuta sa pečatom.

## Elevation & Depth

Dubina je fizička: etiketa visi ispred police i baca kratku, usku sjenu prema dolje. Sve ostalo je ravno. Nosač, stezaljke, pojasevi, dugmad i deklaracije nemaju sjenu. Termo papir dobija mekanu sjenu kroz filter jer mu nazubljena ivica ne dozvoljava običnu.

### Shadow Vocabulary
- **Sjena etikete** (`box-shadow: 0 1px 0 rgba(17,17,17,0.08), 0 14px 24px -16px rgba(17,17,17,0.55)`): etikete, deklaracija sa strane, narudžbenica, članak, snimak u studiji slučaja.
- **Sjena male etikete** (`box-shadow: 0 8px 14px -12px rgba(17,17,17,0.55)`): male etikete u traci prednosti.
- **Sjena pečata** (`box-shadow: 0 8px 14px -8px rgba(17,17,17,0.6)`): okrugli crveni pečat, jer je naljepnica zalijepljena preko etikete.
- **Sjena termo papira** (`filter: drop-shadow(0 12px 14px rgba(17,17,17,0.18))`): računi i recenzije.
- **Sjena zaglavlja** (`box-shadow: 0 6px 16px -12px rgba(17,17,17,0.5)`): samo kad se stranica pomakne ispod ljepljivog zaglavlja.

### Named Rules
**The Visi Ili Leži Rule.** Sjenu ima samo ono što visi ili je zalijepljeno (etiketa, pečat, papir). Metal i pojas su ravni.

## Shapes

Radijus je nula svuda: etikete, dugmad, polja, zaglavlja. Krug postoji samo za naljepnice: okrugli pečat od 88px zakrenut za -9 stepeni, plutajuće WhatsApp dugme od 58px, strelica između dva snimka dokaza i tačka statusa. Linije su dio forme: etiketa ima okvir od 1px, dugmad i narudžbenica 2px, deklaracija počinje debelom crnom linijom (5px na etiketi, 8px na samostalnoj deklaraciji). Termo papir ima nazubljenu donju ivicu (zupci od 18px) i isprekidane razdjelnike od 2px, a redovi računa tačkaste vodilice. Svaka etiketa koja visi ima stezaljku (46 puta 11px) u boji metala; mala etiketa visi na tankoj žici od 2px.

## Components

### Buttons
Etikete koje se pritisnu: ravne, uglaste, teške.
- **Shape:** pravougaono, bez radijusa, okvir 2px, visina 52px (mala 42px, na kontaktu 64px).
- **Primary:** signalno crvena sa bijelim tekstom i WhatsApp ikonom, rezervisana za "Piši na WhatsApp".
- **Hover / Focus:** crvena prelazi u crvenu pod prstom; strelica se pomjeri 3px udesno; pritisak spusti dugme 1px; fokus je crni prsten od 3px sa razmakom 3px.
- **Paper:** bijelo sa crnim okvirom, na prelaz postaje crno sa bijelim tekstom. Sporedna akcija.
- **Ink:** crno, na prelaz crveno. Samo na žutoj etiketi cijena, gdje bi crveno dugme sudarilo crvenu cijenu.

### Cards / Containers: etiketa
- **Corner Style:** bez radijusa.
- **Background:** papir etikete; istaknuta etiketa cijena je žuta.
- **Shadow Strategy:** sjena etikete (vidi Elevation & Depth).
- **Border:** 1px crna; zaglavlje, tijelo i dno su odvojeni istom linijom.
- **Internal Padding:** zaglavlje 9px 14px, tijelo 16px 14px 18px, dno 10px 14px 12px.
- **Anatomija:** zaglavlje sa šifrom (bijelo, ili crno kad nosi ime rada), snimak ekrana, naziv, deklaracija ili tekst, dno sa cijenom i bar-kodom.

### Inputs / Fields
- **Style:** polje narudžbenice bez okvira i pozadine, samo crna donja linija od 2px, oznaka iznad, tekst 18px.
- **Focus:** red polja dobija žuti prelaz slijeva nadesno (35% žute ka prozirnom); bez plavog prstena.
- **Disabled:** dugme za slanje na 55% prozirnosti dok se šalje.

### Navigation
Zaglavlje je bijela traka od 68px, ljepljiva, sa nosačem police (9px) na dnu. Logotip su dvije naljepnice (crna "WebStudio", crvena "H"). Stavke menija su Archivo 700, 16px; prelaz daje sivu policu, aktivna stavka stoji na žutoj. Od 980px desno je malo crveno WhatsApp dugme; ispod toga meni je ladica sa velikim uskim stavkama (24px, 800) i crvenim WhatsApp dugmetom preko cijele širine.

### Deklaracija
Spisak izmjerenih vrijednosti kao na pakovanju: debela crna linija na vrhu, svaki red naziv lijevo i vrijednost u mono desno, crna linija od 1px ispod svakog reda. Nosi samo brojeve koji imaju izvor.

### Cijena i pečat
Cijena je mala mono oznaka iznad uske crne vrijednosti; crvena cijena je bijela na crvenom polju. Okrugli crveni pečat sjedi na gornjem desnom uglu etikete ("Uskoro", oznaka paketa).

### EAN bar-kod
Stvarno kodiran EAN-13 sa prefiksom 387, cifre u mono ispod traka, skriven od čitača ekrana. Ide samo na etiketu koja predstavlja artikal: etiketa mrt.ba u heroju, etikete usluga, specifikacija studije slučaja, 404.

### Termo račun
Traka termo papira sa nazubljenom donjom ivicom: naslov uskom crnom, podnaslov i redovi u mono, tačkaste vodilice, isprekidana linija i "Ukupno" na dnu. Nosi spiskove (šta je uključeno, kako radimo) i recenzije potpisane nazivom firme.

### Potpisni pokret
Etiketa se na prelaz mišem, fokus unutar nje ili dodir jednom zanjiše oko stezaljke (0.95s, uglovi 2.6, -1.7, 0.8, -0.3 stepena, sa izlaznim ublažavanjem). Etiketa mrt.ba u heroju se jednom smiri pri učitavanju (0.9s, od 16px iznad i -2.2 stepena). Oba pokreta se gase pod prefers-reduced-motion. Drugih ukrasnih pokreta nema.

## Do's and Don'ts

### Do:
- **Do** stavi stvaran, datiran snimak u etiketu (stranica artikla na mrt.ba, OLX oglas koji je trgovina objavila) prije svake rečenice koja nešto obećava.
- **Do** smjenjuj širine etiketa u redu police: 7 i 5, 5 i 7, 6 i 6, ili 12 položeno u širinu.
- **Do** okači svaku etiketu o nosač od rail-metal sa linijom od 2px u rail-line, ravno.
- **Do** koristi crvenu za cijenu, okrugli pečat i glavno dugme "Piši na WhatsApp", i ni za šta drugo.
- **Do** piši izmjerene vrijednosti u deklaraciju Red Hat Monom sa tabelarnim ciframa, uvijek sa izvorom, a brzinu uvijek sa uređajem.
- **Do** ugasi zanjihivanje i slijetanje etikete pod prefers-reduced-motion.

### Don't:
- **Don't** pravi tamni hero sa staklom, sjajem ili mrežom istih kartica.
- **Don't** stavljaj nadnaslov iznad naslova niti broj sekcije.
- **Don't** daj nosaču ili stezaljci prelaz boje ili sjenu.
- **Don't** stavljaj bar-kod na podnožje, cijene ili bilo šta što ne predstavlja artikal.
- **Don't** koristi mono za rečenice, nadnaslove ili obične oznake.
- **Don't** zamijeni stvaran snimak maketom ekrana ili napiši tvrdnju koju snimak ne pokazuje.
- **Don't** dodaj drugi potpisni pokret pored zanjihivanja etikete i slijetanja etikete u heroju.
