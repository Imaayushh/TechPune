# Codebase Concerns

**Analysis Date:** 2026-04-25

## Tech Debt

**Prop Drilling:**
- Issue: Navigation state and user data are drilled through multiple levels from `App.tsx` to nested components in `Dashboard` and `Hamburger`.
- Impact: Harder to refactor navigation or add deep sub-screens.
- Fix approach: Implement a lightweight State Management solution (e.g., React Context or Zustand).

**Large Component Files:**
- Issue: Component logic and styles are combined in single large files.
- Files: `src/Dashboard.tsx` (480+ lines), `src/ProfilePage.tsx`
- Impact: Reduced readability and harder maintainability.
- Fix approach: Extract UI sub-components into their own files and move styles to separate modules.

**Custom Icon Scaling:**
- Issue: `Heroicon.tsx` uses hardcoded SVG paths and manual viewBox scaling.
- Impact: Adding new icons is a manual process of copying paths.
- Fix approach: Integrate an icon library (e.g., `@expo/vector-icons`) or automate SVG-to-component conversion.

## Known Bugs

**Font Loading Race Condition:**
- Symptoms: App might show blank screen if fonts fail to load.
- Root cause: `App.tsx` returns `null` when `!fontsLoaded`.
- Fix: Implement a splash screen using `expo-splash-screen` to keep it visible until fonts are ready.

## Security Considerations

**Mock Authentication:**
- Risk: No real authentication; login is bypassed by just providing an email.
- Current mitigation: None (Prototype phase).
- Recommendations: Integrate Firebase Auth or a similar provider before production.

## Performance Bottlenecks

**Large Image Assets:**
- Problem: Large PNG files for icons/images in `src/`.
- Impact: Increased bundle size and initial memory footprint.
- Improvement path: Convert PNGs to WebP or SVG where possible.

## Fragile Areas

**Navigation State:**
- File: `App.tsx`
- Why fragile: Simple string-based state (`ViewKey`) makes it easy to introduce invalid transitions.
- Safe modification: Use a dedicated navigation library like `React Navigation` or `Expo Router`.

## Test Coverage Gaps

**Critical Business Logic:**
- What's not tested: OTP verification, profile updating, and dashboard navigation.
- Priority: High
- Difficulty to test: Requires setting up a test runner (Jest) for React Native.

---

*Concerns audit: 2026-04-25*
*Update as issues are fixed or new ones discovered*
