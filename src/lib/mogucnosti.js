// Jedno mjesto koje odlučuje koliko 3D-a i pokreta posjetilac dobija.
// Redoslijed je bitan: smanjen pokret gasi sve, pa tek onda ostali razlozi.
export function odluci({ webgl, deviceMemory, saveData, smanjenPokret }) {
  if (smanjenPokret) return { tri: false, video: false, pin: false, razlog: 'smanjen-pokret' }
  if (!webgl) return { tri: false, video: true, pin: true, razlog: 'nema-webgl' }
  if (saveData) return { tri: false, video: false, pin: true, razlog: 'save-data' }
  if (typeof deviceMemory === 'number' && deviceMemory <= 2)
    return { tri: false, video: true, pin: true, razlog: 'malo-memorije' }
  return { tri: true, video: true, pin: true, razlog: null }
}

export function procitaj(win = window) {
  let webgl = false
  try {
    const c = win.document.createElement('canvas')
    webgl = Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    webgl = false
  }
  return {
    webgl,
    deviceMemory: win.navigator.deviceMemory,
    saveData: Boolean(win.navigator.connection && win.navigator.connection.saveData),
    smanjenPokret: win.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
}
