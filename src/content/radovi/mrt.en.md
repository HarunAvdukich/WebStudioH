## What they needed

Motor Remont Trade is a store from Brčko, Bosnia and Herzegovina: tools, machines, garden and farm equipment and spare parts. They buy from several suppliers, and a good share of their sales goes through OLX, the largest classifieds site in the country.

They asked three things of the new online store:

- that it carries thousands of products, with images, specifications and filters that work,
- that the OLX listings stay up to date by themselves, without retyping prices and stock by hand,
- that the owner can change the content directly, without calling a developer for every small thing.

We imported the first catalogue on 10 Aug 2026, and the store has been live on mrt.ba since 6 Sep 2026. We built it on WordPress and WooCommerce, with a theme written only for mrt.ba.

## A catalogue from several suppliers

Every supplier sends data in its own way. With one, the catalogue comes through an API; with another, we read it from the supplier's website. For each of them we built an import that brings the data into the same shape: name, category, price, stock, images, specifications and EAN barcode.

A few decisions are invisible to the customer and mean a lot to the owner:

- **Own product codes.** Every product gets a store code, such as MR-000001. The supplier's code stays hidden in the admin, so nobody can see on the site where the goods come from.
- **Own descriptions.** We do not overwrite what the owner writes with the supplier's description every day. Every reseller has the same supplier text; the store's own text is what lets Google tell mrt.ba apart from the rest.
- **Checks on import.** A barcode that fails its check digit is not saved. When a supplier returns its logo instead of a product image, the import recognises it and rejects that image.

Customers search by name, by store code or by the EAN barcode on the box. Filters are built from product specifications, so with generators, for example, customers can filter by voltage.

## OLX that keeps itself up to date

The store is the source of truth, and OLX follows it. When the owner publishes a product on mrt.ba, the server prepares it in the background and sends it to OLX. When the owner changes a price, stock or a description, the change goes to the listing as well.

OLX asks for its own category and its own attributes for every listing. So for each store category we check one product by hand once and turn it into a rule. Every following product in that category gets its OLX category, attributes and brand automatically. If a rule or a required field is missing, the product waits instead of going to OLX with guessed data.

Everything runs on the server: no computer needs to be switched on and nobody needs to click. Every 15 minutes a check catches changes that would otherwise slip through. OLX accepts at most 350 new listings a day, so a large publication simply continues the next day.

On 29 Sep 2026, mrt.ba had 4,453 OLX listings updated this way.

## A feed for Ananas

Ananas, a large online marketplace in the region, takes the mrt.ba catalogue from a feed that the store generates itself: prices, sale prices and stock. There is no separate spreadsheet that someone has to send and update by hand.

## A B2B portal for wholesale

Shops and workshops that buy in bulk have their own entrance, b2b.mrt.ba. They log in, see the wholesale prices the owner enters in a price list and the stock levels, download the price list for Excel and send an order form. The portal runs on the same catalogue as the store, so there is no second database to maintain. It has been running since 25 Sep 2026.

## Kobi, the assistant on the site

Customers can ask Kobi in Bosnian, for example which lawn mower suits a smaller garden. Kobi answers from the mrt.ba catalogue and suggests products that actually exist there.

Kobi does not learn by itself from conversations. What a customer writes is a question, not a fact, so only what the owner writes or approves goes into its knowledge. Questions about orders and complaints go straight to a person, and email addresses and phone numbers are removed before a question reaches the AI model.

## The owner edits it directly, with AI too

The owner changes descriptions, categories, category images and texts for Google directly from the admin, and can do the same through Claude or ChatGPT. For that there is a separate account that can do everything needed for content, but cannot delete anything or see orders and customer data. That way AI helps with the work, while customers' personal data stays in the store.

## Speed and maintenance

We look after hosting, caching and backups. In a measurement on 27 Aug 2026, a cached page of the new store arrived in 0.09 to 0.11 seconds, and the old motorremont.ba site in 2.8 to 3.5 seconds.

When the catalogue grew within a few weeks from about 5,500 to over 7,300 products (Sep 2026), the site slowed down. Measuring it, we found two causes: the header menu made about 1,280 database queries on every page, and the cache only served the home page. Both were fixed on 13 Sep 2026.

Every change goes to a staging site first, together with a backup of the current state, and only then to mrt.ba. If something goes wrong, rolling back is one step.

## Questions

### Can my store work with OLX like this?

Yes. Your store stays the source of truth, and we set up rules per category, as with mrt.ba. If you do not have a store yet, we build it together with the OLX link. Tell us how many products you have and in which categories.

### What if a supplier has no API?

We build the import from whatever the supplier has. For mrt.ba, the catalogue comes both through an API and from suppliers' websites. What matters is that the data is correct, not which way it arrives.

### How long did it take?

The first catalogue was imported on 10 Aug 2026, and the store has been live since 6 Sep 2026. The work did not stop there: the B2B portal came on 25 Sep 2026, and changes requested by the client keep coming regularly.

### Who maintains the store?

We do: hosting, caching, backups, changes and new features. The client tells us what is needed, and a change goes to the staging site first, then to mrt.ba.
