# Architecture

**Analysis Date:** 2026-04-25

## Pattern Overview

**Overall:** Monolithic React Native (Expo) Application

**Key Characteristics:**
- **State-Driven Navigation:** View switching handled by `view` state in `App.tsx` (`login` | `dashboard` | `profile`).
- **Design System Centric:** Heavy reliance on `DESIGN.md` specifications for UI components.
- **Component-Based UI:** Modular components for pages and UI elements in `src/`.

## Layers

**View Layer:**
- Purpose: Application entry and top-level navigation
- Contains: `App.tsx`
- Depends on: Page components, Safe Area context
- Used by: React Native entry point

**Page Layer:**
- Purpose: Functional screens of the application
- Contains: `Dashboard.tsx`, `LoginPage.tsx`, `ProfilePage.tsx`, `OtpPage.tsx`
- Depends on: UI Components, Assets
- Used by: `App.tsx`

**Component Layer:**
- Purpose: Reusable UI elements
- Contains: `Heroicon.tsx`, `Hamburger.tsx`
- Depends on: `react-native-svg`, `expo-blur`
- Used by: Pages and App

**Asset Layer:**
- Purpose: Static resources and styling tokens
- Contains: `src/assets/fonts/`, `DESIGN.md` (specs)
- Depends on: None
- Used by: Components and Pages

## Data Flow

**View Transition Flow:**

1. User interacts with a CTA (e.g., "Sign In" in `LoginPage`).
2. Event handler callback invoked (passed down from `App.tsx`).
3. `setView()` state updated in `App.tsx`.
4. Conditional rendering logic in `App.tsx` switches the visible page component.
5. `SafeAreaProvider` ensures proper layout across renders.

**State Management:**
- **Centralized Prop Drilling:** User profile data (email, username) is held in `App.tsx` and drilled down to `Dashboard` and `ProfilePage`.
- **Local Component State:** Each page manages its own UI state (e.g., input values in `LoginPage`).

## Key Abstractions

**Navigation State:**
- Purpose: Simple view router
- Location: `App.tsx` (type `ViewKey`)
- Pattern: Conditional rendering based on string literal state.

**Heroicon:**
- Purpose: Centralized SVG icon provider
- Location: `src/Heroicon.tsx`
- Pattern: Dictionary-based path lookup with name-based variant switching (`-solid`).

**Style Objects:**
- Purpose: Themed UI styling
- Pattern: `StyleSheet.create` following the "Curated Journal" aesthetic defined in `DESIGN.md`.

## Entry Points

**Application Entry:**
- Location: `index.js` / `App.tsx`
- Triggers: App launch
- Responsibilities: Load fonts, provide `SafeAreaProvider`, manage top-level navigation.

## Error Handling

**Strategy:** Inline validation and silent failure (standard for UI-focused apps).

**Patterns:**
- **Font Loading Guard:** `App.tsx` returns `null` if fonts aren't loaded.
- **Icon Fallback:** `Heroicon.tsx` logs a warning if an icon name is not found.

## Cross-Cutting Concerns

**Styling:**
- Approach: Vanilla React Native `StyleSheet` following `DESIGN.md` tokens.
- Patterns: Background-based sectioning (no borders), linear gradients, blur effects.

**Typography:**
- Approach: Custom font loading via `expo-font` and `@expo-google-fonts/inter`.
- Usage: `ClashDisplay-Bold` for headers, `Inter` for body.

---

*Architecture analysis: 2026-04-25*
*Update when major patterns change*
