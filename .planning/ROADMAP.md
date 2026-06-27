# Roadmap

## Milestone: v1.0

**Theme:** Polish & Design Consistency

---

## Phase 1: News Re-theming

**Goal:** Re-theme the News screen to match the "Curated Journal" design system used by the rest of the app.

**Requirements:**
- NEWS-01: News screen uses app's light theme (background #fcfcfc, primary #1a1c1c, surface tokens)
- NEWS-02: Typography follows DESIGN.md spec (ClashDisplay-Bold headlines, CabinetGrotesk subheadings, Inter body)
- NEWS-03: Cards use tonal layering (no borders, background-based sectioning)
- NEWS-04: Navigation and page chrome matches other tabs (PageHeader, tab bar, safe area)
- NEWS-05: Story card layout preserves vertical paging UX but styled per "Curated Journal"
- NEWS-06: Detail overlay matches app's DetailOverlay component patterns
- NEWS-07: HN-specific branding (orange accents, YC label) replaced with app-native styling
- NEWS-08: All existing Hacker News API integration and story fetching preserved

**Plans:** 1 plan ✓

Plans:
- [X] 01-01-PLAN.md — Re-theme News.tsx to match app design system

---

## Future Phases (TBD)

- Phase 2: Backend integration (Supabase)
- Phase 3: Real authentication
- Phase 4: Push notifications
- Phase 5: Offline support
