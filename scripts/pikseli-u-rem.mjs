// PostCSS dodatak: pikseli u CSS-u postaju rem (16 px = 1rem), pa se cijeli sajt uveća kad
// src/index.css poveća slovo na <html> (ekran veći od laptopa). Na laptopu i telefonu je
// <html> 16 px, pa je sve isto kao prije. Stilovi se i dalje pišu u pikselima.
// U pikselima ostaje: 1px i manje (tanke linije), sve u url(...), pravilo samo za `html`
// (tu se zadaje osnovna veličina) i media upiti (oni nisu deklaracije, pa ih ovo ne dira).
const PX = /(-?\d*\.?\d+)px\b/g

export function uRem(vrijednost) {
  return vrijednost
    .split(/(url\([^)]*\))/)
    .map((dio) =>
      dio.startsWith('url(')
        ? dio
        : dio.replace(PX, (cijelo, broj) => (Math.abs(Number(broj)) <= 1 ? cijelo : `${Number((broj / 16).toFixed(4))}rem`)),
    )
    .join('')
}

export default function pikseliURem() {
  return {
    postcssPlugin: 'pikseli-u-rem',
    Once(root) {
      root.walkDecls((decl) => {
        if (!decl.value.includes('px') || decl.parent?.selector === 'html') return
        decl.value = uRem(decl.value)
      })
    },
  }
}
pikseliURem.postcss = true
