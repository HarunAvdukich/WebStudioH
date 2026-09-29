import {
  WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight,
  SRGBColorSpace, ACESFilmicToneMapping, PMREMGenerator,
} from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export function napraviScenu(platno, { fov = 30, udaljenost = 6 } = {}) {
  const renderer = new WebGLRenderer({ canvas: platno, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping

  const scena = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  scena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  pmrem.dispose()

  const kamera = new PerspectiveCamera(fov, 1, 0.1, 100)
  kamera.position.set(0, 0, udaljenost)
  scena.add(new AmbientLight(0xffffff, 0.35))
  const svjetlo = new DirectionalLight(0xffffff, 1.6)
  svjetlo.position.set(3, 4, 5)
  scena.add(svjetlo)

  const velicina = () => {
    const w = platno.clientWidth
    const h = platno.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    kamera.aspect = w / h
    kamera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(velicina)
  ro.observe(platno)
  velicina()

  let raf = 0
  let naKadar = null
  const petlja = () => {
    raf = requestAnimationFrame(petlja)
    if (naKadar) naKadar()
    renderer.render(scena, kamera)
  }

  return {
    scena,
    kamera,
    renderer,
    pokreni(fn) {
      if (fn) naKadar = fn
      if (!raf) petlja()
    },
    zaustavi() {
      cancelAnimationFrame(raf)
      raf = 0
    },
    ugasi() {
      cancelAnimationFrame(raf)
      raf = 0
      ro.disconnect()
      scena.environment?.dispose()
      renderer.dispose()
    },
  }
}
