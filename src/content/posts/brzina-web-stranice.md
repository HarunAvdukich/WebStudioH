---
title: "Brzina web stranice: kako je izmjeriti i šta je usporava"
seoTitle: "Brzina web stranice: kako je izmjeriti"
date: "2026-11-20"
excerpt: "Kako sami izmjeriti brzinu svoje web stranice u PageSpeed Insightsu, šta znače brojke i šta stranicu najčešće usporava. Bez tehničkog znanja."
---

Kupac koji čeka da se stranica otvori ne čeka dugo. Vrati se na pretragu i otvori sljedeću firmu. Zato je brzina dio posla stranice, isto kao tekst i slike.

Dobra vijest je da brzinu možete izmjeriti sami, za minut, bez ikakvog znanja o programiranju.

## Kako izmjeriti

1. Otvorite [PageSpeed Insights](https://pagespeed.web.dev/), besplatan Googleov alat.
2. Upišite adresu svoje stranice i pokrenite analizu.
3. Pogledajte rezultat za mobilni telefon i za računar. Alat ih prikazuje odvojeno.

Dobijete ocjenu od 0 do 100. Google ocjenu od 90 naviše označi zelenom bojom, od 50 do 89 narandžastom, a ispod 50 crvenom.

### Mjerite više puta

Ocjena nije ista pri svakom mjerenju, jer zavisi od mreže i opterećenja servera u tom trenutku. Mi mjerimo tri puta i uzimamo srednji rezultat. Tako je izmjerena i ocjena 89 za [SmartTime](/radovi/smarttime) na računaru (27. 9. 2026).

### Telefon je strožiji

Ocjena za telefon je skoro uvijek niža. Alat glumi slabiji telefon i sporiju mobilnu mrežu, jer tako stranicu otvara dobar dio kupaca. Upravo zato je ocjena za telefon važnija.

## Šta znače brojke ispod ocjene

Ispod ocjene su mjere koje Google zove Core Web Vitals. Tri su najvažnije:

- **LCP (Largest Contentful Paint):** koliko treba da se pojavi najveći dio prvog ekrana, obično velika slika ili naslov. Dobro je do 2,5 sekunde.
- **INP (Interaction to Next Paint):** koliko brzo stranica reaguje kad kupac dodirne dugme ili meni. Dobro je do 200 milisekundi.
- **CLS (Cumulative Layout Shift):** koliko sadržaj skače dok se stranica učitava. Ako pokušate dodirnuti dugme, a ono se pomjeri jer se iznad učitala slika, to je CLS. Dobro je do 0,1.

Ako stranica ima dovoljno posjeta, PageSpeed na vrhu pokaže i podatke pravih posjetilaca iz zadnjih 28 dana. Oni su važniji od laboratorijskog mjerenja, jer pokazuju kako stranica radi kupcima, a ne alatu.

## Šta najčešće usporava stranicu

- **Prevelike slike.** Slika sa telefona ima nekoliko megabajta, a na stranici se prikaže u maloj kartici. Slike treba smanjiti na stvarnu veličinu i spremiti u novijem formatu, kao što je WebP.
- **Previše dodataka.** Na WordPressu svaki dodatak (plugin) dodaje svoj kod, često na svaku stranicu, i kad tu ne treba.
- **Video ili slajder na vrhu.** Pokretna slika na prvom ekranu izgleda lijepo, ali je najteži dio stranice baš tamo gdje treba biti najbrže.
- **Skripte drugih firmi.** Chat balon, praćenje reklama, ugrađene mape i društvene mreže. Svaka se učitava sa svog servera.
- **Više fontova.** Svaka debljina i vrsta slova je poseban fajl.
- **Slab hosting.** Ako server dugo odgovara, ni najbolje složena stranica ne pomaže.

## Šta možete uraditi sami

- Prije postavljanja smanjite slike. Za stranicu je slika široka 1600 piksela obično i više nego dovoljna.
- Obrišite dodatke koje ne koristite.
- Pitajte se za svaku skriptu treba li Vam zaista.
- Izmjerite stranicu poslije svake veće izmjene, ne samo jednom.

Ostalo, kao što su učitavanje slika tek kad dođu na ekran, raspored koji ne skače i keširanje, je posao onoga ko pravi stranicu. O razlici između WordPressa i stranice pravljene po mjeri pišemo u tekstu [WordPress ili izrada po mjeri](/savjeti/wordpress-ili-custom).

## Česta pitanja

### Da li brzina utiče na Google?

Utiče, ali kao jedan od mnogo signala. Sadržaj koji odgovara na pretragu je važniji. Brzina više odlučuje o tome da li će kupac koji je već došao ostati na stranici.

### Moja stranica ima 60 na telefonu. Je li to loše?

To je narandžasta zona: stranica radi, ali kupci na slabijoj mreži čekaju. Pogledajte koja je mjera crvena ili narandžasta i šta PageSpeed predlaže ispod nje. Najčešće su na vrhu spiska slike.

### Može li svaka stranica imati 100?

Na računaru jednostavna stranica može. Na telefonu je to teže, posebno za web trgovinu sa mnogo artikala i slika. Cilj nije broj, nego da se stranica kupcu otvori brzo i ne skače.

## Hoćete da pogledamo Vašu?

Izmjerite stranicu i pošaljite nam rezultat, ili samo adresu. [Pišite nam](/kontakt), pa kažemo šta je najsporije i šta bi se isplatilo popraviti. Pogledajte i [koje usluge radimo](/usluge), od redizajna do održavanja.
