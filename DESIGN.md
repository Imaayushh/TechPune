# Design System Specification: The Academic Atelier

## 1. Overview & Creative North Star
**Creative North Star: "The Curated Journal"**

This design system is built to elevate a student opportunity hub from a generic listing site to a high-end editorial experience. We are moving away from the "industrial" look of traditional academic portals. Instead, we embrace the rhythm of a premium print magazine—prioritizing white space, bold typographic hierarchies, and organic layouts.

The "template" look is the enemy. To break it, we utilize **intentional asymmetry** (e.g., left-aligned display type paired with right-aligned card grids) and **tonal depth**. This system treats the screen as a physical desk where layers of fine paper (surfaces) are stacked, creating a sense of sophisticated tactile organization.

---

## 2. Colors & Tonal Architecture
The palette is a monochrome study in depth. By using varying shades of black and white, we direct the student's focus entirely toward the content of the opportunities.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders for sectioning or containment. Structural boundaries must be defined solely through background color shifts.
- A section of the page should transition from `surface` (#f9f9f9) to `surface-container-low` (#f3f3f3) to signal a change in context. 
- Use the `surface-container-highest` (#e2e2e2) only for the most critical interactive areas, like sidebar navigation or search containers.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested layers. 
- **Base Layer:** `surface` (#f9f9f9).
- **Secondary Sectioning:** `surface-container` (#eeeeee).
- **Interactive Card Layer:** `surface-container-lowest` (#ffffff) sitting on top of a `surface-container-low` section. This creates a natural "pop" without the need for heavy shadows.

### The "Glass & Gradient" Rule
To add "soul" to the monochrome palette:
- **Floating Elements:** Use Glassmorphism for the Floating Action Button (FAB) or Top Navigation. Utilize `surface` at 80% opacity with a `backdrop-filter: blur(20px)`.
- **Primary Actions:** Use a subtle linear gradient on main CTAs, transitioning from `primary` (#000000) to `primary-container` (#3b3b3b). This adds a "velvet" finish that feels premium and bespoke.

---

## 3. Typography
We utilize a high-contrast pairing: a bold display face for editorial impact, and a clean sans-serif for utility.

### Font Pairing (Strict)
- **Headlines:** **Clash Display**
- **Subheadings:** **Cabinet Grotesk**
- **Body/UI:** **Inter** (preferred) or **Geist**

### Implementation Notes (React Native)
Use these `fontFamily` names consistently:
- **Headlines:** `ClashDisplay-Bold`
- **Subheadings:** `CabinetGrotesk-Bold` / `CabinetGrotesk-Medium`
- **Body/UI:** `Inter-Regular` / `Inter-Medium` / `Inter-Semibold`

### Hierarchy as Identity
The massive scale difference between a display headline (Clash Display) and a micro label (Inter/Cabinet) is part of the brand. Prefer fewer, stronger type sizes with generous whitespace.

---

## 4. Elevation & Depth
We eschew traditional "material" shadows in favor of **Tonal Layering**.

### The Layering Principle
Depth is achieved by "stacking." A `surface-container-lowest` (#ffffff) card placed on a `surface-container-low` (#f3f3f3) background creates a soft, sophisticated lift. This mimics the look of high-quality cardstock on a light grey desk.

### Ambient Shadows
If an element must float (e.g., a modal or a primary FAB), use **Ambient Shadows**:
- **Color:** Use `on-surface` (#1a1c1c) at 4%–6% opacity.
- **Blur:** Large values (40px–60px) to simulate soft, natural light rather than a harsh digital shadow.

### The "Ghost Border" Fallback
If an accessibility requirement demands a border, use a **Ghost Border**: 
- Token: `outline-variant` (#c6c6c6).
- Opacity: **20% maximum**. It should be felt, not seen.

---

## 5. Components

### Cards
- **Construction:** No borders. Use `xl` (1.5rem) or `lg` (1rem) rounded corners.
- **Spacing:** Forbid divider lines. Use `1.5rem` to `2rem` of internal padding to let the content breathe. 
- **Hover State:** Transition the background from `surface-container-lowest` to `surface-container-high` (#e8e8e8).

### Buttons
- **Primary:** Solid `primary` (#000000) with `on-primary` (#e2e2e2) text. Use `full` (9999px) rounding for a "pill" look.
- **Secondary:** `surface-container-highest` (#e2e2e2) background with `on-surface` (#1a1c1c) text.
- **Tertiary:** Purely typographic. Use `title-sm` (Inter) with an underlined hover state.

### Category Pills (Chips)
- **Style:** Small, high-contrast markers. Use `secondary-container` (#d6d4d3) with `on-secondary-container` (#1b1c1c).
- **Rounding:** `full` (9999px).

### Input Fields
- **Style:** Subtle and "recessed." Use `surface-container-low` (#f3f3f3) as the background with a `none` border. 
- **Focus State:** Transition to `surface-container-highest` (#e2e2e2) with a 1px `primary` (#000000) bottom-border only.

---

## 6. Do's and Don'ts

### Do:
- **Embrace White Space:** If you think there is enough margin, add 16px more.
- **Use "Editorial Grid":** Align titles to the left but indent the body text or cards to the right to create visual tension.
- **Prioritize Type:** Let the `Newsreader` headlines be the "hero" of the layout.

### Don't:
- **Use pure #000 for everything:** Use the `secondary` (#5f5e5e) and `on-surface-variant` (#474747) for secondary text to maintain a soft, premium feel.
- **Add divider lines:** If you need to separate content, use a 32px or 48px gap or a tonal shift.
- **Use "Default" shadows:** Never use the standard CSS `0 2px 4px rgba(0,0,0,0.5)`. It breaks the sophisticated vibe.