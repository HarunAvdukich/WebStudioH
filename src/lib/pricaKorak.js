// Napredak skrola kroz priču (0..1) u indeks koraka (0..broj-1).
export function korakZaNapredak(napredak, broj) {
  const p = Math.min(Math.max(napredak, 0), 1)
  return Math.min(broj - 1, Math.floor(p * broj))
}
