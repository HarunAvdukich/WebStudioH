# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Vlasnici prodavnica u BiH (alati, poljoprivredna i moto oprema, satovi i slično) koji već prodaju u radnji ili na OLX-u i žele web trgovinu, plus firme i udruženja kojima treba prezentacijska stranica. Na stranicu dolaze na četiri načina: po preporuci (provjeravaju da je studio ozbiljan), preko potpisa "Designed by WebStudioH" na mrt.ba i smarttime.ba, preko društvenih mreža i OLX-a, i preko Google pretrage. Većina gleda sa telefona. Posao posjetioca: procijeniti da li WebStudioH može napraviti trgovinu kakvu treba, i javiti se.

## Product Purpose

Stranica prodaje izradu WooCommerce web trgovina bh. prodavnicama i vodi posjetioca do upita (WhatsApp, telefon, kontakt forma). Uspjeh je upit od prodavnice koja je vidjela stvaran rad i povjerovala mu.

## Positioning

Specijalista za web trgovine u BiH, sa stvarima koje ima samo bh. prodavnica: automatska sinhronizacija sa OLX-om, feed za Ananas, uvoz kataloga od dobavljača, B2B portal za veleprodaju, pouzeće i uplata na račun. Dokaz je mrt.ba: 7.400+ artikala, 4.300+ OLX oglasa koji se sami ažuriraju.

## Operating Context

Posjetilac poredi WebStudioH sa lokalnim agencijama i freelancerima, često na telefonu, često poslije preporuke ili klika na potpis u podnožju klijentovog sajta. Kontakt ide najčešće preko WhatsAppa. Cijene se ne objavljuju; ponuda se daje u razgovoru.

## Capabilities and Constraints

- Postojeći kod: React 18 + Vite 5 + vite-react-ssg, Netlify (objava iz GitHuba, `HarunAvdukich/WebStudioH`, javan repo). Sadržaj je u `src/data.js`; testovi `npm run build && npm test`.
- Stranice: početna, O nama, Usluge, Radovi (+ studija slučaja po projektu), Cijene, Savjeti (blog iz markdowna), Kontakt, Politika privatnosti.
- Domen `webstudioh.ba` se tek kupuje; ostaje u kodu i mailu.
- Jezik: bosanski, ijekavica. Bez dugih crta (— i –) u tekstu.
- Cijene: "po dogovoru", bez iznosa.

## Brand Commitments

- Ime i logotip: WebStudioH. Od 27. 9. 2026. logotip su dvije naljepnice (crna "WebStudio", crvena "H", `src/components/Brand.jsx`); ikona je crveno "H" (`public/webstudioh-logo-icon.png`, `icon-*.png`).
- Iza studija radi jedna osoba; stranica ne pokazuje ime ni lice vlasnika i ne tvrdi da postoji tim.
- Nijedna brojka ni tvrdnja bez izvora; brzina uvijek sa uređajem na kojem je izmjerena.

## Evidence on Hand

- mrt.ba (živo od 6. 9. 2026): 7.400+ artikala, 278 kategorija, 4.300+ aktivnih OLX oglasa, odziv servera 52 ms, PageSpeed 87 na računaru; snimak `public/project-mrt.webp`.
- SmartTime (smarttime.ba): 15+ brendova, 500+ modela, PageSpeed 89 na računaru; snimak `public/project-smarttime.webp`.
- UPTOS Breza (uptos.netlify.app): stranica udruženja; snimak `public/project-uptos.webp`.
- urez.ba: vlastita trgovina, u izradi, bez slike i linka.
- Recenzije mrt.ba, SmartTime i UPTOS, potvrđene 27. 9. 2026, potpisane nazivom firme (bez ličnih imena).
- Ne postoje: fotografije vlasnika ili tima, logotipi klijenata za prikaz, nagrade, medijski napisi, cijene. Ne izmišljati ih.

## Product Principles

1. Dokaz ispred obećanja: stvaran rad i izmjerene brojke nose stranicu.
2. Govoriti jezikom prodavnice (OLX, pouzeće, dobavljač, zaliha), ne jezikom agencije.
3. Put do upita je kratak i radi na telefonu, prvenstveno preko WhatsAppa.
4. Iskrenost je dio ponude: ništa što klijent ili kupac ne može provjeriti.
