# Coding Conventions

**Analysis Date:** 2026-04-25

## Naming Patterns

**Files:**
- `PascalCase.tsx` for all React Native components in `src/`
- `kebab-case.js` for configuration and scripts in root
- `assets/` for static resources

**Functions:**
- `camelCase` for internal component functions
- `handleActionName` for event handlers (e.g., `handleSignIn`, `onMenuClick`)
- Functional components used exclusively (`export default function ComponentName`)

**Variables:**
- `camelCase` for local variables and props
- `UPPER_SNAKE_CASE` for constants (none widespread yet)
- Destructured props in function signature: `function Component({ prop1, prop2 }: Props)`

**Types:**
- `PascalCase` for type aliases and interfaces
- Suffix `Props` for component property types (e.g., `DashboardProps`)

## Code Style

**Formatting:**
- 2 space indentation (standard for React/TS)
- Semicolons used
- Single quotes preferred for simple strings, double quotes for JSX attributes

**Components:**
- Inline styles using `StyleSheet.create` at the bottom of the file
- Component-specific types defined above the function
- Use of `SafeAreaView` from `react-native-safe-area-context` for layout roots

## Import Organization

**Order:**
1. React and React Native built-ins
2. Third-party packages (Expo, SVG, etc.)
3. Internal components (`./Component`)
4. Types and assets

**Grouping:**
- Blank lines between external and internal imports

## Error Handling

**Patterns:**
- Silent fallback for missing assets (e.g., fonts not loaded -> return null)
- Console warnings for missing configuration (e.g., unknown icon name)
- Prop-based error state passing (e.g., `error` state in `LoginPage`)

## Logging

**Framework:**
- `console.log` for debugging
- `console.warn` for component configuration issues

## Comments

**When to Comment:**
- Section headers in large components (e.g., `{/* Header */}` in `Dashboard.tsx`)
- Documentation of design system compliance when non-obvious

## Function Design

**Size:**
- Components are relatively large (400+ lines in `Dashboard.tsx`) due to extensive inline `StyleSheet` objects
- Suggested pattern: Move complex styles to a separate theme or file if they exceed 100 lines

**Parameters:**
- Prop objects for all component configurations
- Callback functions prefixed with `on` (e.g., `onLogout`)

## Module Design

**Exports:**
- `export default function` for pages and main components
- `export const` for shared utility components or types

---

*Convention analysis: 2026-04-25*
*Update when patterns change*
