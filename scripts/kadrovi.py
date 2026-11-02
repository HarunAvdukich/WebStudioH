# Kadrovi sklapanja (public/kadrovi/sat i kosilica) iz izvornog videa: puna veličina videa
# (768 x 1024), a pozadina videa je zamijenjena tačnom bojom kanala u slovu (#0f241d), da se
# oko predmeta ne vidi pravougaonik. Predmet ostaje kakav jeste, i crni dijelovi.
# Treba ffmpeg i Python sa numpy, scipy i Pillow:
#   ffmpeg -i .design-canvas/img/vsat/sat.mp4 -start_number 1 kadrovi-png/sat/%03d.png
#   python scripts/kadrovi.py kadrovi-png/sat public/kadrovi/sat
# (kosilica isto, iz .design-canvas/img/vkos/kos.mp4)
# Upotreba: python scripts/kadrovi.py <folder sa PNG kadrovima> <izlazni folder> [kvalitet] [zrno]
import sys, os
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

ulaz, izlaz = sys.argv[1], sys.argv[2]
KVALITET = int(sys.argv[3]) if len(sys.argv) > 3 else 82
ZRNO = float(sys.argv[4]) if len(sys.argv) > 4 else 0.25  # koliko zrna pozadine ostaje
C = np.array([15, 36, 29], dtype=np.float32)
os.makedirs(izlaz, exist_ok=True)


def glatko(x, a, b):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


for ime in sorted(os.listdir(ulaz)):
    if not ime.endswith('.png'):
        continue
    px = np.asarray(Image.open(os.path.join(ulaz, ime)).convert('RGB'), dtype=np.float32)
    ivica = np.concatenate([px[:10].reshape(-1, 3), px[-10:].reshape(-1, 3), px[:, :10].reshape(-1, 3), px[:, -10:].reshape(-1, 3)])
    bg0 = np.median(ivica, axis=0)
    lum = px @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    # pozadina: blizu boje ivice i tamna; od nje glatko polje boje pozadine (vinjeta)
    maska = (np.linalg.norm(px - bg0, axis=2) < 16) & (lum < 60)
    s = 28
    den = gaussian_filter(maska.astype(np.float32), s)
    num = np.stack([gaussian_filter(px[..., k] * maska, s) for k in range(3)], axis=2)
    B = np.where(den[..., None] > 0.03, num / np.maximum(den, 1e-6)[..., None], bg0)
    # koliko je piksel predmet (1) ili pozadina (0)
    d = np.linalg.norm(px - B, axis=2)
    a = glatko(d, 6, 22)[..., None]
    out = a * px + (1 - a) * (C + ZRNO * (px - B))
    Image.fromarray(np.clip(np.rint(out), 0, 255).astype(np.uint8)).save(
        os.path.join(izlaz, ime.replace('.png', '.webp')), quality=KVALITET, method=6)
print('gotovo', izlaz)
