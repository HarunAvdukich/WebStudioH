// Koliko je sajt uvećan na velikom ekranu (1 na laptopu i telefonu). src/index.css zadaje
// slovo na <html>, a CSS je u rem, pa JavaScript koji računa u pikselima množi ovim brojem.
export function velicina() {
  if (typeof document === 'undefined') return 1
  return parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1
}
