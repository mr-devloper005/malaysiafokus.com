// ✏️ EDITABLE — chooses WHERE an ad sits, not how it looks (look lives in
// ads-theme.ts) and not its shape (locked in src/lib/ads/ad-slots.ts).
//
// Pages that want a single rotating placement call pickRandomAdSlot() so each
// page surfaces a different approved slot on each render. `popup` is excluded so
// in-page placements never become intrusive overlays.

const ROTATING_AD_SLOTS = ['header', 'in-feed', 'sidebar', 'article-bottom', 'footer'] as const

export function pickRandomAdSlot(exclude: string[] = []): string {
  const pool = ROTATING_AD_SLOTS.filter((slot) => !exclude.includes(slot))
  const list = pool.length ? pool : [...ROTATING_AD_SLOTS]
  return list[Math.floor(Math.random() * list.length)]
}
