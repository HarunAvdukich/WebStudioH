---
version: 1
slug: "src-pages-home-jsx"
primary_target: "src/pages/Home.jsx"
related_targets: ["src/pages/AboutPage.jsx","src/pages/ServicesPage.jsx","src/pages/WorkPage.jsx","src/pages/CaseStudyPage.jsx","src/pages/PricingPage.jsx","src/pages/ContactPage.jsx","src/pages/BlogPage.jsx","src/pages/BlogPostPage.jsx","src/index.css"]
---

# Početna i cijela stranica WebStudioH

## Scope and mode

Cijela stranica (sve rute dijele svijet), mode Persuade. Prva površina je početna.

## Audience, job, action

Vlasnik bh. prodavnice (alati, agro, moto, satovi) sa telefona, po preporuci, sa potpisa na mrt.ba/smarttime.ba, sa mreža/OLX-a ili Googlea. Treba da povjeruje da WebStudioH pravi trgovine koje rade sa OLX-om i dobavljačima, i da se javi, najčešće preko WhatsAppa.

## Proof and constraints

Dokaz: mrt.ba (snimak, 7.400+ artikala, 278 kategorija, 4.300+ OLX oglasa, odziv 52 ms, PageSpeed 87 računar), SmartTime (15+ brendova, 500+ modela), UPTOS, urez.ba uskoro, tri potvrđene recenzije potpisane firmom. Bez izmišljenih brojki, bez cijena, bez dugih crta, bez lica i imena vlasnika. Sadržaj iz `src/data.js` ostaje.

## Direction contract

THESIS: Svaka usluga i svaki rad je artikal na polici sa svojom etiketom: šifra, naziv, deklaracija, "po dogovoru" i bar-kod sa bh. prefiksom 387. Stranica odbija agencijski default: tamni hero sa staklom, sjajem i mrežom istih kartica.

OWN-WORLD: Akcijska žuta vlada cijelim pojasevima; bijele papirne etikete sa tankom crnom linijom; signalno crvena samo za cijene, pečate i glavno dugme; sivi metalni nosač police je navigacija i razdjelnik; termo papir računa nosi spiskove. Archivo (uska crna za naslove i cijene, normalna za tekst), Red Hat Mono samo za šifre, EAN i izmjerene vrijednosti.

STORY: Posjetilac vidi mrt.ba kao artikal na akciji sa stvarnom deklaracijom, shvati da WebStudioH pravi trgovine povezane sa OLX-om i dobavljačima, pa klikne crvenu etiketu "Piši na WhatsApp".

FIRST VIEWPORT: Ispod police sa navigacijom žuti pojas preko cijele širine. Lijevo naslov "Web trgovine za bh. prodavnice" uskom crnom, podnaslov i crveno dugme WhatsApp. Desno velika akcijska etiketa mrt.ba: snimak sajta, deklaracija sa četiri izmjerene vrijednosti i bar-kod. Na telefonu etiketa ide ispod naslova, a dugme ostaje u prvom ekranu.

FORM: Etiketa na polici; prva na mojoj uređenoj listi (IMPECCABLE'S PICK, izbor korisnika); seed d348f36d.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment

Etikete vise na nosaču police: na prelaz mišem ili dodir jednom se zanjišu oko gornje ivice, kao prava etiketa kad je okrzne rukav.

## Unresolved

- Novi logotip u obliku etikete (korisnik dozvolio promjenu); stari fajlovi ostaju u `public/` dok se novi ne potvrdi.
- OG slike i ikone treba prebaciti u novi svijet.
