export const GRAVURA_MAX = 18

export function ocistiTekst(t) {
  return String(t ?? '').replace(/\s+/g, ' ').trim().slice(0, GRAVURA_MAX)
}

// Tekst izgleda kao spaljen u drvo: tamno smeđe, blago prozirno.
export function nacrtajGravuru(ctx, tekst, { w, h, font }) {
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(62, 36, 18, 0.88)'
  ctx.font = `600 ${Math.round(h * 0.32)}px ${font}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(tekst, w / 2, h / 2, w * 0.92)
}

export async function napraviGravuru({ velicina }) {
  const { CanvasTexture, Mesh, MeshBasicMaterial, PlaneGeometry, SRGBColorSpace } = await import('three')
  const platno = document.createElement('canvas')
  platno.width = 1024
  platno.height = Math.round(1024 * (velicina[1] / velicina[0]))
  const ctx = platno.getContext('2d')
  const tekstura = new CanvasTexture(platno)
  tekstura.colorSpace = SRGBColorSpace
  const mesh = new Mesh(
    new PlaneGeometry(velicina[0], velicina[1]),
    new MeshBasicMaterial({ map: tekstura, transparent: true, depthWrite: false }),
  )
  const font = getComputedStyle(document.documentElement).getPropertyValue('--font-tekst').trim() || 'sans-serif'
  return {
    mesh,
    postavi(tekst) {
      nacrtajGravuru(ctx, ocistiTekst(tekst), { w: platno.width, h: platno.height, font })
      tekstura.needsUpdate = true
    },
    ugasi() {
      mesh.geometry.dispose()
      mesh.material.dispose()
      tekstura.dispose()
    },
  }
}
