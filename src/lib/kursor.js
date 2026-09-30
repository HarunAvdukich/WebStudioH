// Vlastiti kursor: tačka prati miš tačno, prsten ide za njom sa malim zaostatkom.
// Nad linkom i dugmetom prsten naraste, a element sa data-kursor="..." pokaže
// natpis u prstenu. Učitava se tek na prvi pokret miša (App.jsx); na dodir i uz
// smanjene pokrete ostaje sistemski kursor.

const STIL = `
html.ima-kursor, html.ima-kursor * { cursor: none !important; }
html.ima-kursor input, html.ima-kursor textarea, html.ima-kursor select { cursor: text !important; }
.hk { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; opacity: 0; transition: opacity .25s; }
.hk.je-vidljiv { opacity: 1; }
.hk.je-tekst { opacity: 0; }
.hk__tacka, .hk__prsten { position: absolute; left: 0; top: 0; will-change: transform; }
.hk__tacka::before {
  content: ''; position: absolute; left: -4px; top: -4px; width: 8px; height: 8px; border-radius: 50%;
  background: #e3f1ea; box-shadow: 0 0 0 1px rgba(15, 36, 29, .55);
  transition: transform .2s ease;
}
.hk__krug {
  position: absolute; left: 0; top: 0; width: 36px; height: 36px; box-sizing: border-box;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid rgba(227, 241, 234, .75); border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(15, 36, 29, .22);
  transform: translate(-50%, -50%);
  transition: width .3s cubic-bezier(.2, .8, .2, 1), height .3s cubic-bezier(.2, .8, .2, 1),
    background-color .25s, border-color .25s, transform .15s ease;
}
.hk__natpis {
  opacity: 0; color: #0f241d; font: 700 12px/1.1 'Urbanist Variable', 'Urbanist', system-ui, sans-serif;
  letter-spacing: .06em; text-transform: uppercase; text-align: center; white-space: nowrap;
  transition: opacity .2s;
}
.hk.je-nad .hk__krug { width: 58px; height: 58px; border-color: #e3f1ea; background: rgba(227, 241, 234, .14); }
.hk.je-nad .hk__tacka::before { transform: scale(.5); }
.hk.ima-natpis .hk__krug { width: 116px; height: 116px; border-color: #e3f1ea; background: #e3f1ea; }
.hk.ima-natpis .hk__natpis { opacity: 1; }
.hk.ima-natpis .hk__tacka::before { transform: scale(0); }
.hk.je-pritisnut .hk__krug { transform: translate(-50%, -50%) scale(.86); }
`

const INTERAKTIVNO = 'a, button, [role="button"], [data-kursor], label, summary, input, textarea, select'

export function pokreniKursor(prvi) {
  const html = document.documentElement
  const stil = document.createElement('style')
  stil.textContent = STIL
  document.head.append(stil)

  const el = document.createElement('div')
  el.className = 'hk'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = '<div class="hk__prsten"><div class="hk__krug"><span class="hk__natpis"></span></div></div><div class="hk__tacka"></div>'
  document.body.append(el)
  const prsten = el.firstChild
  const tacka = el.lastChild
  const natpis = el.querySelector('.hk__natpis')

  let mx = prvi?.clientX ?? -100
  let my = prvi?.clientY ?? -100
  let px = mx
  let py = my
  let okvir = 0

  const korak = () => {
    px += (mx - px) * 0.22
    py += (my - py) * 0.22
    tacka.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    prsten.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`
    okvir = Math.abs(mx - px) + Math.abs(my - py) > 0.2 ? requestAnimationFrame(korak) : 0
  }
  const pokreni = () => {
    if (!okvir) okvir = requestAnimationFrame(korak)
  }
  const prikazi = () => {
    el.classList.add('je-vidljiv')
    html.classList.add('ima-kursor')
  }

  const pomjeri = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    mx = e.clientX
    my = e.clientY
    prikazi()
    pokreni()
  }
  const nad = (e) => {
    const cilj = e.target instanceof Element ? e.target.closest(INTERAKTIVNO) : null
    const tekst = !!cilj && cilj.matches('input, textarea, select')
    const n = (!tekst && cilj?.getAttribute('data-kursor')) || ''
    el.classList.toggle('je-tekst', tekst)
    el.classList.toggle('je-nad', !!cilj && !tekst)
    el.classList.toggle('ima-natpis', !!n)
    if (natpis.textContent !== n) natpis.textContent = n
  }
  const izasao = () => el.classList.remove('je-vidljiv')
  const dolje = () => el.classList.add('je-pritisnut')
  const gore = () => el.classList.remove('je-pritisnut')

  window.addEventListener('pointermove', pomjeri, { passive: true })
  document.addEventListener('pointerover', nad, { passive: true })
  html.addEventListener('mouseleave', izasao)
  window.addEventListener('pointerdown', dolje, { passive: true })
  window.addEventListener('pointerup', gore, { passive: true })

  if (prvi) {
    prikazi()
    nad(prvi)
    korak()
  }

  return () => {
    window.removeEventListener('pointermove', pomjeri)
    document.removeEventListener('pointerover', nad)
    html.removeEventListener('mouseleave', izasao)
    window.removeEventListener('pointerdown', dolje)
    window.removeEventListener('pointerup', gore)
    if (okvir) cancelAnimationFrame(okvir)
    html.classList.remove('ima-kursor')
    el.remove()
    stil.remove()
  }
}
