# Sleep Oracle — Skill 1 Design Audit (redesign-existing-projects)

## Scan

| Item | Finding |
|------|---------|
| Framework | React 18 + Vite + React Router |
| Styling | Tailwind CSS v3 + custom CSS in `index.css` |
| Motion | `motion/react` |
| Icons | Phosphor (good — not Lucide/Feather) |
| Surfaces | Dark navy night palette, dual blue/purple accents |

## Diagnose — Generic patterns found

### Typography
- [x] Browser/system fonts only (`Segoe UI Variable`) — no character
- [x] Display/body not paired (serif + sans or distinctive sans)
- [x] All-caps tracked eyebrows everywhere
- [x] Missing Medium/SemiBold nuance in scale
- [ ] Numbers: mono used in places (partially OK)

### Color & surfaces
- [x] Purple/blue AI gradient fingerprint (`moon` + `dream`)
- [x] Two accent colors — skill requires one
- [x] Glow shadows (`shadow-glow`) — generic AI polish
- [x] Flat sections without imagery on landing below hero
- [x] Radial purple/blue overlays as primary atmosphere

### Layout
- [x] Classic left sidebar dashboard (skill suggests alternatives)
- [x] Equal card grids for features (2-col BezelCards)
- [x] Uniform `rounded-[1.75rem]` / `rounded-full` everywhere
- [x] Marketing page still denser than premium whitespace target
- [x] Hero includes metric card (stats in first viewport)

### Interactivity & states
- [x] Hover/active exist on PillButton — keep/improve
- [x] Focus rings exist — keep
- [x] LoadingGrid / EmptyState exist — good
- [ ] No custom 404 route
- [ ] No skip-to-content link
- [ ] No privacy/terms in footer
- [ ] Meta/OG tags thin
- [ ] No branded favicon beyond defaults

### Content
- [x] Copy mostly specific (good)
- [x] Some product-speak density on landing
- [x] Pill "Live demo" / "Beta"-style badges

### Components
- [x] BezelCard = border + glass + shadow everywhere
- [x] Always primary pill + ghost pill CTA pair
- [x] Avatar-less but pill badges overused

## Fix priority (executed in this skill pass)

1. Font swap → distinctive display + body + mono
2. Color palette cleanup → single accent, kill purple AI duo
3. Hover/active + focus polish
4. Layout/spacing — landing asymmetry, app shell rethink
5. Replace generic components (pills → intentional shapes)
6. Loading/empty/error + 404 + skip link + legal
7. Typography scale polish
