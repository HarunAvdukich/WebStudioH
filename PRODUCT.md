# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dvije publike, jednako važne:

- Vlasnici firmi i radnji u BiH (alati, oprema, satovi, usluge) koji žele prvi sajt ili web trgovinu. Dolaze po preporuci, preko potpisa "Izradio Hunar" u podnožju mrt.ba i smarttime.ba, preko društvenih mreža, OLX-a i Google pretrage. Većina gleda sa telefona i javlja se na WhatsApp.
- Firme kojima treba sistem: zakazivanje termina, B2B portal za veleprodaju, aplikacija po mjeri. Odluka je veća; traže dokaz da sistem stvarno radi.

Posao posjetioca: procijeniti da li Hunar može napraviti ono što mu treba, povjerovati stvarnom radu i javiti se.

## Product Purpose

Hunar (ranije WebStudioH) pravi sve na webu za firme u BiH: web stranice, web trgovine, sisteme za zakazivanje, B2B portale i integracije. Stranica hunar.ba vodi posjetioca do upita (WhatsApp, telefon, kontakt forma). Uspjeh je upit od firme koja je vidjela stvaran rad i povjerovala mu.

## Positioning

Ono što lokalna agencija ili freelancer ne mogu iskreno tvrditi:

- Veze koje radi samo bh. trgovina: OLX (oglasi se sami ažuriraju), Ananas feed, uvoz kataloga od dobavljača.
- Sve na jednom mjestu: dizajn, kod, hosting i održavanje u istom studiju, bez prebacivanja s firme na firmu.
- AI u poslu: asistent Kobi na mrt.ba, opisi artikala, automatizacija.
- Mjerena brzina: sajtovi čija se brzina može provjeriti.

## Operating Context

Posjetilac poredi Hunar sa lokalnim agencijama i freelancerima, često na telefonu, često poslije preporuke ili klika na potpis u podnožju klijentovog sajta. Kontakt ide najčešće preko WhatsAppa. Cijene se ne objavljuju; ponuda se daje u razgovoru.

## Capabilities and Constraints

- Kod: React 18 + Vite 5 + vite-react-ssg, Netlify (objava iz GitHuba `HarunAvdukich/WebStudioH`, grana `main`; pregled za svaki PR). Sadržaj u `src/data.js`; provjera `npm run build && npm test`.
- Stranice: početna, O nama, Usluge, Radovi (+ studija slučaja po projektu), Cijene, Savjeti (blog iz markdowna), Kontakt, Politika privatnosti.
- Domen hunar.ba živ od 29. 9. 2026; mail info@hunar.ba preko ImprovMX.
- Jezik: bosanski, ijekavica. Bez dugih crta (— i –) u tekstu.
- Cijene: "po dogovoru", bez iznosa.
- Brzina je dio ponude: početna drži Lighthouse 90+ na telefonu i 100 na računaru (29. 9. 2026). Teške stvari (3D, video) ne smiju usporiti prvi ekran.

## Brand Commitments

- Ime Hunar, logotip "petlja u+n" u smaragdnoj (#0E8A64); vektor se pravi skriptom `hunar_logo.py` u `Documents\Hunar\logo`, nikad ručno. Ostale boje stranice nisu vezane za logotip.
- Stranica govori glasom studija (mi, Hunar), a kupcu se obraća sa "Vi" (odluka vlasnika 30. 9. 2026). Ne pokazuje ime ni lice vlasnika i ne izmišlja tim: bez broja ljudi, imena i fotografija tima.
- UPTOS Breza se ne prikazuje nigdje (vlasnik nije zadovoljan tim radom), ni kao rad, ni kao primjer, ni kao recenzija.
- Nijedna brojka ni tvrdnja bez izvora i datuma; brzina uvijek sa uređajem na kojem je izmjerena.

## Evidence on Hand

- mrt.ba (produkcija od 6. 9. 2026): 7.460 artikala, 278 kategorija, 4.453 OLX oglasa (provjereno 29. 9. 2026), odziv servera 52 ms (27. 9. 2026), asistent Kobi, B2B portal b2b.mrt.ba. Stvarne fotografije artikala i snimci ekrana smiju se koristiti.
- SmartTime (smarttime.ba): 542 artikla, od toga 526 ručnih satova (29. 9. 2026), zakazivanje termina. Artikli i snimci ekrana smiju se koristiti.
- urez.ba: vlastita trgovina gravura po mjeri, u izradi (lokalno), bez javnog linka.
- Recenzije mrt.ba i SmartTime, potpisane nazivom firme.
- Logotipi klijenata smiju na stranicu.
- AI generisane scene, 3D i video smiju, ali kao ilustracija, nikad predstavljene kao stvaran snimak.
- Ne postoje: fotografije vlasnika ili tima, nagrade, medijski napisi, objavljene cijene. Ne izmišljati ih.

## Product Principles

1. Dokaz ispred obećanja: stvaran rad, stvarni artikli i izmjerene brojke nose stranicu.
2. Jednako uvjerljivo za radnju koja hoće prvi sajt i za firmu koja traži sistem.
3. Govoriti jezikom posla (OLX, pouzeće, dobavljač, zaliha, termin), bez agencijskog žargona.
4. Put do upita je kratak i radi na telefonu, prvenstveno preko WhatsAppa.
5. Iskrenost je dio ponude: ništa što klijent ili kupac ne može provjeriti.
