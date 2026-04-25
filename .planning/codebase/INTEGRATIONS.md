# External Integrations

**Analysis Date:** 2026-04-25

## APIs & External Services

**Fonts:**
- Google Fonts (Inter) - via `@expo-google-fonts/inter`
- Custom Fonts - Local TTF files in `src/assets/fonts/` (Clash Display, Cabinet Grotesk)

**Icons:**
- Heroicons (Custom Implementation) - SVG paths mapped in `src/Heroicon.tsx`

## Data Storage

**Local State:**
- React `useState` - Used for navigation and user data in `App.tsx`
- No persistent local storage (AsyncStorage/SQLite) detected yet.

## Authentication & Identity

**Current Implementation:**
- Mock Sign-In - Local state in `App.tsx` handles email capture and navigation to dashboard.
- No external auth provider (Firebase/Supabase/Auth0) integrated in the current codebase.

## Monitoring & Observability

**Logs:**
- `console.log` / `console.warn` - Standard React Native logging
- No external crash reporting (Sentry/Bugsnag) detected.

## CI/CD & Deployment

**Hosting & Build:**
- Expo EAS (implied by `app.json` and Expo 55)
- Android builds configured in `app.json` (`com.techpune.mobileapp`)

## Environment Configuration

**Development:**
- Expo Go / Development Builds
- Local Metro bundler

## Webhooks & Callbacks

**Incoming:**
- None detected.

**Outgoing:**
- None detected.

---

*Integration audit: 2026-04-25*
*Update when adding/removing external services*
