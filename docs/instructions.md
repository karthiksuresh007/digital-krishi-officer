# Digital Krishi Officer – Developer Collaboration Guide

> **Version:** 1.0  
> **Audience:** All contributors to the DKO monorepo  
> **Status:** Active — follow this guide for every task

---

## 1. Project Overview

Digital Krishi Officer (DKO) is a mobile-first agricultural advisory platform that allows farmers to submit queries via text, voice, or image and receive AI-generated responses in local language with audio playback. When the AI cannot confidently answer a query, it is automatically escalated to a human agricultural officer who reviews it through a web dashboard.

The repository contains the full product: a Progressive Web App for farmers, an Officer Dashboard for review and escalation management, a Node.js REST API, and the Firebase backend. All code for every layer lives in this single monorepo.

Architecture at a glance:

- **Farmer PWA** (Next.js) — mobile-optimised interface for query submission and response viewing
- **Officer Dashboard** (Next.js) — desktop web UI for escalation management and analytics
- **Backend API** (Express) — REST layer handling auth, queries, AI orchestration, and escalations
- **AI Services** — OpenAI GPT-4, Whisper, Plant.id, Google Cloud TTS, coordinated by the backend
- **Firebase** — Authentication, Firestore database, Cloud Storage, and Cloud Messaging

---

## 2. Repository Structure

```
dko/
├── app/          → Next.js 14 application (Farmer PWA + Officer Dashboard)
├── backend/      → Node.js / Express REST API
├── shared/       → Shared TypeScript interfaces
└── docs/         → PRD, roadmap (todo.md), and this guide
```

### `app/`
All frontend code lives here. Contains the Next.js App Router pages for `/farmer/*` and `/dashboard/*`, Tailwind CSS configuration, the centralised API client (`lib/apiClient.ts`), and the offline queue (`lib/offlineQueue.ts`).

### `backend/`
All server-side code lives here. Contains Express route handlers, middleware (auth, validation, error handling), AI service modules, Firebase Admin SDK integration, and the seed data script.

### `shared/`
Contains only TypeScript interfaces shared between `app/` and `backend/`. The canonical source of truth for data shapes.

```
shared/types/index.ts  → User, Query, Response, Escalation, Feedback
```

### `docs/`
Project documentation. Contains the PRD, `todo.md` roadmap, and this file. No source code belongs here.

### Folder rules

- Frontend code must remain inside `app/`. Do not create API routes or server logic here.
- Backend API code must remain inside `backend/`. Do not import from `app/`.
- Shared interfaces must be defined **only** inside `shared/types`. Do not duplicate type definitions in `app/` or `backend/`.
- Do not create top-level directories without team discussion.

---

## 3. Team Responsibilities

### Developer A — Backend Lead

Primary owner of:

- REST API endpoints (`backend/routes/`, `backend/controllers/`)
- AI service integrations: GPT-4, Whisper, Plant.id, Google Cloud TTS (`backend/services/`)
- Firebase Admin SDK: Firestore schema, security rules, Cloud Storage, FCM
- Database seed script and migrations
- Escalation creation and resolution logic
- Analytics aggregation endpoints

### Developer B — Frontend Lead

Primary owner of:

- Farmer PWA screens (`app/app/farmer/`)
- Officer Dashboard screens (`app/app/dashboard/`)
- Reusable UI components (`app/components/`)
- Centralised API client and offline queue (`app/lib/`)
- FCM token registration and notification permission UI
- Loading skeletons, empty states, and error boundaries

### Shared Responsibilities

Both developers must collaborate closely on the following integration points. Before starting any of these tasks, discuss the contract (request shape, response shape, error codes) and agree on it before either developer writes code.

| Integration Point | Developer A delivers | Developer B consumes |
|---|---|---|
| Query submission API | `POST /api/queries` | Farmer query screens |
| AI response display | `{ content, audioUrl, confidence }` in response | Response display screen |
| Escalation lifecycle | `GET/PUT/POST /api/escalations/*` | Dashboard queue and detail screens |
| Analytics endpoints | `GET /api/analytics/*` | Analytics dashboard screen |
| Push notifications | FCM utility + `/api/users/fcm-token` | Permission request + token registration |

---

## 4. Git Workflow

Every unit of work — no matter how small — follows this sequence without exception:

```
GitHub Issue
    ↓
Create feature branch from main
    ↓
Make commits on that branch
    ↓
Push branch to origin
    ↓
Open Pull Request → link to Issue
    ↓
Other developer reviews
    ↓
Merge to main (squash merge)
```

### Branch naming

```
feature/<short-descriptive-name>
```

Examples:

```
feature/farmer-login
feature/query-api
feature/gpt-query-service
feature/escalation-queue-screen
feature/dashboard-analytics
feature/offline-queue
```

Keep names lowercase with hyphens. No spaces, underscores, or uppercase letters.

### Creating a branch

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### Core rules

- **Never commit directly to `main`.** Branch protection is enforced — direct pushes will be rejected.
- **Every feature must have a GitHub Issue** opened before work begins. Reference the issue number in the PR.
- **Every feature must go through a Pull Request.** No exceptions, even for small fixes.
- **Pull from `main` frequently** (at least daily) to keep your branch current and avoid large merge conflicts.

---

## 5. Pull Request Rules

A Pull Request must be small and focused on a single task. A PR that implements an entire phase is too large. Target one GitHub issue per PR.

### PR checklist

Before opening a PR, verify all of the following:

- [ ] Linked to a GitHub Issue (`Closes #<issue-number>` in the PR description)
- [ ] Branch is up to date with `main` (`git pull origin main`)
- [ ] TypeScript compiles with no errors (`tsc --noEmit`)
- [ ] ESLint passes with no errors (`npm run lint`)
- [ ] No `console.log` statements left in production code
- [ ] No hardcoded secrets, API keys, or credentials anywhere in the diff
- [ ] Loading and error states are handled for any new UI screens
- [ ] New API endpoints follow the standard response format

### PR description template

```
## What this PR does
Short description of the change.

## Issue
Closes #<issue-number>

## Testing done
- [ ] Tested locally
- [ ] Verified no TypeScript errors
- [ ] Verified no ESLint errors
```

### Review expectations

The other developer must review and approve before merge. Reviews should focus on correctness, adherence to this guide, and potential integration issues — not stylistic preference.

---

## 6. Commit Message Guidelines

Use the following format for every commit:

```
<type>: <short imperative description>
```

Types:

| Type | When to use |
|---|---|
| `feat` | Adding a new feature or screen |
| `fix` | Fixing a bug |
| `refactor` | Restructuring code without changing behaviour |
| `docs` | Updating documentation |
| `chore` | Tooling, config, dependency updates |
| `style` | CSS / Tailwind changes with no logic change |

Examples of good commit messages:

```
feat: add farmer voice recording screen
fix: resolve JWT expiry on login redirect
refactor: extract text query logic into textQueryService
docs: update API response format in instructions
chore: add eslint rule for no-console
```

Examples of messages that are **not acceptable**:

```
update code
fix stuff
changes
wip
asdf
```

A commit message should be readable by a teammate and make sense without context.

---

## 7. Coding Guidelines

### Frontend (`app/`)

- Use **functional components** with hooks only. No class components.
- Keep components **small and single-purpose**. If a component exceeds ~150 lines, split it.
- Create reusable components in `app/components/` rather than duplicating JSX across pages.
- All API calls must go through `lib/apiClient.ts`. Do not use `fetch` directly in page components.
- Every screen that makes an API call must handle three states: **loading** (skeleton), **success** (data), and **error** (error banner or toast).
- Use Tailwind utility classes only. Do not write custom CSS unless absolutely necessary.
- Never store sensitive data in component state — use `localStorage` only for the JWT token.

### Backend (`backend/`)

- **Validate all inputs** at the route level using `express-validator` before they reach the controller.
- Keep controllers thin. Move business logic into service files (`backend/services/`).
- Never trust client-supplied data. Sanitise and validate every field.
- All service functions must handle errors explicitly and return a result object rather than throwing unhandled exceptions into the controller.
- Use the standard API response format (see Section 8) on every endpoint without exception.
- Log meaningful events: request received, AI service called, duration, success or failure. Do not log raw user data.

### Shared (`shared/`)

- Interfaces must be **pure TypeScript types** only — no runtime logic, no imports from `app/` or `backend/`.
- When you need to change a shared interface, notify the other developer first. A change here affects both sides simultaneously.

---

## 8. API Design Rules

Every API endpoint must return one of these two shapes and nothing else.

**Success response:**

```json
{
  "success": true,
  "data": { }
}
```

**Error response:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Phone number is required"
  }
}
```

### Error code conventions

| Code | Meaning |
|---|---|
| `VALIDATION_ERROR` | Request body or params failed validation |
| `UNAUTHORIZED` | Missing or invalid JWT |
| `FORBIDDEN` | Valid JWT but insufficient role |
| `NOT_FOUND` | Requested resource does not exist |
| `CONFLICT` | Resource state conflict (e.g. already assigned) |
| `AI_SERVICE_ERROR` | Upstream AI API failed |
| `INTERNAL_ERROR` | Unexpected server error |

Developer B must rely on these codes in `apiClient.ts` to display appropriate error messages. Do not invent new codes without updating this table and notifying Developer B.

---

## 9. Important Safety Rules

These rules exist to prevent irreversible damage to the codebase or database.

- **Never push secrets to GitHub.** API keys, JWT secrets, Firebase credentials, and any value from a `.env` file must never appear in any committed file. If a secret is accidentally pushed, rotate it immediately.
- **Never modify shared interfaces without discussion.** Changing `shared/types/index.ts` is a breaking change for both `app/` and `backend/`. Agree on the change, update both sides in the same PR.
- **Never change Firestore collection names or document field names** without a migration plan documented in `docs/`. The seed script and security rules must be updated atomically.
- **Never delete an existing API endpoint** that the frontend is actively calling without first coordinating with Developer B and shipping the frontend change in the same release.
- **Never force-push to `main`** under any circumstances.
- **Always test locally before pushing.** A broken `main` branch blocks both developers.

---

## 10. Environment Variables

Each application has its own `.env` file for local development:

```
backend/.env          → server secrets (never committed)
app/.env.local        → frontend public config (never committed)
```

Template files (safe to commit, no real values):

```
backend/.env.example
app/.env.local.example
```

### Rules

- `.env` and `.env.local` are in `.gitignore` and must **never be committed**.
- Only `.env.example` files exist in Git. They contain placeholder values and comments.
- When a new environment variable is added, update the `.example` file and notify the other developer.
- The backend validates all required environment variables on startup using `envalid`. If a variable is missing, the server will exit with a descriptive error rather than fail silently at runtime.

### Key variables reference

| Variable | Used by | Description |
|---|---|---|
| `JWT_SECRET` | Backend | Signs and verifies JWTs |
| `OPENAI_API_KEY` | Backend | GPT-4 and Whisper API access |
| `PLANTID_API_KEY` | Backend | Plant.id disease detection |
| `GOOGLE_APPLICATION_CREDENTIALS` | Backend | Path to Firebase service account JSON |
| `NEXT_PUBLIC_API_URL` | Frontend | Base URL of the Express API |
| `NEXT_PUBLIC_FIREBASE_*` | Frontend | Firebase client SDK config |

---

## 11. Local Development Setup

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A Firebase project configured (see Phase 1 of `docs/todo.md`)
- API keys for OpenAI, Plant.id, and Google Cloud TTS

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in all values in .env
npm run dev
# Server available at http://localhost:4000
# Verify: GET http://localhost:4000/health → { "status": "ok" }
```

### Frontend

```bash
cd app
npm install
cp .env.local.example .env.local
# Fill in all NEXT_PUBLIC_* values
npm run dev
# App available at http://localhost:3000
```

### Seed data

```bash
cd backend
node scripts/seedData.js
# Creates demo farmer, officer, and admin accounts
# Adds sample queries, responses, and escalations
```

Both servers must be running simultaneously for full local testing.

---

## 12. Common Mistakes to Avoid

These are the most common errors that break the project or waste team time.

| Mistake | Why it's a problem | What to do instead |
|---|---|---|
| Committing directly to `main` | Bypasses review, can break the deployed app | Always use a feature branch |
| Changing a shared type unilaterally | Breaks compilation on both sides | Discuss first, update both sides together |
| Not handling API error states in UI | Farmers see blank screens or spinners that never stop | Handle loading, success, and error on every API call |
| Hardcoding API URLs or keys | Breaks on deployment, risks key exposure | Use environment variables |
| Committing `node_modules/` | Bloats the repository | Ensure `.gitignore` includes `node_modules/` |
| Committing large binary files | Slows clone and CI; Git is not a file store | Store assets in Firebase Storage |
| Skipping `tsc` before pushing | TypeScript errors caught during CI block the PR | Run `tsc --noEmit` locally before pushing |
| Forgetting to run ESLint | Inconsistent code style, potential bugs | Run `npm run lint` before every PR |
| Inventing new API response shapes | Frontend breaks if shapes don't match | Always use the standard `{ success, data/error }` format |
| Making large, multi-feature PRs | Hard to review, high risk of merge conflicts | One PR per GitHub issue |

---

## 13. Testing Before PR

Before opening any Pull Request, run through this checklist manually:

**Backend:**
- [ ] `npm run dev` starts the server without errors
- [ ] `GET /health` returns `{ "status": "ok" }`
- [ ] The specific endpoint this PR introduces or modifies returns the correct response shape
- [ ] Invalid inputs return the correct error code and message
- [ ] No TypeScript errors: `tsc --noEmit`
- [ ] No ESLint errors: `npm run lint`

**Frontend:**
- [ ] `npm run dev` starts the app without errors
- [ ] The screen(s) this PR modifies render correctly
- [ ] Loading state displays while awaiting API response
- [ ] Error state displays when the API call fails (test by stopping the backend)
- [ ] No TypeScript errors: `tsc --noEmit`
- [ ] No ESLint errors: `npm run lint`

**Both:**
- [ ] No `.env` values or secrets visible in the diff
- [ ] No `console.log` statements left in production code
- [ ] Linked GitHub issue is referenced in the PR description

---

## 14. Development Discipline

These habits keep the project healthy across a multi-week sprint.

**Make small commits.** A commit should represent one logical change. Commit after completing a component, fixing a single bug, or finishing a service function — not after an entire day of work.

**Pull from `main` daily.** Run `git pull origin main` onto your feature branch every morning. Small, frequent merges are far easier than a large conflict at the end of a week.

**Communicate before big changes.** If you need to restructure a shared module, rename a collection, or change an API contract, message the other developer first. A 5-minute conversation prevents hours of rework.

**Never rewrite another developer's code** without agreement. If you see a problem in code you do not own, open a GitHub Issue or discuss it. Do not silently refactor the other developer's files in your feature branch.

**Respect the scope.** New feature ideas go into the `Future Enhancements` section of the PRD, not into the current sprint. The goal is to ship the defined roadmap cleanly, not to keep adding to it.

---

## 15. Final Goal

Every decision in this guide exists to support one outcome:

> **Build a stable, end-to-end working system that reliably demonstrates all five demo scenarios by the project deadline.**

The five scenarios are:

1. Farmer submits a text query → receives AI response with audio playback
2. Farmer uploads a crop image → receives disease detection and treatment advice
3. Farmer marks a response "Not Helpful" → escalation is created and appears in officer queue
4. Officer claims and responds to an escalation → farmer receives a push notification
5. Admin views the analytics dashboard → exports query data as CSV

Everything in the codebase should serve one of these scenarios. If a task or feature does not contribute to one of them, it does not belong in this sprint.

**Avoid scope creep. Maintain clean engineering practices. Ship a working demo.**
