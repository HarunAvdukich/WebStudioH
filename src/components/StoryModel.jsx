import { useEffect, useRef } from 'react'
import { odluci, procitaj } from '../lib/mogucnosti.js'

export default function StoryModel({ prica, aktivan, gravura }) {
  const ref = useRef(null)
  const stanje = useRef({})
  // Zadnje vrijednosti, da ih model preuzme i kad se učita kasnije.
  const zadnje = useRef({ aktivan, gravura })
  zadnje.current = { aktivan, gravura }

  useEffect(() => {
    const platno = ref.current
    if (!platno || !odluci(procitaj()).tri) return undefined
    let otkazano = false

    // Stanje se pravi pri svakom učitavanju, da gašenje i ponovno učitavanje
    // ne pišu u stari objekat.
    const ucitaj = async () => {
      const s = { ucitava: true }
      stanje.current = s
      const [{ napraviScenu }, { ucitajModel, oslobodi }, { OrbitControls }, { Group }] = await Promise.all([
        import('../three/scena.js'),
        import('../three/model.js'),
        import('three/addons/controls/OrbitControls.js'),
        import('three'),
      ])
      if (otkazano || stanje.current !== s) return
      // Udaljenost kamere je u podacima priče: artikal dug u dubinu (kosilica)
      // traži bližu kameru od širokog (kasica) da bi izgledali jednako krupno.
      s.scena = napraviScenu(platno, { udaljenost: prica.model.udaljenost ?? 4.6 })
      s.model = await ucitajModel(`/price/${prica.id}/${prica.model.glb}`)
      if (otkazano || stanje.current !== s) {
        oslobodi(s.model)
        s.scena.ugasi()
        return
      }
      // Model i gravura su u istoj grupi: položaj gravure iz podataka je u
      // jedinicama uklopljenog modela (najduža strana 2), a strelice okreću grupu.
      s.grupa = new Group()
      s.grupa.add(s.model)
      s.scena.scena.add(s.grupa)
      s.kontrole = new OrbitControls(s.scena.kamera, platno)
      Object.assign(s.kontrole, { enableZoom: false, enablePan: false, autoRotate: true, autoRotateSpeed: 1.2, enableDamping: true })
      const korakGravure = prica.koraci.find((k) => k.tip === 'gravura')
      if (korakGravure) {
        const { napraviGravuru } = await import('../three/gravura.js')
        s.gravura = await napraviGravuru({ velicina: korakGravure.povrsina.velicina })
        s.gravura.mesh.position.set(...korakGravure.povrsina.polozaj)
        s.gravura.mesh.rotation.set(...korakGravure.povrsina.rotacija)
        s.grupa.add(s.gravura.mesh)
        s.gravura.postavi(zadnje.current.gravura ?? korakGravure.predlozak)
      }
      s.scena.pokreni(() => s.kontrole.update())
      s.kontrole.autoRotate = zadnje.current.aktivan
      s.ucitava = false
      platno.closest('.prica__vizual')?.classList.add('je-3d')
      s.ugasi = () => {
        s.kontrole.dispose()
        s.gravura?.ugasi()
        oslobodi(s.model)
        s.scena.ugasi()
      }
    }

    // Model se učitava kad je priča jedan ekran daleko, gasi kad ode dalje.
    const io = new IntersectionObserver(
      ([u]) => {
        if (u.isIntersecting && !stanje.current.scena && !stanje.current.ucitava) ucitaj()
        if (!u.isIntersecting && stanje.current.ugasi) {
          stanje.current.ugasi()
          stanje.current = {}
          platno.closest('.prica__vizual')?.classList.remove('je-3d')
        }
      },
      { rootMargin: '100% 0px 100% 0px' },
    )
    io.observe(platno)
    return () => {
      otkazano = true
      io.disconnect()
      stanje.current.ugasi?.()
      stanje.current = {}
    }
  }, [prica])

  useEffect(() => {
    const s = stanje.current
    if (s.gravura && gravura !== undefined) s.gravura.postavi(gravura)
  }, [gravura])

  useEffect(() => {
    const s = stanje.current
    if (!s.kontrole) return
    s.kontrole.autoRotate = aktivan
  }, [aktivan])

  const naTipku = (e) => {
    const m = stanje.current.grupa
    if (!m) return
    if (e.key === 'ArrowLeft') m.rotation.y -= 0.2
    if (e.key === 'ArrowRight') m.rotation.y += 0.2
  }

  return (
    <canvas
      ref={ref}
      className="prica__platno"
      tabIndex={0}
      aria-label={`${prica.model.alt}. Okrećite strelicama lijevo i desno.`}
      onKeyDown={naTipku}
    />
  )
}
