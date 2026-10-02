// WhatsApp link sa unaprijed upisanom porukom.
import { contact } from '../data.js'

export const waLink = (tekst) => `${contact.whatsapp}?text=${encodeURIComponent(tekst)}`

// Zamijeni {ime} u predlošku vrijednostima: popuni('Zdravo, {x}.', { x: 'web shop' }).
export const popuni = (predlozak, vrijednosti) =>
  predlozak.replace(/\{(\w+)\}/g, (m, k) => (k in vrijednosti ? vrijednosti[k] : m))
