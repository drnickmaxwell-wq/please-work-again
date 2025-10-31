# Design Agent Integration Manifest (Champagne System)

**Purpose**  
Define how external design agents (e.g., Manus AI) may propose designs and code while preserving brand tokens, palette, and the Champagne surface stack.

**Non-negotiables**
- No raw hex values outside token sheets.
- All gradients must resolve from tokens. Canonical: `linear-gradient(135deg,#C2185B 0%,#40C4B4 60%,#D4AF37 100%)`.
- Surface stack order: **gradient → waves → particles → grain → glass → content**.
- Assets must be referenced via CSS variables (`--smh-waves-bg`, `--smh-particles-img`, `--smh-grain-img`) already defined in `styles/champagne/surface.css`.

**Agent Output Requirements**
- Components in TSX/JSX, styles in CSS using variables/tokens only.
- If new tokens are proposed, put them in a *separate* draft file under `design/drafts/tokens-proposals.css` (do not modify live tokens).
- Provide a section manifest JSON describing gradients, bgSize/bgPos, assets, blends, and motion limits.

**Process**
1. **Brief** (you supply): section name, layout notes, required tokens, constraints, and references to brand pages.
2. **Generation** (agent): code + CSS using tokens only, optional Figma/SVG.
3. **Review** (human): run `pnpm run brand:guard && pnpm run verify:hue && pnpm run build`; ensure no raw hex, canonical gradient, correct stack, accessiblity basics.
4. **Seal** (if accepted): move approved tokens into `styles/tokens/smh-champagne-tokens.css`, then run `node scripts/brand-checksum.cjs --write` and commit.
5. **CI**: feature branches must pass `brand-guard`, `verify:hue`, `test:brand`, and `build` before merge.

**Branch policy**
- AI contributions land on `feature/ai-*` branches only.  
- `CODEOWNERS` enforces human approval on tokens, brand, and guard scripts.

**Binary assets**
- Binaries are uploaded separately by a human to `/public/assets/champagne/...` and referenced only via variables. Agents must not commit binaries.
