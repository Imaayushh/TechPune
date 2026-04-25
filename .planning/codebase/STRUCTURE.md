# Codebase Structure

**Analysis Date:** 2026-04-25

## Directory Layout

```
mobile-app/
├── .expo/              # Expo configuration and cache (ignored)
├── android/            # Native Android project files
├── assets/             # Global static assets (icons, splash)
├── src/                # Main application source
│   ├── assets/         # Source-specific assets
│   │   └── fonts/      # Custom TTF fonts
│   ├── Dashboard.tsx   # Dashboard screen
│   ├── LoginPage.tsx   # Login screen
│   ├── ProfilePage.tsx # Profile management screen
│   ├── OtpPage.tsx     # OTP verification screen
│   ├── Heroicon.tsx    # SVG Icon component
│   └── Hamburger.tsx   # Side menu component
├── App.tsx             # Root component and router
├── app.json            # Expo manifest
├── package.json        # Dependencies and scripts
└── DESIGN.md           # Design system specification
```

## Directory Purposes

**src/**
- Purpose: Application logic and UI components
- Contains: `*.tsx` components, sub-assets
- Key files: `Dashboard.tsx`, `Heroicon.tsx`

**src/assets/fonts/**
- Purpose: Typography resources
- Contains: `*.ttf` files
- Key files: `ClashDisplay-Bold.ttf`, `CabinetGrotesk-Medium.ttf`

**assets/**
- Purpose: Native app resources
- Contains: `icon.png`, `splash.png`

**android/**
- Purpose: Android native project structure
- Contains: Gradle files, native Java/Kotlin code

## Key File Locations

**Entry Points:**
- `index.js`: Expo entry point (registers root component)
- `App.tsx`: Main React component and state orchestrator

**Configuration:**
- `app.json`: Expo manifest (app name, version, slug, icon)
- `package.json`: Dependency management and npm scripts
- `tsconfig.json`: TypeScript compiler settings

**Core Logic:**
- `src/LoginPage.tsx`: Authentication UI
- `src/Dashboard.tsx`: Main activity hub
- `src/ProfilePage.tsx`: User data management

**Documentation:**
- `DESIGN.md`: Detailed design system tokens and rules
- `README.md`: Basic project information

## Naming Conventions

**Files:**
- `PascalCase.tsx`: For React components (e.g., `ProfilePage.tsx`)
- `kebab-case.js`: For scripts (if any)
- `UPPERCASE.md`: Documentation (e.g., `DESIGN.md`)

**Directories:**
- `kebab-case`: Feature and resource directories (e.g., `assets/fonts/`)

**Special Patterns:**
- `Heroicon.tsx`: Centralized component for multiple SVGs

## Where to Add New Code

**New Screen/Page:**
- Implementation: `src/{PageName}.tsx`
- Navigation: Add case in `App.tsx` router logic

**New Component:**
- Implementation: `src/components/` (suggested for future modularity, currently flat in `src/`)

**New Font:**
- Location: `src/assets/fonts/`
- Loading: Update `useFonts` hook in `App.tsx`

**New Icon:**
- Location: Add path entry to `icons` dictionary in `src/Heroicon.tsx`

## Special Directories

**.expo/**
- Purpose: Managed by Expo CLI
- Committed: No (in `.gitignore`)

**node_modules/**
- Purpose: Dependencies
- Committed: No

---

*Structure analysis: 2026-04-25*
*Update when directory structure changes*
