import { Box3, Vector3 } from 'three'

// Najduža strana objekta postaje `velicina`, a objekat se centrira na nulu.
export function uklopi(objekat, velicina = 2) {
  const v = new Box3().setFromObject(objekat).getSize(new Vector3())
  const k = velicina / Math.max(v.x, v.y, v.z)
  objekat.scale.multiplyScalar(k)
  objekat.updateMatrixWorld(true)
  const centar = new Box3().setFromObject(objekat).getCenter(new Vector3())
  objekat.position.sub(centar)
  objekat.updateMatrixWorld(true)
  return objekat
}

export function oslobodi(objekat) {
  objekat.traverse((o) => {
    if (o.geometry) o.geometry.dispose()
    if (!o.material) return
    for (const mat of Array.isArray(o.material) ? o.material : [o.material]) {
      for (const v of Object.values(mat)) if (v && v.isTexture) v.dispose()
      mat.dispose()
    }
  })
}

export async function ucitajModel(url) {
  const [{ GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
    import('three/addons/loaders/GLTFLoader.js'),
    import('three/addons/libs/meshopt_decoder.module.js'),
  ])
  const loader = new GLTFLoader()
  loader.setMeshoptDecoder(MeshoptDecoder)
  const gltf = await loader.loadAsync(url)
  return uklopi(gltf.scene, 2)
}
