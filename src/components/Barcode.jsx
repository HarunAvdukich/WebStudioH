// EAN-13 bar-kod kao na etiketi u radnji. Prefiks 387 je GS1 prefiks za BiH.
// Kod je stvarno kodiran (L/G/R šeme i kontrolna cifra), ali je ukras: aria-hidden.

const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011']
const G = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
const R = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100']
const PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL']

export function ean13(twelve) {
  const d = String(twelve).padStart(12, '0').slice(0, 12).split('').map(Number)
  const sum = d.reduce((s, n, i) => s + n * (i % 2 === 0 ? 1 : 3), 0)
  return [...d, (10 - (sum % 10)) % 10]
}

function modules(digits) {
  const parity = PARITY[digits[0]]
  let bits = '101'
  for (let i = 1; i <= 6; i++) bits += (parity[i - 1] === 'L' ? L : G)[digits[i]]
  bits += '01010'
  for (let i = 7; i <= 12; i++) bits += R[digits[i]]
  return bits + '101'
}

// Pozicije vodećih traka (početak, sredina, kraj) su duže, kao na pravoj etiketi.
const GUARD = new Set([0, 1, 2, 45, 46, 47, 48, 49, 92, 93, 94])

export default function Barcode({ code = '387000000001', className = '' }) {
  const digits = ean13(code)
  const bits = modules(digits)
  const bars = []
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] !== '1') continue
    let w = 1
    while (bits[i + w] === '1' && !GUARD.has(i + w) === !GUARD.has(i)) w++
    bars.push({ x: i, w, guard: GUARD.has(i) })
    i += w - 1
  }
  const text = `${digits[0]} ${digits.slice(1, 7).join('')} ${digits.slice(7).join('')}`

  return (
    <svg
      className={`barcode ${className}`}
      viewBox="-9 0 113 44"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y="0" width={b.w} height={b.guard ? 36 : 31} />
      ))}
      <text x="47.5" y="43" textAnchor="middle">
        {text}
      </text>
    </svg>
  )
}
