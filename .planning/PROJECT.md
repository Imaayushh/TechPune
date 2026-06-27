# TechPune Mobile App

**A student opportunity hub** — connecting students with hackathons, courses, news, and career resources.

## Tech Stack

- **Runtime:** React Native 0.83.6 / Expo 55.0.17
- **UI:** React 19.2.0, React Navigation (Native Stack + Bottom Tabs)
- **State:** React Context
- **Fonts:** ClashDisplay-Bold (headlines), CabinetGrotesk (subheadings), Inter (body)
- **Icons:** Custom Heroicon SVG component (Heroicon.tsx)
- **Design System:** "The Curated Journal" — monochrome palette, tonal layering, no-line rule

## App Structure

- `App.tsx` — Root component with navigation stack, font loading, providers
- `src/navigation/MainTabs.tsx` — Bottom tab navigator (Dashboard, Hackathons, News, Courses)
- `src/pages/` — Screen components
- `src/components/` — Reusable UI (PageHeader, Card, Badge, DetailOverlay, etc.)
- `src/context/AppContext.tsx` — Global user state
- `src/Heroicon.tsx` — Centralized SVG icon system

## Milestone: v1.0

Current focus: Polish existing features and ensure consistent design language across all screens.
