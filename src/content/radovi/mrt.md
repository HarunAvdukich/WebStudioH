## Šta je trebalo

Motor Remont Trade je trgovina iz Brčkog: alati, mašine, vrtna i poljoprivredna oprema i rezervni dijelovi. Robu nabavljaju od više dobavljača, a dobar dio prodaje ide preko OLX-a.

Od nove web trgovine tražili su tri stvari:

- da nosi hiljade artikala, sa slikama, karakteristikama i filterima koji rade,
- da se OLX oglasi drže ažurnim sami, bez ručnog prepisivanja cijena i zaliha,
- da vlasnik sam mijenja sadržaj, bez zvanja programera za svaku sitnicu.

Prvi katalog smo uvezli 10. 8. 2026, a trgovina je javna na mrt.ba od 6. 9. 2026. Trgovinu smo napravili na WordPressu i WooCommerceu, sa temom pisanom samo za mrt.ba.

## Katalog od više dobavljača

Svaki dobavljač šalje podatke na svoj način. Kod jednog katalog dolazi preko API-ja, a kod drugog ga čitamo sa njegove web stranice. Za svakog smo napravili uvoz koji podatke svodi na isti oblik: naziv, kategorija, cijena, zaliha, slike, karakteristike i EAN barkod.

Nekoliko odluka se kupcu ne vidi, a vlasniku mnogo znači:

- **Vlastite šifre.** Svaki artikal dobije šifru prodavnice, npr. MR-000001. Dobavljačeva šifra ostaje skrivena u administraciji, pa se sa stranice ne vidi od koga se roba nabavlja.
- **Vlastiti opisi.** Dobavljačev opis ne prepisujemo svaki dan preko onoga što vlasnik napiše. Isti opis ima svaki preprodavač, a vlastiti tekst je ono po čemu Google razlikuje mrt.ba od ostalih.
- **Provjera pri uvozu.** Barkod koji ne prolazi kontrolnu cifru se ne upisuje. Kad dobavljač umjesto slike artikla vrati svoj logo, uvoz to prepozna i takvu sliku odbije.

Kupac traži po nazivu, po šifri ili po EAN barkodu sa kutije. Filteri se slažu iz karakteristika artikala, pa kod agregata, na primjer, može birati po naponu.

## OLX koji se drži ažurnim sam

Trgovina je izvor istine, a OLX je prati. Kad vlasnik objavi artikal na mrt.ba, server ga u pozadini pripremi i pošalje na OLX. Kad promijeni cijenu, zalihu ili opis, promjena ode i na oglas. Artikal koji nestane sa zalihe sakrije se i na OLX-u.

OLX za svaki oglas traži svoju kategoriju i svoje atribute. Zato za svaku kategoriju trgovine jednom ručno provjerimo jedan artikal i od njega napravimo pravilo. Svi sljedeći artikli te kategorije dobiju OLX kategoriju, atribute i brend sami. Ako pravilo ili obavezan podatak fali, artikal čeka, umjesto da ode na OLX napamet.

Sve radi na serveru: ne treba upaljen računar i ne treba niko da klikne. Svakih 15 minuta provjera uhvati izmjene koje bi inače promakle, a novi oglasi idu s razmakom, da veliki uvoz ne zatrpa OLX.

Na dan 29. 9. 2026. mrt.ba je na OLX-u imao 4.453 oglasa koji se ovako ažuriraju.

<figure class="case-snimci">
  <img src="/radovi/mrt-artikal.webp" width="780" height="1688" loading="lazy" decoding="async" alt="Kosilica Stiga Combi 53 SQ na mrt.ba po cijeni od 799 KM, snimak ekrana telefona" />
  <img src="/radovi/mrt-olx.webp" width="780" height="1688" loading="lazy" decoding="async" alt="Ista kosilica Stiga Combi 53 SQ kao OLX oglas iz Brčkog, 799 KM, snimak ekrana telefona" />
  <figcaption>Isti artikal, ista cijena: kosilica Stiga Combi 53 SQ na mrt.ba (lijevo) i kao OLX oglas (desno). Snimljeno na telefonu 29. 9. 2026.</figcaption>
</figure>

## Feed za Ananas

Ananas preuzima katalog mrt.ba iz feeda koji trgovina pravi sama: cijene, akcijske cijene i zalihu. Nema posebne tabele koju neko mora slati i ažurirati ručno.

## B2B portal za veleprodaju

Prodavnice i servisi koji kupuju na veliko imaju svoj ulaz, b2b.mrt.ba. Prijave se, vide veleprodajne cijene koje vlasnik upiše u cjenovnik i stanje zalihe, preuzmu cjenovnik za Excel i pošalju narudžbenicu. Portal radi na istom katalogu kao trgovina, pa nema druge baze koju treba održavati. Radi od 25. 9. 2026.

## Kobi, asistent na stranici

Kupac može pitati Kobija na bosanskom, recimo koja kosilica je za manje dvorište. Kobi odgovara iz kataloga mrt.ba i predlaže artikle koji tamo postoje.

Kobi ne uči sam iz razgovora. Ono što kupac napiše je pitanje, ne činjenica, pa u znanje ulazi samo ono što vlasnik napiše ili odobri. Pitanja o narudžbi i reklamaciji idu odmah čovjeku, a e-mail i telefon se uklanjaju prije nego što pitanje ode AI modelu.

## Vlasnik uređuje sam, i uz AI

Vlasnik mijenja opise, kategorije, slike kategorija i tekstove za Google sam, iz administracije. Isto može raditi i kroz Claude ili ChatGPT. Za to ima poseban nalog koji može sve što treba za sadržaj, a ne može ništa brisati, niti vidjeti narudžbe i podatke kupaca. Tako AI pomaže u poslu, a lični podaci kupaca ostaju u trgovini.

## Brzina i održavanje

Hosting, keš i sigurnosne kopije održavamo mi. Na mjerenju 27. 8. 2026. keširana stranica nove trgovine stizala je za 0,09 do 0,11 sekundi, a stari sajt motorremont.ba za 2,8 do 3,5 sekundi.

Kad je katalog za nekoliko sedmica narastao sa oko 5.500 na preko 7.300 artikala, sajt je usporio. Mjerenjem smo našli dva uzroka: meni u zaglavlju je na svakoj stranici pravio oko 1.280 upita u bazu, a keš je služio samo početnu. Oba su popravljena 13. 9. 2026.

Svaka izmjena ide prvo na probni sajt, uz sigurnosnu kopiju zatečenog stanja, pa tek onda na mrt.ba. Ako nešto krene po zlu, vraćanje je jedan korak.

## Brojke

- 7.447 artikala u 262 kategorije (provjereno 1. 10. 2026)
- 4.453 OLX oglasa koji se sami ažuriraju (provjereno 29. 9. 2026)
- Odziv servera 52 ms (mjereno 27. 9. 2026)
- PageSpeed 87 na računaru (Lighthouse, srednje od tri mjerenja, 27. 9. 2026)
- Trgovina javna od 6. 9. 2026, B2B portal od 25. 9. 2026

## Česta pitanja

### Može li i moja trgovina raditi sa OLX-om ovako?

Može. Vaša trgovina ostaje izvor istine, a mi postavimo pravila po kategorijama, kao kod mrt.ba. Ako trgovinu još nemate, napravimo je zajedno sa OLX vezom. Pišite nam koliko artikala imate i u kojim kategorijama.

### Šta ako dobavljač nema API?

Uvoz pravimo iz onoga što dobavljač ima. Kod mrt.ba katalog dolazi i preko API-ja i sa web stranica dobavljača. Važno je da podaci budu tačni, a ne kojim putem dolaze.

### Koliko je trajala izrada?

Prvi katalog je uvezen 10. 8. 2026, a trgovina je javna od 6. 9. 2026. Posao se tu nije završio: B2B portal je došao 25. 9. 2026, a izmjene po zahtjevu klijenta idu redovno.

### Ko održava trgovinu?

Mi: hosting, keš, sigurnosne kopije, izmjene i nove mogućnosti. Klijent javi šta treba, a izmjena ide prvo na probni sajt, pa na mrt.ba.

## Prodajete i na OLX-u?

Možemo i Vašu trgovinu povezati tako da oglasi rade sami. Otvorite [mrt.ba](https://mrt.ba) na telefonu, pogledajte [šta sve radimo](/usluge) ili nam [pišite](/kontakt).
