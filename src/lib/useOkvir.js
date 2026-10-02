// Tekst okvira na jeziku stranice: bosanski ili engleski (/en), prema adresi.
import { useLocation } from 'react-router-dom'
import * as bs from '../okvir.js'
import * as en from '../okvir.en.js'
import { jezikPuta, drugaVerzija } from './jezik.js'

export function useOkvir() {
  const { pathname } = useLocation()
  const jezik = jezikPuta(pathname)
  const t = jezik === 'en' ? en : bs
  return { jezik, meni: t.meni, whatsappLink: t.whatsappLink, okvir: t.okvir, drugaVerzija: drugaVerzija(pathname) }
}
