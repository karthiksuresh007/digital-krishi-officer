# Digital Krishi Officer – Development Roadmap

> **Project:** Digital Krishi Officer (DKO)  
> **Stack:** Next.js (PWA + Dashboard) · Node.js / Express (API) · Firebase (Auth, Firestore, Storage) · OpenAI GPT-4 / Whisper · Plant.id · Google Cloud TTS  
> **Deployment:** Vercel (`dko.vercel.app`) · Render/Railway (Backend API)  
> **Team:** 2 developers — tasks tagged `[Frontend]`, `[Backend]`, `[Fullstack]`

---

## Phase 1 – Project Setup

> Establish the monorepo, tooling, and shared configuration before any feature work begins.

- [ ] **[Fullstack]** Initialise GitHub monorepo with directories `app/` (Next.js), `backend/` (Express), `shared/` (types), and `docs/`; add root `.gitignore` and `README.md`; enable branch protection on `main` (require PR review, no direct push); add `.github/ISSUE_TEMPLATE/` (bug report + feature request templates) and `.github/pull_request_template.md`  
  Issue: `"Repo – Initialise monorepo structure with branch protection and GitHub templates"`

- [ ] **[Frontend]** Bootstrap Next.js 14 application inside `app/` with TypeScript, App Router, and Tailwind CSS; verify `npm run dev` serves on port 3000  
  Issue: `"Frontend – Bootstrap Next.js application"`

- [ ] **[Frontend]** Install and configure `next-pwa` (Workbox); add `manifest.json` with `name`, `short_name`, `start_url: /farmer`, `display: standalone`, theme colour, and icon set (192 × 192, 512 × 512)  
  Issue: `"Frontend – Configure PWA manifest and Service Worker"`

- [ ] **[Backend]** Scaffold Express server inside `backend/` with `helmet`, `cors`, `morgan`, `express-validator`, and `multer`; create `/health` endpoint returning `{ status: "ok", timestamp }`; add `.env` validation on startup using `envalid` (throw on missing required keys); verify server runs on port 4000  
  Issue: `"Backend – Scaffold Express API server with health check and env validation"`

- [ ] **[Backend]** Create Firebase project `dko-project`; enable Firestore (Native mode), Firebase Authentication (Phone OTP + Email/Password), and Firebase Storage; download service account key and add to `backend/.env`  
  Issue: `"Backend – Create and configure Firebase project"`

- [ ] **[Fullstack]** Define environment variable templates: `backend/.env.example` and `app/.env.local.example`; document all required keys (`JWT_SECRET`, `OPENAI_API_KEY`, `PLANTID_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`, `NEXT_PUBLIC_*` Firebase config); add startup validation so missing keys cause a descriptive crash rather than a silent runtime error  
  Issue: `"Repo – Document and validate environment variable templates"`

- [ ] **[Fullstack]** Create `shared/types/index.ts` with TypeScript interfaces for `User`, `Query`, `Response`, `Escalation`, and `Feedback`; import these types in both `app/` and `backend/` to eliminate schema drift between frontend and backend  
  Issue: `"Shared – Create shared TypeScript interfaces"`

---

## Phase 2 – Core Infrastructure

> Build the shared data layer, authentication foundation, and deployment pipelines.

- [ ] **[Backend]** Create Firestore collections and composite indexes: `users` (indexes: `phone`, `role`), `queries` (indexes: `userId + createdAt`, `status`), `responses` (index: `queryId`), `escalations` (indexes: `status + createdAt`, `assignedTo`), `feedback` (index: `queryId`)  
  Issue: `"Backend – Initialise Firestore schema and indexes"`

- [ ] **[Backend]** Write Firestore security rules restricting farmers to their own documents, officers to all queries and escalations, and backend-only write access to `responses/` audio in Firebase Storage  
  Issue: `"Backend – Implement Firestore and Storage security rules"`

- [ ] **[Backend]** Write database seed script (`backend/scripts/seedData.js`) that creates one admin, one officer, and two farmer accounts; add 15 sample queries with responses and two escalations; document usage in `backend/README.md`  
  Issue: `"Backend – Write Firestore seed data script"`

- [ ] **[Backend]** Implement JWT authentication middleware (`authenticateToken`) and role guard (`requireRole`); export as reusable Express middleware; add structured request logging via `morgan` in JSON format writing to `logs/access.log`; add error logging middleware that logs stack traces to `logs/error.log`  
  Issue: `"Backend – Implement JWT middleware, role-based access control, and structured logging"`

- [ ] **[Fullstack]** Connect Vercel project to the GitHub repository; set `app/` as root directory; configure `NEXT_PUBLIC_*` environment variables in Vercel dashboard; confirm auto-deploy on push to `main`; add GitHub Actions workflow (`.github/workflows/ci.yml`) that runs `eslint` and `tsc --noEmit` on every PR for both `app/` and `backend/`  
  Issue: `"DevOps – Configure Vercel deployment and GitHub Actions CI pipeline"`

- [ ] **[Backend]** Deploy Express API to Render (or Railway); configure environment variables in the platform dashboard; verify `/health` returns `200` from the deployed URL  
  Issue: `"DevOps – Deploy Express API to Render"`

- [ ] **[Frontend]** Create centralised API client at `app/lib/apiClient.ts`: Axios instance with `baseURL` from `NEXT_PUBLIC_API_URL`, JWT interceptor (reads token from `localStorage`, attaches as `Authorization: Bearer`), automatic retry on 503 (up to 2 retries), and global error handler that extracts `message` from standardised error response shape  
  Issue: `"Frontend – Create centralised Axios API client with JWT interceptor"`  
  *Requires: Phase 1 env variable setup*

---

## Phase 3 – Farmer PWA

> Build all UI screens and browser API integrations for the `/farmer` route segment.

- [ ] **[Frontend]** Build Farmer authentication screen (`/farmer/login`): phone number input with country-code prefix, OTP request via Firebase Auth `signInWithPhoneNumber`, 6-digit OTP entry with 60-second resend timer, loading spinner during verification, and redirect to `/farmer` on success; store JWT in `localStorage`; show error toast on invalid OTP  
  Issue: `"Farmer PWA – Phone OTP login screen"`

- [ ] **[Frontend]** Build Farmer home screen (`/farmer`): "Ask a Question" primary CTA button, bottom navigation bar (Home, History, Profile icons), real-time connectivity status banner ("You are offline — queries will be queued"), and skeleton loader while user profile loads  
  Issue: `"Farmer PWA – Home screen and navigation layout"`

- [ ] **[Frontend]** Build query type selection screen (`/farmer/query`): three tappable cards (Text, Voice, Image) with icons and one-line descriptions; route to the appropriate input screen on selection; add empty state if cards fail to render  
  Issue: `"Farmer PWA – Query type selection screen"`

- [ ] **[Frontend]** Build text query input screen (`/farmer/query/text`): 500-character textarea with live character counter, Submit button disabled until input is non-empty, loading spinner on submission, inline API error state ("Failed to submit — try again") using error boundary  
  Issue: `"Farmer PWA – Text query input screen"`

- [ ] **[Frontend]** Implement voice recording screen (`/farmer/query/voice`) using `getUserMedia` and `MediaRecorder` API: animated pulsing record button, 60-second countdown timer, stop on second tap or timeout, HTML5 Audio playback preview, Re-record and Submit buttons; handle `NotAllowedError` (microphone permission denied) with a user-friendly message  
  Issue: `"Farmer PWA – Voice recording screen (MediaRecorder API)"`

- [ ] **[Frontend]** Implement image query screen (`/farmer/query/image`): camera capture via `<input type="file" accept="image/*" capture="environment">`, gallery fallback via standard file input, image preview using `URL.createObjectURL`, optional text description field (200 chars), client-side Canvas compression to < 1 MB before upload; show compression progress indicator  
  Issue: `"Farmer PWA – Image capture and preview screen"`

- [ ] **[Frontend]** Build AI response display screen (`/farmer/response`): formatted text response card, "Play Audio" toggle button (HTML5 Audio element), Thumbs Up / Thumbs Down feedback buttons with one-tap confirmation, loading skeleton while awaiting response, and empty state for missing audio  
  Issue: `"Farmer PWA – AI response display and audio playback screen"`

- [ ] **[Frontend]** Build query history screen (`/farmer/history`): paginated list of past queries (20 per page using Firestore cursor pagination), date filter tabs (7 days / 30 days / All), search bar filtering by query text, tap-to-expand accordion showing full query and response, delete query action with confirmation dialog; display empty state ("No queries yet") on first use  
  Issue: `"Farmer PWA – Query history screen"`

---

## Phase 4 – Backend API

> Implement all REST endpoints consumed by the Farmer PWA and Officer Dashboard.

- [ ] **[Backend]** Implement `POST /api/auth/register`: validate phone number format with `express-validator`, trigger Firebase phone OTP, create user document in Firestore if new; return standardised error response `{ success: false, error: { code, message } }` on validation failure  
  Issue: `"Backend – POST /api/auth/register endpoint"`

- [ ] **[Backend]** Implement `POST /api/auth/login`: verify Firebase OTP token, create or fetch user record, sign and return JWT (30-day expiry) with `{ userId, role }` payload; log successful and failed login attempts  
  Issue: `"Backend – POST /api/auth/login endpoint"`

- [ ] **[Backend]** Implement `POST /api/queries`: validate request body (`type`, `content` / `audioUrl` / `imageUrl`), authenticate via JWT, create query document in Firestore with `status: pending`, route to AI processing service with a 15-second timeout, store response, return formatted result; log AI service call duration  
  Issue: `"Backend – POST /api/queries endpoint"`

- [ ] **[Backend]** Implement `GET /api/queries/:id`: return query document with its linked response from Firestore; enforce ownership check (farmer sees only own queries, officers see all); return `404` with standard error shape if not found  
  Issue: `"Backend – GET /api/queries/:id endpoint"`

- [ ] **[Backend]** Implement `GET /api/queries/user/:userId`: return paginated query history (20 per page) ordered by `createdAt` descending; accept optional `status` and `dateFrom` query parameters; validate `userId` matches JWT subject unless requester is officer  
  Issue: `"Backend – GET /api/queries/user/:userId endpoint"`

- [ ] **[Backend]** Implement `POST /api/queries/:id/feedback`: save feedback document (`rating`, optional `comment`) to Firestore; trigger `escalationService` if `rating === "not_helpful"`  
  Issue: `"Backend – POST /api/queries/:id/feedback endpoint"`

- [ ] **[Backend]** Implement `POST /api/upload/audio`: accept multipart WebM via `multer` (≤ 10 MB), validate MIME type, upload to Firebase Storage at `/audio/{userId}/{queryId}.webm`, return `{ url }`; return `413` on size exceeded  
  Issue: `"Backend – POST /api/upload/audio endpoint"`

- [ ] **[Backend]** Implement `POST /api/upload/image`: accept multipart JPEG/PNG via `multer` (≤ 5 MB), validate MIME type, upload to Firebase Storage at `/images/{userId}/{queryId}.jpg`, return `{ url }`; return `415` on unsupported type  
  Issue: `"Backend – POST /api/upload/image endpoint"`

---

## Phase 5 – AI Integration

> Wire up all three AI processing paths: text (GPT-4), voice (Whisper), and image (Plant.id).

- [ ] **[Backend]** Build `textQueryService`: construct agricultural advisor system prompt with knowledge-base grounding (keyword match against `knowledgeBase.json`); call `gpt-4-turbo-preview` with `max_tokens: 300`, `temperature: 0.7`, wrapped in a 10-second timeout; on timeout or GPT-4 failure automatically retry once with `gpt-3.5-turbo` as fallback; calculate confidence score via heuristic (uncertainty language, response length); log model used and response time; return `{ content, confidence, modelUsed }`  
  Issue: `"AI – GPT-4 text query service with confidence scoring and GPT-3.5 fallback"`

- [ ] **[Backend]** Build `voiceQueryService`: convert uploaded WebM to WAV using `fluent-ffmpeg` with 10-second conversion timeout; send WAV to OpenAI Whisper (`whisper-1`, language `en`); return transcribed text; on conversion or transcription failure return descriptive error with `{ success: false, error }` shape; log transcription duration  
  Issue: `"AI – Whisper speech-to-text service with WebM→WAV conversion"`

- [ ] **[Backend]** Build `imageQueryService`: POST crop image to Plant.id API v3 with 10-second timeout; on Plant.id timeout or API failure return `{ success: false, error: "Plant.id unavailable" }` and flag query for manual escalation; if response received, extract top disease suggestion and `probability`; if confidence ≥ 70% generate treatment prompt for GPT-4; if confidence < 70% return partial result and auto-escalate; log Plant.id response time  
  Issue: `"AI – Plant.id image disease detection with timeout fallback and GPT-4 treatment"`

- [ ] **[Backend]** Build `ttsService`: send AI response text (≤ 500 chars) to Google Cloud TTS (`en-IN`, neutral gender, MP3); upload resulting audio to Firebase Storage at `/responses/{queryId}/ai_response.mp3`; cache output URL in Firestore response document to avoid regeneration; on TTS failure log error and return `null` for audio URL (text response still delivered)  
  Issue: `"AI – Google Cloud TTS audio response generation with caching and failure handling"`

- [ ] **[Backend]** Create `knowledgeBase.json` with 50 curated agricultural Q&A pairs across categories: pest control, disease management, fertiliser, irrigation, and harvest; integrate keyword-matching retrieval into `textQueryService` to serve common questions without an OpenAI call; log cache hit/miss rate  
  Issue: `"AI – Curate agricultural knowledge base JSON (50 Q&A pairs)"`

---

## Phase 6 – Escalation System

> Implement automatic and manual escalation from query creation through to officer response.

- [ ] **[Backend]** Build `escalationService`: create escalation document in Firestore (`status: pending`, `reason`, `queryId`, `priority`); update linked query `status` to `"escalated"`; expose as internal function called by `textQueryService`, `imageQueryService`, and the feedback endpoint  
  Issue: `"Backend – Escalation creation service"`

- [ ] **[Backend]** Implement `GET /api/escalations`: return all pending and in-progress escalations ordered by `createdAt` ascending; require officer or admin role; include joined query and farmer data; return empty array (not `404`) when queue is empty  
  Issue: `"Backend – GET /api/escalations endpoint (officer-only)"`

- [ ] **[Backend]** Implement `PUT /api/escalations/:id/assign`: set `assignedTo` to requesting officer's `userId`, update `status` to `"in_progress"`, record `assignedAt` timestamp; return `409` if already assigned to another officer  
  Issue: `"Backend – PUT /api/escalations/:id/assign endpoint"`

- [ ] **[Backend]** Implement `POST /api/escalations/:id/respond`: validate officer role, create response document (`type: "officer"`, `content`, `officerId`), update escalation `status` to `"resolved"` and `resolvedAt`, update query `status` to `"resolved"`, trigger FCM push notification to farmer  
  Issue: `"Backend – POST /api/escalations/:id/respond endpoint"`

---

## Phase 7 – Officer Dashboard

> Build all screens of the Officer Web Dashboard at `/dashboard`.

- [ ] **[Frontend]** Build officer login screen (`/dashboard/login`): email and password fields, Firebase Auth `signInWithEmailAndPassword`, role verification against Firestore `users` collection, redirect to escalation queue on success; display error toast on invalid credentials  
  Issue: `"Officer Dashboard – Login screen"`

- [ ] **[Frontend]** Build escalation queue screen (`/dashboard/escalations`): table of pending and in-progress escalations with columns (Farmer, Query Type, Submitted, Status, Priority); sort by date; status filter tabs (All / Pending / In Progress / Resolved); poll for updates every 30 seconds; loading skeleton on initial fetch; empty state when queue is clear  
  Issue: `"Officer Dashboard – Escalation queue screen"`

- [ ] **[Frontend]** Build escalation detail screen (`/dashboard/escalations/[id]`): display original query text or transcription, AI response (if any), uploaded image or audio player (if applicable), farmer region, submission timestamp, and AI confidence score; show "Loading…" skeleton while data fetches  
  Issue: `"Officer Dashboard – Escalation detail view"`

- [ ] **[Frontend]** Build officer response submission form on the escalation detail screen: rich-text textarea with 1000-character limit and live counter, optional reference URL input, "Claim Query" button (sets status to `in_progress`), Submit Response button (calls `POST /api/escalations/:id/respond`), confirmation toast on success, inline error state on API failure  
  Issue: `"Officer Dashboard – Officer response submission form"`

- [ ] **[Frontend]** Build user management screen (`/dashboard/users`, admin only): table of all users with role badges; Create Officer form (email, name, region); Deactivate officer action with confirmation dialog; gate route so non-admin officers receive a `403` page  
  Issue: `"Officer Dashboard – Admin user management screen"`

---

## Phase 8 – Notifications & Offline Support

> Deliver push notifications to farmers and implement IndexedDB-based offline queuing.

- [ ] **[Backend]** Enable Firebase Cloud Messaging in Firebase Console; install `firebase-admin` SDK; store FCM registration tokens per user in Firestore `users` document; implement `sendPushNotification(userId, title, body)` utility using `admin.messaging().send()`; log notification delivery success and failure  
  Issue: `"Backend – Firebase Cloud Messaging push notification service"`

- [ ] **[Frontend]** Request browser notification permission on first Farmer PWA load; retrieve FCM registration token using `getToken(messaging, { vapidKey })`; `POST` token to `/api/users/fcm-token`; gracefully handle permission denial without blocking app usage  
  Issue: `"Farmer PWA – FCM token registration and permission request"`

- [ ] **[Backend]** Add `POST /api/users/fcm-token` endpoint: accept `{ token }` in request body, authenticate via JWT, update `fcmToken` field on Firestore `users` document  
  Issue: `"Backend – POST /api/users/fcm-token endpoint"`

- [ ] **[Frontend]** Implement offline queue in `lib/offlineQueue.ts`: on query submission detect `!navigator.onLine`; write query object to IndexedDB store `pendingQueries` with timestamp; display "Queued for submission" badge; on `window.online` event drain queue by submitting each entry to `POST /api/queries` in chronological order; show in-app success toast after each sync  
  Issue: `"Farmer PWA – IndexedDB offline query queue and auto-sync"`

---

## Phase 9 – Analytics

> Build the analytics data aggregation endpoints and the Officer Dashboard analytics screen.

- [ ] **[Backend]** Implement `GET /api/analytics/overview`: aggregate Firestore `queries` collection for the requested date range; return `{ totalQueries, byType: { text, voice, image }, escalationRate, avgResponseTimeSeconds }`; require officer role  
  Issue: `"Backend – GET /api/analytics/overview endpoint"`

- [ ] **[Backend]** Implement `GET /api/analytics/escalations`: return `{ totalEscalations, resolvedCount, pendingCount, avgResolutionTimeHours, topReasons[] }` for the requested date range  
  Issue: `"Backend – GET /api/analytics/escalations endpoint"`

- [ ] **[Frontend]** Build analytics dashboard screen (`/dashboard/analytics`): summary stat cards (Total Queries, Escalation Rate, Avg Response Time, Resolved Escalations), date range selector (7 / 30 / 90 days), bar chart of queries by type (Chart.js), pie chart of top query categories; show loading skeleton while data fetches; show error banner if API fails  
  Issue: `"Officer Dashboard – Analytics dashboard screen"`

- [ ] **[Frontend]** Implement CSV export on analytics screen: use `papaparse` to serialise query or escalation data received from backend; trigger browser download of `dko-export-{date}.csv`; include columns: Query ID, User ID, Type, Status, Created Date  
  Issue: `"Officer Dashboard – CSV data export"`

---

## Phase 10 – Testing & Demo Preparation

> Validate all workflows end-to-end, fix critical bugs, and prepare the project for evaluation.

- [ ] **[Backend]** Write Postman collection covering all API endpoints: auth register/login, query CRUD, file uploads, escalation lifecycle, analytics; include environment variables for local and production base URLs; export as `docs/DKO.postman_collection.json`  
  Issue: `"Testing – Postman API test collection"`

- [ ] **[Fullstack]** Execute and verify all five required demo scenarios end-to-end: (1) text query → AI response → audio playback; (2) image upload → disease detection → treatment; (3) "Not Helpful" feedback → escalation created; (4) officer response → farmer push notification; (5) analytics dashboard → CSV export  
  Issue: `"Testing – End-to-end demo scenario verification"`

- [ ] **[Frontend]** Run Lighthouse PWA audit on `dko.vercel.app/farmer`; resolve any issues until PWA score ≥ 90, Performance ≥ 80; verify Service Worker is registered and `manifest.json` is valid; fix any accessibility (a11y) failures reported  
  Issue: `"Testing – Lighthouse PWA audit and remediation"`

- [ ] **[Fullstack]** Compile manual test checklist covering: OTP login (valid + invalid), all three query types, offline queue drain, officer claim → respond flow, admin user management, analytics date filter, CSV export; assign each scenario to a developer and record pass/fail results  
  Issue: `"Testing – Manual test checklist"`

- [ ] **[Fullstack]** Load seed data into production Firestore (run `node scripts/seedData.js` against production Firebase project); verify farmer and officer test accounts authenticate correctly on the deployed URLs; document test credentials in a private `docs/DEMO_CREDENTIALS.md` (git-ignored)  
  Issue: `"Demo Prep – Load seed data into production Firestore"`

- [ ] **[Fullstack]** Write a `docs/DEMO_SCRIPT.md` covering the five demo scenarios step-by-step with expected outcomes, fallback talking points if live AI is slow, and screenshots of each key screen; keep under 2 pages  
  Issue: `"Demo Prep – Write demo script"`

- [ ] **[Fullstack]** Write `README.md` files for `app/`, `backend/`, and the repo root covering: prerequisites, local setup steps (`cp .env.example .env` → install → seed → run), environment variable reference, deployment instructions, and known limitations  
  Issue: `"Docs – Write README files for all project directories"`

---

## Task Summary

| Phase | Tasks | Primary Owner |
|-------|-------|---------------|
| 1 – Project Setup | 7 | Both |
| 2 – Core Infrastructure | 7 | Backend |
| 3 – Farmer PWA | 8 | Frontend |
| 4 – Backend API | 8 | Backend |
| 5 – AI Integration | 5 | Backend |
| 6 – Escalation System | 4 | Backend |
| 7 – Officer Dashboard | 5 | Frontend |
| 8 – Notifications & Offline | 4 | Both |
| 9 – Analytics | 4 | Both |
| 10 – Testing & Demo Prep | 7 | Both |
| **Total** | **59** | |

---

## Development Notes

**Branch strategy:** create a feature branch per task (`feature/farmer-login`, `feature/query-api`, etc.); open a pull request to `main`; require one reviewer approval before merge.

**API base URL:** all frontend `NEXT_PUBLIC_API_URL` calls should point to `https://dko-api.onrender.com` in production and `http://localhost:4000` in development.

**Standardised error response shape (all endpoints):**
```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Phone number is required" } }
```

**Recommended build order for two developers:**  
- **Developer A (Backend focus):** Phases 1–2 (shared) → Phase 4 → Phase 5 → Phase 6 → Phase 9 backend tasks  
- **Developer B (Frontend focus):** Phases 1–2 (shared) → Phase 3 → Phase 7 → Phase 9 frontend tasks → Phase 8 frontend tasks  
- **Both together:** Phase 8 backend, Phase 10

**Scope guard:** do not add features not listed in this roadmap during the development sprint. New ideas should be added to the `Future Enhancements` section of the PRD for post-evaluation work.
