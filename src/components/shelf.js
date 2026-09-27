// Raspoređuje etikete po redovima police: svaki red je 12 kolona i ima svoj nosač.
export function shelfRows(items, spans) {
  const rows = []
  let row = []
  let used = 0
  items.forEach((item, i) => {
    const span = spans[i % spans.length]
    if (used + span > 12) {
      rows.push(row)
      row = []
      used = 0
    }
    row.push({ item, span, index: i })
    used += span
  })
  if (row.length) rows.push(row)
  return rows
}
