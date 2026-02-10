# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pevent is an event management and ticketing mobile app built with Expo (v54), React Native (0.81), and TypeScript (strict mode). Users can discover events, purchase tickets via Paystack, participate in voting, and manage passes.

## Commands

```bash
npx expo start          # Start dev server
npx expo run:ios        # Run on iOS
npx expo run:android    # Run on Android
npx expo prebuild       # Generate native projects

# Linting & formatting
npm run lint            # ESLint + Prettier check
npm run format          # Auto-fix lint + format issues
```

## Architecture

### Routing (Expo Router v6 - file-based)

- `app/_layout.tsx` — Root layout with all providers (QueryClient, Session, Paystack) and route guards via `Stack.Protected`
- `app/(onboarding)/` — Auth screens (login, register, reset-password)
- `app/(secured)/` — Protected routes, requires session token
  - `(main)/` — Tab navigator (home, search, passes, profile)
  - `(event)/[slug]/` — Dynamic event detail page
  - `ticket/[id].tsx` — Dynamic ticket detail page
  - `settings/` — User settings (wallet, security, profile-details, etc.)

Route protection uses `Stack.Protected` guards checking `!!session` from SessionProvider context.

### State Management

- **Zustand** (`store/user-store.ts`) — Global user state (user profile, auth status, loading)
- **React Query** (`hooks/query/`) — Server state with cache. Query hooks: `useAuth`, `useEvent`, `useTicket`
- **React Context** (`Provider/session-provider.tsx`) — Auth session with secure token storage

### API Layer

- **Axios client** (`constants/axios.ts`) — Base URL `http://localhost:3000/api`, request interceptor adds Bearer token from SecureStore, response interceptor handles 401 by clearing session
- **Endpoints** (`constants/endpoints.ts`) — Centralized route definitions
- **Actions** (`actions/`) — Typed API call functions (auth, event, user, ticket)
- **Query hooks** (`hooks/query/`) — React Query wrappers around actions

Response types follow `ResponseType<T>` and `ResponseWithMeta<T>` patterns defined in `types/`.

### Styling

NativeWind (Tailwind CSS for React Native). Config in `tailwind.config.js`, global CSS in `global.css`. Theme colors/fonts in `constants/theme.ts`. Primary color: `#004cffff`.

### Forms

React Hook Form + Zod for validation. Custom `<Input>` and `<Button>` UI components in `components/ui/`.

### Authentication Flow

Token stored in `expo-secure-store` (native) / `localStorage` (web) via `hooks/use-storage-state.ts`. SessionProvider exposes `signIn(token)` / `signOut()`. Axios interceptor auto-attaches token and redirects on 401.

## Key Conventions

- Path alias: `@/*` maps to project root (configured in `tsconfig.json`)
- Types for all backend models live in `types/` (User, Event, Ticket, Transaction, Voting, etc.)
- Feature components organized by domain: `components/home/`, `components/event/`, `components/passes/`, `components/search/`
- Prettier config: 100 char width, single quotes, tailwindcss plugin for class sorting
- Babel plugins: `nativewind/babel` preset, `react-native-worklets/plugin`
- `laravel/` directory contains PHP reference files for the backend API (not part of the RN build)
