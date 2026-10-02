// Da li klik na link ide kroz zavjesu između stranica: samo običan lijevi klik, bez tipki,
// na drugu stranicu istog sajta. Vraća putanju za navigate() ili null.
export function putZaZavjesu(dogadjaj, link, lokacija) {
  if (dogadjaj.defaultPrevented || dogadjaj.button !== 0) return null
  if (dogadjaj.metaKey || dogadjaj.ctrlKey || dogadjaj.shiftKey || dogadjaj.altKey) return null
  if (!link || (link.target && link.target !== '_self')) return null
  if (link.hasAttribute('download') || link.hasAttribute('data-bez-zavjese')) return null
  const url = new URL(link.href, lokacija.href)
  if (url.origin !== lokacija.origin) return null
  if (url.pathname === lokacija.pathname) return null
  return url.pathname + url.search + url.hash
}
