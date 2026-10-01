---
title: "Uvoz artikala od dobavljača u web shop: šta zaista treba"
seoTitle: "Uvoz artikala od dobavljača u web shop"
date: "2026-10-01"
excerpt: "Hiljade artikala od više dobavljača, svaki u svom obliku. Kako ih uvesti tako da cijene, slike, barkodovi i opisi budu tačni, iz prakse sa mrt.ba."
---

Trgovina koja prodaje robu od više dobavljača ne može artikle unositi ručno. Kod [mrt.ba](/radovi/mrt) katalog je 1. 10. 2026. imao 7.447 artikala u 262 kategorije, od više dobavljača. Ručni unos tolikog kataloga bi trajao mjesecima, a cijene bi zastarjele prije nego što se završi.

Uvoz zvuči jednostavno: uzmeš dobavljačev spisak i ubaciš ga u trgovinu. U praksi svaki dobavljač šalje podatke na svoj način, i tu nastaje većina problema.

## Odakle podaci dolaze

Kod mrt.ba imamo više vrsta izvora:

- **API dobavljača.** Najbolji slučaj: podaci dolaze u stalnom obliku i mogu se ponovo povući.
- **Dobavljačeva web stranica.** Kad API ne postoji, podaci se čitaju sa stranica artikala.
- **Spisak koji dobavljač pošalje.** Tabela ili izvoz iz njegovog programa.

Svaki izvor treba svesti na isti oblik: naziv, kategorija, cijena, zaliha, slike, karakteristike i EAN barkod. Tek onda ide u trgovinu.

Jedna zamka sa API-jem: dobavljačev API može biti iza zaštite koja propušta preglednik, a odbija poziv sa servera. Tada automatski uvoz ne radi dok dobavljač taj dio ne otvori, pa to vrijedi pitati na samom početku.

## Šifre: vlastite, ne dobavljačeve

Svaki artikal na mrt.ba dobije šifru prodavnice, npr. MR-000001. Dobavljačeva šifra se čuva odvojeno, skrivena u administraciji, i služi da se pri sljedećem uvozu zna koji je to artikal.

Dvije koristi:

- Kupci i konkurencija sa stranice ne vide od koga se roba nabavlja.
- Cijeli katalog ima jednu vrstu šifre, bez obzira od kog je dobavljača artikal.

## Barkodovi: samo provjereni

EAN barkod je univerzalan i kupci po njemu traže artikal. Na mrt.ba se može tražiti po barkodu sa kutije. Zato barkod mora biti tačan:

- Barkod koji ne prolazi kontrolnu cifru se ne upisuje.
- Barkod se ne izmišlja iz naziva ili šifre.
- Barkod sa vanjske ambalaže nije barkod pojedinačnog artikla.

Iz prakse: jedan dobavljač je za 1.457 artikala poslao prazno polje za barkod. Tim artiklima barkod ostaje prazan dok ga stvarni izvor ne dostavi.

## Slike: najviše posla

Dobavljači šalju slike u različitim oblicima. Kod mrt.ba smo imali tri problema odjednom:

- jedan izvor je slao široke snimke (3:2), koji su u kartici artikla izgledali kao traka,
- drugi je imao sivu studijsku pozadinu, pa je kartica bila siva,
- treći je imao proizvod preko cijele slike, bez razmaka do ivice.

Rješenje je bilo da svaka slika postane kvadrat na bijeloj pozadini, sa proizvodom na istom udjelu kadra. Katalog tako izgleda kao jedna trgovina, a ne kao pet spojenih.

Druga zamka: kad slika ne postoji, jedan dobavljač ne vrati grešku, nego svoj logo. Uvoz koji to ne prepozna stavi tuđi logo na artikal. Zato se slika provjerava po sadržaju, ne samo po tome da li je stigla.

## Opisi: vlastiti, ne prepisani

Dobavljačev opis ima svaki preprodavac tog artikla. Google ne vidi razlog da baš Vašu stranicu pokaže prvu kad je tekst isti kao na deset drugih.

Zato kod mrt.ba uvoz ne prepisuje opis svaki dan. Dobavljačev opis je početak, a vlasnik ga mijenja svojim tekstom, sam ili uz AI. Ono što vlasnik napiše ostaje i poslije sljedećeg uvoza.

Isto važi za adrese stranica. Kod jednog dobavljača su adrese artikala bile pisane ekavicom, pa smo ih napravili iz naziva u trgovini. Stare adrese vode na nove, da se ništa ne izgubi.

## Cijene i zalihe

Cijene i zalihe se mijenjaju najčešće, i za njih uvoz ima najviše smisla. Prije nego što se uključi automatika, treba dogovoriti:

- da li se dobavljačeva cijena prenosi direktno ili uz Vašu maržu,
- šta se dešava sa akcijskom cijenom,
- šta artikal pokazuje kad dobavljač nema zalihe.

## Kad se uvoz pokrene ponovo

Ponovni uvoz je trenutak kad se griješi. Uvoz mora artikal prvo naći po izvoru i dobavljačevoj šifri, pa tek onda odlučiti da li je nov. Inače nastanu duplikati, ili se prepiše ono što je vlasnik ručno sredio.

Isto pravilo važi i za veze dalje, na OLX i Ananas: uvoz sam ne treba da šalje stotine novih oglasa, jer [OLX prima najviše 350 novih oglasa dnevno](/savjeti/povezivanje-web-shopa-sa-olx-om).

## Česta pitanja

### Može li uvoz raditi sam svaki dan?

Za cijene i zalihe može, ako dobavljač ima stalan izvor podataka. Za opise i slike ne preporučujemo, jer bi prepisali ono što ste sami uredili.

### Šta ako dobavljač nema ni API ni tabelu?

Tada se podaci čitaju sa njegove web stranice. Radi, ali treba više provjere, jer se stranica može promijeniti bez najave.

### Koliko artikala trgovina može imati?

mrt.ba ima preko 7.400 artikala na WordPressu i WooCommerceu. Uz dobro postavljen keš i bazu to radi brzo, a kod mrt.ba je server 27. 9. 2026. odgovarao za 52 ms.

## Imate dobavljače i hiljade artikala?

Pogledajte [kako smo to riješili za mrt.ba](/radovi/mrt) ili nam [pišite](/kontakt) koje dobavljače imate i u kom obliku Vam šalju podatke.
