# Tamp — Product Specification

> A gamified, social learning platform for coffee craft. From pressurised baskets to swan latte art.

---

## Overview

**Tamp** is a React Native mobile app for coffee enthusiasts at every level. It combines an interactive coffee encyclopedia, POV-style animated brewing guides, a personal attempt tracker, and a social feed — all wrapped in a warm specialty-cafe aesthetic with a progression system that takes you from total beginner to competition-ready barista.

---

## Design Language

**Aesthetic:** Warm specialty coffee shop — rustic timber, Edison bulbs, cream walls. Tactile, rich, and crafted. Not sterile, not minimal.

### Colour Palette

| Name | Hex | Use |
|---|---|---|
| Background | `#FAF6F0` | App background |
| Surface | `#F0E8DC` | Cards, sheets |
| Espresso | `#3B1F0E` | Primary text, strong accents |
| Crema | `#C8956C` | Primary action colour, highlights |
| Milk | `#EDE0C8` | Subtle fills, dividers |
| Text Primary | `#1C1009` | Body copy |
| Text Secondary | `#7A5C44` | Labels, captions |

### Typography

| Role | Font |
|---|---|
| Display / Headings | Playfair Display (serif) |
| Body | DM Sans (humanist sans) |
| Specs / Numbers | DM Mono (monospace) |

### Motion

Warm, slightly unhurried easing curves — nothing snappy or clinical. Feels like a smooth espresso pull, not a productivity app.

---

## Progression System — Barista Ranks

Users earn XP by completing drink modules, uploading attempts, scoring others, and maintaining streaks. XP unlocks the next rank and deeper content.

| Rank | Title | Description |
|---|---|---|
| 0 | Home Brewer | Just getting started, probably using a pressurised basket |
| 1 | Enthusiast | Knows the basics, experimenting with grind and dose |
| 2 | Amateur Barista | Pulling decent shots, starting milk work |
| 3 | Barista | Consistent extractions, developing latte art |
| 4 | Head Barista | Dialling workflow, competition-aware |
| 5 | Champion | Mastery-level — latte art, competition prep, advanced technique |

**XP Sources:**
- Completing a drink module → 50 XP
- Logging an attempt → 20 XP
- Receiving a community score → 10 XP
- Scoring someone else's attempt → 5 XP
- Daily streak → 15 XP/day

---

## Core Features

### 1. Coffee Encyclopedia

A browsable library of every espresso and milk-based drink.

Each drink has:
- **Description** — what it is, where it comes from, what makes it distinct
- **Spec card** — ratios, temperatures, extraction time, milk texture, cup size (shareable image)
- **Difficulty badge** — aligned to Barista Rank required
- **"Watch" button** — plays the standard animated walkthrough
- **"Interactive Mode" button** — full interactive workflow (see below)
- **"Log Attempt" button** — opens the attempt logger for this drink
- **Past Attempts** — your own attempt history for this drink

**Drinks for v1 (15 core):**
Espresso, Ristretto, Lungo, Americano, Flat White, Cappuccino, Latte, Cortado, Macchiato (espresso & latte), Piccolo, Gibraltar, Cold Brew, Batch Brew Filter, Pour Over

---

### 2. Interactive Animated Workflow

The signature feature of Tamp. Each drink has a full-screen, POV-style animated illustration of the entire make process.

**How it works:**
- 2D illustrated style — warm, artisan aesthetic matching the app
- Plays through the full process step by step (e.g. dose → distribute → tamp → lock in → pull → steam milk → pour)
- User can pause at any point
- **Tappable hotspots** appear on relevant elements throughout the animation:
  - Tap the portafilter → explanation of naked vs pressurised, basket types
  - Tap the puck → why distribution matters, WDT tools
  - Tap the espresso stream → what good vs bad extraction looks like
  - Tap the milk jug → texture targets for different drinks, temperature
- **Spec overlay** — persistent HUD showing live stats (dose, yield, time, temp) that update as the animation progresses
- **Step scrubber** — timeline at the bottom showing steps; tap to jump to any step
- **Deep dive cards** — some hotspots open a full bottom sheet with diagrams, tips, and common mistakes

**v1 Interactive Workflows (5 drinks):**
Espresso, Flat White, Cappuccino, Latte, Cortado

---

### 3. Attempt Tracker

Users log their real-world attempts at making each drink.

**Logging an attempt:**
- Select drink (or auto-selected from drink detail page)
- Upload 1–3 photos:
  - Top-down (crema, latte art, puck shot)
  - Side shot (foam ratio, layers, glass)
- Add optional notes: grind setting, dose, yield, observations, what went wrong
- Mark as public (posted to feed) or private (personal log only)
- Date/time auto-captured

**Viewing attempts:**
- Chronological grid per drink — see improvement over time
- Each attempt shows photo(s), notes, community score received, date
- Compare two attempts side by side (future)

---

### 4. Community Scoring

A peer-review system for public attempts.

**How it works:**
- When viewing someone's public attempt, tap "Score this"
- Presented with 3–5 criteria cards relevant to the drink (e.g. for a flat white: Crema Colour, Milk Texture, Pour Symmetry, Ratio Accuracy)
- Each criterion rated 1–5 with brief descriptor labels
- Submit → attempt receives aggregate score
- Scorer earns XP; submitter earns XP

**Score display:**
- Average score shown as a badge on the attempt card
- Breakdown visible on full attempt view
- Running average across all attempts contributes to profile stats

---

### 5. Social Feed (Core Tab)

The home tab. Opens on app launch.

**Main Feed:**
- Attempts from users you follow
- Card format: photo(s), drink name, user + rank badge, community score, like + comment count
- Tap card → full attempt view with scoring option
- Like and comment

**Discover Tab (within Feed):**
- Top-rated attempts globally this week
- Filter by drink type
- Find new people to follow

**Follow system:**
- Follow / unfollow any public account
- Follower / following count on profiles
- No mutual-follow requirement (asymmetric, like Instagram)

---

### 6. Profile & Progression

**Your profile shows:**
- Avatar + display name
- Current rank title + badge
- XP progress bar to next rank
- Key stats: total attempts, drinks completed, avg community score
- Attempt grid — all public attempts in chronological order
- Followers / following

**Public vs Private:**
- Public — anyone can see your profile and attempts, follow you
- Private — only approved followers see your content
- Toggle in settings

---

## App Navigation

Bottom tab bar with 4 tabs:

| Tab | Icon | Purpose |
|---|---|---|
| **Feed** | Home | Social feed of attempts from followed users |
| **Explore** | Grid | Browse the coffee encyclopedia |
| **Log** | Camera | Quick-launch attempt logger (centre action button) |
| **Profile** | Person | Your profile, rank, attempt history, settings |

---

## Key Screens

| Screen | Description |
|---|---|
| Feed | Attempt cards — photo, drink, user, score, like/comment |
| Explore | Drink grid, filterable by type and difficulty |
| Drink Detail | Spec card, Watch, Interactive Mode, Log Attempt, attempt history |
| Interactive Mode | Full-screen animation, hotspots, step scrubber, spec HUD |
| Log Attempt | Photo upload, notes, public/private, drink selection |
| Attempt View | Full attempt, photos, notes, community score breakdown, comments |
| Profile | Rank badge, XP bar, attempt grid, stats, follow info |
| Onboarding | Name, rank self-assessment, follow suggestions |

---

## Tech Stack

### Monorepo Structure

```
/apps/mobile          ← Expo (React Native)
/apps/api             ← NestJS
/packages/types       ← Shared TypeScript types / DTOs
/prisma               ← Schema + migrations (incl. Better Auth tables)
```

### Layers

| Layer | Choice | Rationale |
|---|---|---|
| Mobile | React Native (Expo) | Cross-platform, fast iteration |
| Navigation | Expo Router | File-based routing, well-supported |
| State management | Zustand | Lightweight, no boilerplate |
| API | NestJS | Structured, scalable, TypeScript-first |
| ORM | Prisma | Schema-driven, excellent DX, migration tooling |
| Database | PostgreSQL | Relational, robust, fits social + structured data |
| Auth | Better Auth + Prisma adapter | Session tokens, auth tables in same schema |
| Media storage | Azure Blob Storage | Photo uploads; Azurite for local dev |
| Feed updates | Polling (pull-to-refresh) | Simple, sufficient for v1 |
| Linting / Formatting | Biome | Fast, unified linter + formatter, replaces ESLint + Prettier |
| Animations | Reanimated 3 + Skia | POV workflow animations, smooth gestures |
| Image handling | Expo Image | Optimised loading, caching |
| AI scoring (future) | Anthropic API — claude-sonnet-4-6 | Photo analysis, attempt scoring |

---

## MVP Scope

### In for v1

- Onboarding + account creation
- Coffee encyclopedia — 15 drinks
- Interactive animated workflow — 5 core drinks
- Attempt logger with photo upload
- Community scoring
- Social feed with follow system
- Public / private profiles
- Barista rank + XP system
- Like + comment on attempts

### Out for v1 (future phases)

- AI photo scoring (Anthropic API)
- Push notifications
- In-app messaging / DMs
- Search by username or drink
- Side-by-side attempt comparison
- Video content
- Bean / equipment tracking
- Competition prep modules
- Badges / achievements beyond rank

---

## Build Order

1. Project scaffold — Expo + Supabase + navigation structure
2. Design system — tokens, typography, base components
3. Coffee data model + encyclopedia screens (Explore tab)
4. Attempt logger + photo upload + Supabase storage
5. Interactive animated workflow (espresso first)
6. XP + rank system
7. Social feed + follow system
8. Community scoring
9. Profile screens
10. Onboarding flow
11. Polish, transitions, empty states
