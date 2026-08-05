# Sleep Oracle — DESIGN.md (Stitch / agent source of truth)

Semantic design system for Google Stitch and future screen generation.

## Visual Atmosphere

Calm nocturnal wellness intelligence. Dark nature substrate with a single seafoam accent. Art-gallery airy on marketing (density 3). Daily-app balanced in product (density 5). Offset asymmetric layouts on landing. Fluid spring motion (intensity 6). Never purple-neon AI chrome.

## Color Calibration

| Name | Hex | Role |
|------|-----|------|
| Night Canvas | `#0b0d12` | Page background |
| Night Panel | `#11141c` | Elevated panels |
| Night Surface | `#181c27` | Cards / bezels |
| Seafoam Accent | `#7a9e8f` | Single accent (sat under 80%) |
| Mist Accent | `#a8cfbc` | Soft chart / secondary accent tone |
| Ink | `#e8eee9` | Primary text |
| Muted | `rgba(232,238,233,0.58)` | Secondary text |
| Hazard Red | `#e61919` | Admin telemetry alerts only |
| Terminal Green | `#4af626` | One admin status readout only |

**Banned:** purple/blue AI glow, rainbow accents, pure `#000000`, warm cream+brass consumer defaults on marketing.

## Typographic Architecture

- **Display:** Syne, bold, tracking tight, max ~2 lines on heroes
- **Body/UI:** Outfit 400–600, leading relaxed, max ~65ch
- **Mono:** IBM Plex Mono for scores, API paths, admin telemetry
- **Dashboard rule:** sans only (no serif in product UI)
- **Banned:** Inter, Fraunces/Instrument Serif as product defaults, emoji

## Component Behaviors

### Buttons
- Primary: seafoam fill `#7a9e8f`, text night `#0b0d12`, pill (`rounded-full`), nested arrow island
- Ghost: transparent + hairline ring white/15
- Active: `scale(0.98)`; hover transitions `700ms cubic-bezier(0.32,0.72,0,1)`

### Cards
- Double-bezel: outer `p-1.5` + ring white/8, inner inset highlight
- Use only when elevation communicates hierarchy
- Admin telemetry: zero radius, 2px solid borders, no bezels

### Inputs
- Label above, error below, never placeholder-as-label
- Focus ring seafoam

## Layout Principles

- Shell max-width ~1400px
- Hero: full-bleed image, brand as primary signal, ≤20-word subtext, 1 primary CTA
- Section spacing marketing: `py-32 md:py-48`
- Asymmetry preferred over centered heroes
- Mobile: single column, `min-h-[100dvh]`, no `h-screen`

## Motion Philosophy

- Motion library: Motion (spring) + GSAP ScrollTrigger for Desire pin
- Animate `transform`/`opacity` only
- Grain overlay fixed, pointer-events none
- Reduced-motion: disable pin/scrub and entry motion

## Surface Modes

1. **Marketing** — cinematic dark nature, island nav, AIDA with Desire pin
2. **Product** — night panels, seafoam accent, Phosphor icons (bold)
3. **Admin telemetry** — tactical CRT: mono, sharp corners, hazard red, scanlines

## Anti-Patterns

- Equal three-card feature rows
- Pill spam / badge clutter in heroes
- Em-dashes in copy
- Fake div screenshots
- Lucide-only icon sets
- Meta labels like "SECTION 01"
- Mixing warm and cool gray families
