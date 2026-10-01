---
title: "Kako povezati web shop sa OLX-om, da se oglasi ažuriraju sami"
seoTitle: "Povezivanje web shopa sa OLX-om"
date: "2026-10-01"
excerpt: "Kako radi veza web trgovine i OLX-a, šta treba pripremiti i koje greške izbjeći. Iz prakse: mrt.ba ima preko 4.400 OLX oglasa koji se ažuriraju sami."
---

Ako prodajete i na web trgovini i na OLX-u, vjerovatno znate kako to ide: promijenite cijenu na sajtu, pa je mijenjate i na oglasu. Artikal stigne, pa ga unosite dva puta. Sa stotinu artikala to je dosadno, a sa hiljadama nemoguće.

Rješenje je veza u kojoj je web trgovina izvor istine, a OLX je prati. Ovako smo to napravili za [mrt.ba](/radovi/mrt), trgovinu alata koja je 29. 9. 2026. imala 4.453 OLX oglasa koji se ažuriraju sami.

## Šta veza radi

- **Novi artikal ide na OLX sam.** Kad objavite artikal u trgovini, server ga u pozadini pripremi i pošalje na OLX kao oglas.
- **Izmjene idu na oglas.** Promijenite cijenu, zalihu ili opis u trgovini, a promjena ode i na OLX.
- **Propuštene izmjene se hvataju.** Kod mrt.ba provjera svakih 15 minuta uporedi trgovinu i OLX i pošalje ono što je promaklo.
- **Ne treba upaljen računar.** Sve radi na serveru. Niko ne mora kliknuti dugme da bi oglasi bili tačni.

## Zašto trgovina mora biti izvor istine

Podatak smije imati samo jedan izvor. Ako se cijena mijenja i u trgovini i na OLX-u, prije ili kasnije se razidu, a kupac nađe dvije cijene za isti artikal. Zato se sve mijenja u trgovini, a OLX samo prati.

To ima i drugu korist: trgovina ima opise, slike, karakteristike i barkodove na jednom mjestu, pa OLX oglas dobije sve to bez prepisivanja.

## Kategorije i atributi: najveći dio posla

OLX za svaki oglas traži svoju kategoriju i svoje atribute, a oni se rijetko poklapaju sa kategorijama trgovine. Kod mrt.ba je kosilica u trgovini pod Kosilice, a na OLX-u pod Moj dom, pa Vrt, biljke i vrtlarstvo, pa Kosilice i trimeri za vrt, sa poljima koja trgovina nema.

Kod mrt.ba smo to riješili pravilima po kategoriji:

1. Za svaku kategoriju trgovine jednom ručno provjerimo jedan artikal i odaberemo mu tačnu OLX kategoriju i atribute.
2. Od toga nastane pravilo za cijelu kategoriju.
3. Svi sljedeći artikli te kategorije dobiju OLX kategoriju, atribute i brend sami.
4. Ako pravilo ili obavezan podatak fali, artikal čeka, umjesto da ode na OLX napamet.

Tako se ručni posao radi jednom po kategoriji, a ne jednom po artiklu.

## Šta treba pripremiti

- **Trgovinu sa urednim podacima.** Naziv, cijena, zaliha, slike i kratak opis za svaki artikal. Kod mrt.ba oglas dobije prvih 360 znakova kratkog opisa, pa prve rečenice treba da kažu šta je artikal.
- **OLX nalog firme i pristup OLX API-ju.** Veza radi preko OLX-ovog API-ja. Pristupni ključ ostaje samo na serveru, nikad u kodu.
- **Odluku šta ide na OLX.** Kod mrt.ba na OLX ide sve što je objavljeno u trgovini. Neko će htjeti samo određene kategorije ili samo artikle na stanju, i to se dogovori prije početka.

## Zamke koje smo naučili

- **OLX ima dnevni limit.** OLX prima najviše 350 novih oglasa dnevno (izmjereno 7. 9. 2026). Kad objavljujete hiljade artikala, objava mora sama nastaviti sljedeći dan. Inače stane na pola, uz grešku.
- **Stari ručni oglasi prave duplikate.** Ako ste ranije ručno postavljali oglase, treba ih povezati sa artiklima u trgovini, a ne pustiti vezu da napravi nove. Inače isti artikal ima dva oglasa.
- **Izmjena mimo trgovine ne ide na OLX.** Ako se artikli mijenjaju direktno u bazi ili kroz alat koji zaobilazi trgovinu, OLX za to ne sazna, pa takve oglase treba ponovo poslati.
- **Skrivanje nije isto što i zatvaranje.** Kod mrt.ba se pokazalo da skrivanje oglasa preko API-ja zna ostaviti oglas aktivnim, iako OLX javi da je uspjelo (izmjereno 6. 9. 2026). Artikle koje trajno skidate sa prodaje provjerite i na samom OLX-u.

## Koliko traje

Kod mrt.ba je prva verzija veze radila na serveru 31. 8. 2026, a objava cijelog kataloga na OLX krenula je 6. 9. 2026. Najviše vremena odnesu kategorije i atributi, pa trajanje zavisi od toga koliko različitih kategorija imate.

## Česta pitanja

### Mora li trgovina biti na WooCommerceu?

Veze koje smo napravili rade sa WooCommerceom. Ako imate drugu platformu, pišite nam šta koristite, pa ćemo reći šta je moguće.

### Mogu li i dalje ručno mijenjati oglas na OLX-u?

Možete, ali sljedeća izmjena iz trgovine će ga prepisati. Zato je pravilo jednostavno: mijenjajte u trgovini.

### Šta ako artikal nema sve što OLX traži?

Takav artikal čeka u spisku, sa porukom šta mu fali. Kad dopunite podatak u trgovini, ode na OLX sam.

### Može li isto i za Ananas?

Može, ali drugim putem. Ananas preuzima katalog iz feeda koji trgovina pravi sama, sa cijenama, akcijskim cijenama i zalihom. Kod mrt.ba rade oba.

## Hoćete i Vi ovako?

Pogledajte [kako radi mrt.ba](/radovi/mrt) ili nam [pišite](/kontakt) koliko artikala imate i u kojim kategorijama. Reći ćemo Vam šta treba i koliko traje.
