import { lbNagar } from './lb-nagar'
import { peerzadiguda } from './peerzadiguda'
import { kompally } from './kompally'
import { lakdikapul } from './lakdikapul'
import { ecil } from './ecil'
import { miyapur } from './miyapur'
import { secunderabad } from './secunderabad'
import { vijayawada } from './vijayawada'
import { rajahmundry } from './rajahmundry'
import { rtcXRoads } from './rtc-x-roads'

export { lbNagar, peerzadiguda, kompally, lakdikapul, ecil, miyapur, secunderabad, vijayawada, rajahmundry, rtcXRoads }

export const branches = [
  lbNagar,
  peerzadiguda,
  kompally,
  lakdikapul,
  ecil,
  vijayawada,
  rajahmundry,
  rtcXRoads,
  miyapur,
  secunderabad,
]

export const getBranchBySlug = (slug) => branches.find(b => b.slug === slug)
