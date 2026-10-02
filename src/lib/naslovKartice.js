// Kad posjetilac pređe na drugu karticu, naslov naše kartice ga pozove nazad.
// Kad se vrati, naslov je opet pravi. Vraća funkciju koja gasi praćenje.
export function pratiNaslovKartice(dokument, odsutan) {
  let pravi = dokument.title
  const promjena = () => {
    if (dokument.hidden) {
      if (dokument.title !== odsutan) pravi = dokument.title
      dokument.title = odsutan
    } else if (dokument.title === odsutan) {
      dokument.title = pravi
    }
  }
  dokument.addEventListener('visibilitychange', promjena)
  return () => {
    dokument.removeEventListener('visibilitychange', promjena)
    if (dokument.title === odsutan) dokument.title = pravi
  }
}
