// Id za naslov dijela: mala slova, bez kvačica (đ postaje dj), crtice umjesto razmaka.
export const idOd = (tekst) =>
  tekst
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'dj')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
