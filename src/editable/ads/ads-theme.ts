// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

// Site-wide default skin — tuned to the dark/lime brand.
export const adSkin: AdSkin = {
  radius: '24px',
  border: '1px solid rgba(255,255,255,0.10)',
  shadow: '0 30px 80px -40px rgba(0,0,0,0.95)',
  background: '#101310',
  labelClassName: 'bg-[#c6f24e] text-[#0a0c0a]',
}

// Optional per-slot overrides — adjust only where you need to.
export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '20px', shadow: 'none', border: '1px solid rgba(255,255,255,0.10)' },
  popup: { radius: '28px' },
  header: { radius: '24px', background: '#0e110d' },
}

/** Merge site default + per-slot override for a slot. */
export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
// junior tweak
