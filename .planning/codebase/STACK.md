# Technology Stack

**Analysis Date:** 2026-04-25

## Languages

**Primary:**
- TypeScript 5.9.x - All application code in `src/` and `App.tsx`

**Secondary:**
- JavaScript - Build scripts (`index.js`), configuration files

## Runtime

**Environment:**
- Node.js (via Expo/Metro)
- React Native 0.83.6
- Expo 55.0.17

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 19.2.0 - UI framework
- React Native 0.83.6 - Mobile framework
- Expo 55.0.17 - Development platform and SDK

**Testing:**
- None detected (no `jest` or `vitest` in `package.json`)

**Build/Dev:**
- Metro - Bundler for React Native
- Expo CLI - Development and build tooling
- TypeScript - Type checking

## Key Dependencies

**Critical:**
- `react-native-safe-area-context` ~5.6.0 - Safe area management
- `expo-font` ~55.0.6 - Custom font loading
- `expo-linear-gradient` ~55.0.13 - Gradient UI elements
- `react-native-svg` ^15.15.4 - SVG icon support (`Heroicon.tsx`)
- `expo-blur` ~55.0.14 - Blur effects (`BlurView`)

**Infrastructure:**
- `@expo/metro-runtime` ~55.0.10 - Metro integration
- `expo-status-bar` ~55.0.5 - System status bar control

## Configuration

**Environment:**
- Configuration via `app.json` (Expo manifest)

**Build:**
- `tsconfig.json` - TypeScript compiler options
- `app.json` - Expo project configuration

## Platform Requirements

**Development:**
- any platform (Windows/macOS/Linux) with Node.js and Expo CLI
- Android Studio / Xcode for native builds (EAS or local)

**Production:**
- Android (package: `com.techpune.mobileapp`)
- iOS (supports tablet)
- Web (via `react-native-web`)

---

*Stack analysis: 2026-04-25*
*Update after major dependency changes*
