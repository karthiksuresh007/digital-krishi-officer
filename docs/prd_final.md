# Product Requirements Document

## Digital Krishi Officer (DKO)

**Version:** 2.0  
**Document Type:** Academic Capstone Project  
**Date:** March 10, 2026  
**Status:** Submission-Ready

---

## Executive Summary

Digital Krishi Officer (DKO) is an AI-powered agricultural advisory system designed to bridge the information gap between farmers and agricultural experts. This project demonstrates how artificial intelligence can provide accessible, multilingual agricultural guidance through a Progressive Web Application for farmers and a web dashboard for agricultural officers.

**Project Type:** Academic Capstone Prototype  
**Primary Goal:** Demonstrate functional AI-human collaboration in agricultural advisory  
**Deployment Target:** Working prototype for evaluation

This document outlines the technical architecture, functional requirements, and implementation strategy for a submission-ready prototype that prioritizes rapid development and demonstrable functionality over production-scale features.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution Overview](#solution-overview)
3. [Target Users](#target-users)
4. [Scope and Constraints](#scope-and-constraints)
5. [System Architecture](#system-architecture)
6. [Technical Stack](#technical-stack)
7. [Platform Choice Rationale](#platform-choice-rationale)
8. [Functional Requirements](#functional-requirements)
9. [Non-Functional Requirements](#non-functional-requirements)
10. [AI and Intelligence Layer](#ai-and-intelligence-layer)
11. [Data Model](#data-model)
12. [User Workflows](#user-workflows)
13. [Security and Authentication](#security-and-authentication)
14. [Deployment Strategy](#deployment-strategy)
15. [Success Metrics](#success-metrics)
16. [Project Timeline](#project-timeline)
17. [Risks and Mitigations](#risks-and-mitigations)
18. [Future Enhancements](#future-enhancements)

---

## Problem Statement

### Current Challenges in Agricultural Advisory

Farmers in developing regions face significant barriers to accessing timely, accurate agricultural information:

**Language Barriers**
- Most online resources are in English or Hindi
- Local farmers often prefer regional languages
- Technical terminology is difficult to understand

**Limited Expert Access**
- Agricultural officers serve large geographical areas
- In-person consultations require travel and waiting time
- Emergency situations (pest outbreaks, disease) require immediate guidance

**Information Quality Issues**
- Generic internet advice not specific to local conditions
- Unreliable sources lead to crop damage
- Difficulty identifying crop diseases visually

**Technology Gap**
- Low digital literacy
- Limited smartphone capabilities
- Poor internet connectivity in rural areas

### Impact

These barriers result in:
- Reduced crop yields
- Financial losses from wrong treatment decisions
- Delayed response to disease outbreaks
- Dependency on middlemen for information

---

## Solution Overview

Digital Krishi Officer provides an AI-powered advisory system that combines automated responses with human expertise escalation.

### Core Concept

A dual-interface system where:
- **Farmers** interact with an AI assistant via a Progressive Web App (PWA)
- **Agricultural Officers** manage escalations via web dashboard

### Key Differentiators

1. **Multimodal Input**: Text, voice, and image-based queries
2. **AI-First Response**: Immediate answers using GPT-4 and pretrained models
3. **Smart Escalation**: Complex cases routed to human experts
4. **Offline-Ready**: Queue system for low-connectivity scenarios
5. **Feedback Loop**: Continuous improvement through user ratings

### Expected User Journey

1. Farmer submits query (text/voice/image)
2. AI processes and generates response
3. Response delivered in farmer's preferred format
4. If unhelpful, query escalates to officer
5. Officer provides expert response
6. Farmer receives notification and views answer

---

## Target Users

### Primary User: Farmer

**Demographics**
- Age: 25-60 years
- Location: Rural agricultural areas
- Education: Basic to intermediate literacy
- Tech proficiency: Low to moderate smartphone usage

**Device Profile**
- Android smartphones (entry to mid-range)
- 2-4 GB RAM typical
- Intermittent internet connectivity
- Limited data plans

**Needs**
- Quick answers to farming questions
- Disease identification from crop photos
- Voice-based interaction (language comfort)
- Simple, intuitive interface
- Offline capability for query submission

**Pain Points**
- Cannot type complex queries
- Difficulty explaining problems in text
- Needs immediate answers during field work
- Limited time for app learning

### Secondary User: Agricultural Officer / Admin

**Demographics**
- Government agricultural extension officers
- Private agricultural consultants
- Agricultural cooperative administrators

**Device Profile**
- Desktop or laptop computers
- Stable internet connection
- Modern web browsers

**Needs**
- Dashboard for escalated queries
- Analytics on farmer issues
- Response management tools
- Export capabilities for reporting

**Pain Points**
- High volume of repetitive queries
- Limited time for individual consultations
- Need for data to identify trends
- Manual record-keeping burden

---

## Scope and Constraints

### Academic Context

This is a **capstone project prototype**, not a production system. The primary objective is to demonstrate:
- Problem-solving approach
- System design capabilities
- Working AI integration
- Complete user workflows

### Development Philosophy

**Maximize visible functionality while minimizing development complexity.**

**90/30 Rule**: Achieve 90% of visible features with 30% of production effort.

### What We WILL Do

**Use Ready-Made Solutions**
- OpenAI GPT-4 API for natural language understanding
- Pretrained models for image recognition
- Third-party APIs for crop disease detection
- Firebase for authentication and database
- Cloud hosting platforms with free tiers

**Focus on Core Workflows**
- Complete farmer query submission flow
- AI response generation
- Escalation mechanism
- Officer response interface
- Basic analytics dashboard

**Prioritize Demonstrability**
- Visual polish in UI
- Smooth user experience
- Representative sample data
- Working end-to-end flows

### What We Will NOT Do

**No Custom ML Training**
- Will not train models from scratch
- Will not fine-tune large language models
- Will not collect and label training datasets
- Will not build ML pipelines

**No Production-Scale Features**
- No load balancing or horizontal scaling
- No advanced caching strategies
- No complex microservices architecture
- No DevOps automation

**No External Integrations**
- No government system integrations
- No payment gateways
- No IoT sensor data
- No hardware integrations
- No real-time weather API integration (static demo data acceptable)

**No Advanced Features**
- No recommendation engines
- No predictive analytics
- No multi-tenant architecture
- No advanced role-based permissions beyond basic roles

### Technical Constraints

**Budget**: Under $10 using free tiers  
**Timeline**: Academic semester constraints  
**Team Size**: Individual or small team  
**Infrastructure**: Cloud-based, serverless preferred

### Acceptable Trade-offs

- **Accuracy over Precision**: Good enough AI responses acceptable
- **Speed over Optimization**: Functional code over perfect code
- **Breadth over Depth**: Cover all features at basic level
- **Demo Data over Real Data**: Representative sample data acceptable

---

## System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                           │
│           (Single Next.js App — Vercel: dko.vercel.app)          │
├───────────────────────────┬──────────────────────────────────────┤
│  Farmer Progressive       │  Officer Web Dashboard               │
│  Web App (PWA)            │  (/dashboard)                        │
│  (/farmer)                │                                      │
│  Mobile-first, installable│  Desktop-optimized                   │
└──────────────┬────────────┴──────────────┬───────────────────────┘
               │                           │
               │       HTTPS / REST API    │
               │                           │
┌──────────────┴───────────────────────────┴───────────────────────┐
│                    APPLICATION LAYER                              │
│              Backend API  (Node.js + Express)                     │
│                                                                   │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐       │
│  │  Query Router │  │  AI Processor │  │  Escalation    │       │
│  │               │  │               │  │  Manager       │       │
│  └───────────────┘  └───────────────┘  └────────────────┘       │
└───────────────┬──────────────┬──────────────┬────────────────────┘
                │              │              │
┌───────────────┴──────────────┴──────────────┴────────────────────┐
│                     INTEGRATION LAYER                             │
│         Firebase Services          │  AI & External APIs         │
│  ┌──────────────┐  ┌────────────┐  │  ┌──────────┐  ┌────────┐  │
│  │ Firebase Auth│  │ Firestore  │  │  │ OpenAI   │  │Plant.id│  │
│  │              │  │ Database   │  │  │ GPT-4 /  │  │ API    │  │
│  └──────────────┘  └────────────┘  │  │ Whisper  │  └────────┘  │
│  ┌──────────────┐                  │  └──────────┘              │
│  │ Firebase     │                  │  ┌──────────────────────┐  │
│  │ Storage      │                  │  │ Google Cloud TTS     │  │
│  └──────────────┘                  │  └──────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Component Descriptions

**Farmer Progressive Web App**

A Progressive Web App allows users to install the application directly from their browser onto their smartphone home screen. Once installed, the application runs in standalone mode, providing an experience similar to a native mobile application without requiring app store distribution.

The Farmer Progressive Web App provides the following capabilities:
- **Mobile-first UI**: Designed specifically for smartphone usage with large touch targets and simplified navigation
- **Installable experience**: Users receive an "Add to Home Screen" prompt; once installed, the PWA launches in standalone mode like a native app
- **Offline capability**: Queries composed while offline are stored in IndexedDB and submitted automatically when connectivity is restored
- **Camera access**: Farmers can capture crop images directly from within the PWA using the browser Camera API
- **Microphone access**: Voice queries are recorded using the browser MediaRecorder API
- **Push notifications**: Farmers receive browser push notifications (via Firebase Cloud Messaging) when officers respond to escalated queries
- **No app store required**: The PWA is accessed via URL and installed directly from the browser, eliminating the need for Google Play Store or Apple App Store distribution

**Officer Web Dashboard**
- Responsive web application
- Escalation queue management
- Analytics and reporting
- CSV export functionality
- Real-time query monitoring

**Application Layer (Backend API)**
- RESTful API server
- Request routing and validation
- Business logic execution
- Authentication middleware
- Response formatting

**Query Router**
- Determines query type (text/voice/image)
- Routes to appropriate AI processor
- Manages confidence thresholds
- Triggers escalation when needed

**AI Processor**
- Interfaces with OpenAI GPT-4
- Manages speech-to-text conversion
- Calls crop disease detection APIs
- Implements prompt engineering
- Returns structured responses

**Escalation Manager**
- Creates escalation records
- Notifies officers
- Tracks resolution status
- Sends responses back to farmers

**Integration Layer**
- Firebase Authentication for user management
- Firestore for data persistence
- OpenAI API for language and speech processing
- Plant.id API for disease detection
- Google TTS for audio responses

### Data Flow

**Farmer Query Submission**

1. Farmer opens PWA in browser (or launches from home screen) → authenticates via Firebase
2. Selects query type (text/voice/image)
3. Submits input → stored locally if offline
4. PWA sends request to Backend API via HTTPS
5. Backend validates JWT token
6. Query Router determines processing path
7. AI Processor generates response
8. Response stored in Firestore
9. Response returned to Farmer Progressive Web App
10. PWA displays and optionally plays the AI response

**Escalation Flow**

1. AI confidence below threshold OR farmer marks "Not Helpful"
2. Escalation Manager creates escalation record
3. Query status updated to "escalated"
4. Officer dashboard polls for new escalations
5. Officer views query and context
6. Officer submits manual response
7. Response stored with escalation ID
8. Farmer receives notification
9. Farmer views expert response in PWA

### Offline Handling

**Farmer PWA Offline Queue**

Offline queries are temporarily stored in IndexedDB within the browser. When the device regains internet connectivity, the Farmer Progressive Web App automatically submits the queued queries to the Backend API in chronological order. The user sees a visual indicator while queries are queued and receives an in-app confirmation upon successful submission.

1. PWA detects no network connectivity via `navigator.onLine`
2. Query stored locally in IndexedDB with timestamp
3. Visual indicator shows "Queued for submission"
4. PWA monitors connectivity restoration
5. When online, queued queries are submitted automatically
6. User notified of submission success via in-app notification

---

## Technical Stack

### Farmer Progressive Web Application

The Farmer Progressive Web App (PWA) is a mobile-first web application built with Next.js that can be installed directly onto a smartphone home screen from the browser. It requires no app store distribution and delivers a native-like experience through modern browser APIs.

**Framework and Core**

| Component | Technology | Justification |
|-----------|------------|---------------|
| Framework | Next.js 14 | React-based PWA support, routing, server-side rendering |
| Language | JavaScript / TypeScript | Team familiarity, gradual adoption |
| Styling | Tailwind CSS | Consistent design system, utility-first, mobile-first |
| HTTP Client | Axios | Simple API calls, request/response interceptors |

**PWA-Specific Libraries and Browser APIs**

| Library / API | Purpose | Notes |
|---------------|---------|-------|
| next-pwa | Service Worker registration, offline support | Wraps Workbox |
| MediaRecorder API | Voice recording in browser | Native browser API |
| Web Camera API (getUserMedia) | Camera and image capture | Native browser API |
| IndexedDB (via idb library) | Offline query storage and sync queue | Replaces AsyncStorage |
| Web Push API | Push notifications | Via Firebase Cloud Messaging |
| Service Workers | Offline caching and background sync | Managed by next-pwa |

**State Management**
- React Context API for global state
- Local component state for UI interactions
- IndexedDB for persistent offline storage

**Authentication**
- JWT stored in browser `httpOnly` cookies or `localStorage` with short expiry
- Firebase Authentication SDK for web

**Progressive Web App Manifest**
```json
{
  "name": "Digital Krishi Officer",
  "short_name": "DKO",
  "start_url": "/farmer",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2E7D32",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

The Progressive Web App allows farmers to install the application directly from the browser onto their smartphone home screen. Once installed, the application runs in standalone mode, providing an app-like experience without requiring distribution through mobile app stores.

### Officer Web Dashboard

**Framework and Core**

| Component | Technology | Justification |
|-----------|------------|---------------|
| Framework | Next.js 14 | Server-side rendering, routing, API routes |
| Language | JavaScript/TypeScript | Type safety optional, gradual adoption |
| Styling | Tailwind CSS | Consistent with Farmer PWA design system |
| UI Components | ShadCN UI | Pre-built accessible components |
| Charts | Chart.js | Simple, lightweight charting |

**Key Libraries**

- react-query: Server state management
- axios: API client
- date-fns: Date formatting
- react-hook-form: Form handling
- papaparse: CSV export

### Backend API

**Core Stack**

| Component | Technology | Justification |
|-----------|------------|---------------|
| Runtime | Node.js 18+ | JavaScript ecosystem consistency |
| Framework | Express.js | Minimal, flexible, well-documented |
| API Style | REST | Simple, stateless, standard HTTP |
| Authentication | JWT | Stateless, Firebase compatible |

**Middleware**

- express-validator: Input validation
- helmet: Security headers
- cors: Cross-origin requests
- morgan: Request logging
- multer: File upload handling

**Project Structure**

```
backend/
├── src/
│   ├── routes/          # API route handlers
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, validation, error handling
│   ├── services/        # External API integrations
│   ├── utils/           # Helper functions
│   └── config/          # Configuration files
├── package.json
└── server.js
```

### Database and Authentication

**Firebase Services**

| Service | Purpose | Collections/Features |
|---------|---------|---------------------|
| Firebase Auth | User authentication | Phone OTP, email/password fallback |
| Firestore | NoSQL database | users, queries, responses, escalations, feedback |

**Firestore Collections Schema**

```
users/
├── {userId}
    ├── phone: string
    ├── role: "farmer" | "officer" | "admin"
    ├── name: string
    ├── region: string (optional)
    ├── language: string
    ├── createdAt: timestamp

queries/
├── {queryId}
    ├── userId: string
    ├── type: "text" | "voice" | "image"
    ├── content: string
    ├── audioUrl: string (if voice)
    ├── imageUrl: string (if image)
    ├── status: "pending" | "answered" | "escalated" | "resolved"
    ├── confidence: number (0-100)
    ├── createdAt: timestamp

responses/
├── {responseId}
    ├── queryId: string
    ├── type: "ai" | "officer"
    ├── content: string
    ├── audioUrl: string (optional)
    ├── generatedBy: string (AI model name or officer ID)
    ├── createdAt: timestamp

escalations/
├── {escalationId}
    ├── queryId: string
    ├── reason: string
    ├── assignedTo: string (officer ID, optional)
    ├── status: "pending" | "in_progress" | "resolved"
    ├── createdAt: timestamp
    ├── resolvedAt: timestamp (optional)

feedback/
├── {feedbackId}
    ├── queryId: string
    ├── responseId: string
    ├── rating: "helpful" | "not_helpful"
    ├── comment: string (optional)
    ├── createdAt: timestamp
```

### AI and External Services

**Natural Language Processing**

| Service | Purpose | Model/API |
|---------|---------|-----------|
| OpenAI GPT-4 | Text query processing | gpt-4-turbo-preview |
| OpenAI GPT-3.5 | Fallback for cost optimization | gpt-3.5-turbo |
| OpenAI Whisper | Speech-to-text | whisper-1 |

**Voice Processing**

| Service | Purpose | Details |
|---------|---------|---------|
| Google Cloud Text-to-Speech | Audio response generation | Standard voices, regional languages |

**Image Processing**

| Service | Purpose | Details |
|---------|---------|---------|
| Plant.id API | Crop disease identification | RapidAPI integration |
| Crop Health API | Alternative disease detection | Fallback option |

**Knowledge Base**

- Static JSON file with common Q&A
- Stored in backend repository
- Used for prompt grounding
- Manual curation of agricultural facts

### Development and Deployment

**Development Tools**

- Git: Version control
- GitHub: Code repository
- VS Code: IDE
- Postman: API testing
- Chrome DevTools (mobile emulation): PWA testing
- Lighthouse: PWA audit and performance testing

**Hosting and Deployment**

| Component | Platform | Tier |
|-----------|----------|------|
| Next.js Application (Farmer PWA + Officer Dashboard) | Vercel | Free |
| Backend API | Render or Railway | Free |
| Database | Firebase Firestore | Free Spark Plan |
| Authentication | Firebase Auth | Free |
| File Storage | Firebase Storage | Free (1GB) |

**CI/CD**

- Manual deployment (no automated pipelines)
- Direct Git push to deployment platforms
- Environment variables via platform dashboards

**Estimated Monthly Costs**

| Service | Free Tier Limit | Expected Usage | Cost |
|---------|-----------------|----------------|------|
| Firestore | 1GB storage, 50K reads/day | Demo data | $0 |
| Firebase Auth | 10K auth/month | Limited test users | $0 |
| Vercel | 100GB bandwidth | Minimal traffic | $0 |
| Render/Railway | 750 hours/month | Single instance | $0 |
| OpenAI API | Pay-per-use | $5-10 testing budget | $5-10 |
| Plant.id API | 100 requests/month | Demo usage | $0 |
| Google TTS | 1M chars/month | Limited testing | $0 |
| **Total** | | | **$5-10** |

### Version Control and Documentation

**Repository Structure**

```
dko-project/
├── app/                         # Next.js fullstack application
│   ├── farmer/                  # Farmer PWA route segment (mobile-first)
│   └── dashboard/               # Officer Dashboard route segment
├── backend/                     # Express API server
├── docs/                        # Documentation
├── README.md
└── .gitignore
```

Both the Farmer Progressive Web App and the Officer Web Dashboard are served from a single Next.js application using Next.js App Router route segmentation. The `/farmer` route delivers a mobile-first PWA experience, while the `/dashboard` route delivers the officer management interface.

**Documentation**

- README files in each directory
- API documentation (endpoint descriptions)
- Setup instructions
- Environment variable templates

---

## Platform Choice Rationale

### Why a Progressive Web App Instead of a Native Mobile Application

The Farmer interface is implemented as a Progressive Web App (PWA) rather than a native mobile application. This architectural decision is well-suited to the constraints and objectives of an academic capstone prototype for the following reasons.

**Reduced Development Complexity**

A PWA is built using standard web technologies (Next.js, React, Tailwind CSS) that the development team is already using for the Officer Dashboard. This eliminates the need to maintain a separate native mobile codebase in React Native or a similar framework, significantly reducing development overhead.

**Cross-Platform Compatibility**

A single PWA codebase works across Android and iOS smartphones via their respective browsers. This avoids platform-specific builds, testing environments, and device provisioning requirements that would be impractical within the constraints of a short academic timeline.

**No App Store Distribution Requirements**

Publishing to the Google Play Store or Apple App Store requires developer accounts, review processes, and binary build pipelines that are unnecessary for an academic prototype. The PWA is deployed to Vercel as a web URL and installed directly on the user's device via "Add to Home Screen" — accessible to evaluators immediately.

**Suitable for Rapid Prototyping**

PWAs are well-suited to iterative development because changes are deployed instantly without requiring device-level app updates. This accelerates the feedback-fix-redeploy cycle during the six-week development timeline.

**Browser API Coverage for Required Features**

All features required by the Farmer PWA — voice recording, camera access, offline storage, and push notifications — are supported by modern mobile browsers (Chrome for Android, Safari for iOS 14+) through standardized web APIs. This makes native mobile APIs unnecessary for the scope of this prototype.

**Consistent Monorepo Architecture**

By using Next.js for both the Farmer PWA and the Officer Dashboard within the same application, the project benefits from a unified routing system, shared component library, and a single deployment pipeline — keeping infrastructure complexity within the means of a small academic team.

---

## Functional Requirements

### Farmer Progressive Web Application

#### FR-M-1: User Authentication

**Description**: Farmers must authenticate to access the application.

**Requirements**
- Phone number-based OTP login via Firebase Auth
- Store authentication token securely in browser (httpOnly cookie or localStorage with short expiry)
- Auto-logout after 30 days of inactivity
- Option to manually log out

**Success Criteria**
- User can register with phone number
- User receives OTP via SMS
- User can log in successfully
- Token persists across app restarts

**Priority**: High

#### FR-M-2: Text Query Submission

**Description**: Farmers can submit text-based agricultural queries.

**Requirements**
- Text input field with character limit (500 chars)
- Submit button enabled when text is entered
- Loading indicator during submission
- Success confirmation message
- Query saved to local history

**Success Criteria**
- Text query successfully sent to backend
- Response received within 5 seconds
- User can view response immediately

**Priority**: High

#### FR-M-3: Voice Query Submission

**Description**: Farmers can ask questions using voice input.

**Requirements**
- Record button with visual feedback (uses browser MediaRecorder API)
- Requests microphone permission via `getUserMedia`
- Maximum recording duration: 60 seconds
- Play back recording before submission using HTML5 Audio element
- Re-record option
- Audio file (WebM format, output of MediaRecorder) uploaded to Firebase Storage
- Backend converts WebM to WAV before sending to Whisper API
- Automatic speech-to-text conversion via Whisper API

**Success Criteria**
- Voice recording captured successfully
- Audio file uploaded and processed
- Transcribed text visible to user
- AI response generated from transcription

**Priority**: High

#### FR-M-4: Image Query Submission

**Description**: Farmers can upload crop images for disease identification.

**Requirements**
- Camera capture via `<input type="file" capture="environment">` or `getUserMedia` Camera API
- Gallery/file selection via standard file input
- Image preview before submission using `FileReader` / Object URLs
- Optional text description ("What's the problem?")
- Image upload to Firebase Storage
- Maximum image size: 5MB
- Automatic client-side compression using Canvas API if needed

**Success Criteria**
- Image captured or selected successfully
- Image uploaded and processed
- Disease identified (if detectable)
- Treatment recommendations provided

**Priority**: High

#### FR-M-5: Response Display

**Description**: Farmers receive and view AI-generated responses.

**Requirements**
- Text response display with readable formatting
- Text-to-speech playback button
- Audio response playback controls (play/pause)
- Response saved to query history
- Share response option (copy text)

**Success Criteria**
- Response displayed clearly
- Audio playback works smoothly
- User can replay audio multiple times

**Priority**: High

#### FR-M-6: Query History

**Description**: Farmers can view their past queries and responses.

**Requirements**
- Chronological list of queries
- Filter by date (last 7 days, 30 days, all)
- Search functionality
- Tap to view full query and response
- Delete individual queries

**Success Criteria**
- History displays correctly
- Filters work as expected
- User can navigate to past conversations

**Priority**: Medium

#### FR-M-7: Feedback Submission

**Description**: Farmers can rate responses as helpful or not helpful.

**Requirements**
- Thumbs up/down buttons
- Optional text comment field
- Feedback saved to Firestore
- Visual confirmation of submission
- Cannot change rating after submission

**Success Criteria**
- Feedback successfully recorded
- "Not helpful" triggers escalation
- User sees confirmation message

**Priority**: High

#### FR-M-8: Offline Queue

**Description**: Queries can be submitted when offline and synced later.

**Requirements**
- Detect network connectivity via `navigator.onLine`
- Store queries locally in IndexedDB when offline
- Visual indicator for queued queries ("Queued for submission" badge)
- Automatically submit queued queries when connectivity is restored
- In-app notification on successful sync

**Success Criteria**
- Offline queries stored locally
- Queries submitted when online
- No data loss during offline period

**Priority**: Medium

#### FR-M-9: Notifications

**Description**: Farmers receive notifications for important updates.

**Requirements**
- Push notification when escalated query is answered
- In-app notification badge
- Notification history
- Tap notification to view response

**Success Criteria**
- Notifications delivered reliably
- User redirected to correct query
- Notification settings can be toggled

**Priority**: Low

### Officer Web Dashboard

#### FR-W-1: Officer Authentication

**Description**: Officers must log in to access the dashboard.

**Requirements**
- Email and password login
- Firebase Auth integration
- Role verification (officer or admin only)
- Session management
- Password reset option

**Success Criteria**
- Officer can log in successfully
- Unauthorized users cannot access dashboard
- Session persists for 24 hours

**Priority**: High

#### FR-W-2: Escalation Queue

**Description**: Officers view and manage escalated queries.

**Requirements**
- List of pending escalations
- Sort by date, priority, status
- Filter by assigned officer (admins see all)
- Query details display (original query, AI response, farmer info)
- Assign escalation to self
- Mark as "in progress"

**Success Criteria**
- Escalations displayed accurately
- Officers can claim queries
- Status updates reflected in real-time

**Priority**: High

#### FR-W-3: Manual Response Submission

**Description**: Officers provide expert responses to escalated queries.

**Requirements**
- Rich text editor for response
- Character count (max 1000 chars)
- Preview before submission
- Attach reference links (optional)
- Submit and notify farmer
- Mark escalation as resolved

**Success Criteria**
- Response saved to Firestore
- Farmer receives notification
- Escalation status updated to "resolved"

**Priority**: High

#### FR-W-4: Analytics Dashboard

**Description**: Officers and admins view system usage analytics.

**Requirements**
- Total queries count
- Queries by type (text/voice/image)
- Escalation rate percentage
- Average response time
- Top query categories
- Date range filter (last 7/30/90 days)
- Visual charts (bar, pie, line)

**Success Criteria**
- Data displayed accurately
- Charts update based on filters
- Performance acceptable with demo data

**Priority**: Medium

#### FR-W-5: User Management (Admin Only)

**Description**: Admins can manage officer accounts.

**Requirements**
- List of all users with roles
- Create new officer account
- Deactivate officer account
- Reset officer password
- Assign regions to officers (optional field)

**Success Criteria**
- Admins can create officers
- Role-based access enforced
- Officers cannot access admin features

**Priority**: Low

#### FR-W-6: Data Export

**Description**: Officers can export query data for reporting.

**Requirements**
- Export queries to CSV
- Export escalations to CSV
- Date range selection
- Include columns: query ID, user ID, type, status, created date
- Download file to local system

**Success Criteria**
- CSV file generated correctly
- Data includes all selected records
- File downloads successfully

**Priority**: Low

### Backend API

#### FR-B-1: Authentication Endpoints

**Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Verify OTP and issue JWT |
| `/api/auth/verify` | POST | Verify JWT token |

**Requirements**
- Validate phone number format
- Generate and verify OTP via Firebase
- Issue signed JWT with user ID and role
- Token expiry: 30 days

**Priority**: High

#### FR-B-2: Query Management Endpoints

**Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/queries` | POST | Submit new query |
| `/api/queries/:id` | GET | Get query details |
| `/api/queries/user/:userId` | GET | Get user's query history |
| `/api/queries/:id/feedback` | POST | Submit feedback |

**Requirements**
- Validate request body
- Authenticate user via JWT
- Store query in Firestore
- Process query based on type
- Return response to user

**Priority**: High

#### FR-B-3: AI Processing Endpoints

**Internal Processing**
- Text queries: Send to GPT-4 with context prompt
- Voice queries: Convert uploaded WebM audio to WAV on the backend, send to Whisper API for transcription, then process transcribed text as a text query
- Image queries: Send to Plant.id API, format results

**Requirements**
- Implement confidence scoring
- Trigger escalation if confidence < 70%
- Store AI response in Firestore
- Return formatted response

**Priority**: High

#### FR-B-4: Escalation Endpoints

**Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/escalations` | GET | Get all escalations (officers) |
| `/api/escalations/:id` | GET | Get escalation details |
| `/api/escalations/:id/respond` | POST | Submit officer response |
| `/api/escalations/:id/assign` | PUT | Assign escalation to officer |

**Requirements**
- Filter by status and assigned officer
- Validate officer role
- Update escalation status
- Create response record
- Trigger farmer notification

**Priority**: High

#### FR-B-5: Analytics Endpoints

**Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/analytics/overview` | GET | Get summary statistics |
| `/api/analytics/queries` | GET | Query breakdown by type |
| `/api/analytics/escalations` | GET | Escalation metrics |

**Requirements**
- Aggregate Firestore data
- Calculate percentages and averages
- Support date range filtering
- Return JSON formatted data

**Priority**: Medium

#### FR-B-6: File Upload Endpoints

**Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload/audio` | POST | Upload voice recording |
| `/api/upload/image` | POST | Upload crop image |

**Requirements**
- Accept multipart/form-data
- Validate file type and size
- Upload to Firebase Storage
- Return public URL
- Handle upload errors gracefully

**Priority**: High

---

## Non-Functional Requirements

### Performance

**NFR-P-1: Response Time**
- AI text responses: < 5 seconds (95th percentile)
- Image processing: < 10 seconds
- Voice transcription: < 8 seconds
- Dashboard page load: < 3 seconds
- API latency: < 500ms (excluding AI processing)

**NFR-P-2: Concurrent Users**
- Support 10 concurrent Farmer PWA users
- Support 5 concurrent dashboard users
- Graceful degradation under load

**NFR-P-3: Data Loading**
- Query history: Load 20 items per page (pagination)
- Escalation queue: Load all pending items (expected < 50)
- Analytics: Aggregate data on-demand (cache for 5 minutes)

### Scalability

**NFR-S-1: Data Volume**
- Support up to 1000 total queries for demo
- Support up to 100 users (farmers + officers)
- Support up to 200 escalations

**NFR-S-2: File Storage**
- Total storage limit: 1GB (Firebase free tier)
- Average image size after compression: 500KB
- Average audio size: 200KB

### Availability

**NFR-A-1: Uptime**
- Target: 95% uptime during demonstration period
- Acceptable downtime for free tier platform maintenance
- No SLA guarantees (academic project)

**NFR-A-2: Offline Capability**
- Farmer PWA functional for query submission offline; queries stored in IndexedDB and submitted automatically when connectivity is restored
- Queries queued and synced when online
- No offline dashboard requirement

### Security

**NFR-SEC-1: Authentication**
- All API endpoints require valid JWT (except auth endpoints)
- Token expiry enforced
- Secure token storage in browser (httpOnly cookies preferred; localStorage as fallback)

**NFR-SEC-2: Data Protection**
- HTTPS enforced for all API communication
- Firebase security rules restrict access by user role
- No sensitive data logged in server logs

**NFR-SEC-3: Input Validation**
- All user inputs sanitized
- File uploads validated for type and size
- SQL injection not applicable (NoSQL database)
- XSS protection via React's default escaping

**NFR-SEC-4: Role-Based Access**
- Farmers can only view their own queries
- Officers can view all escalations
- Admins can view all data and manage users

### Usability

**NFR-U-1: Farmer PWA**
- Mobile-first responsive design optimized for smartphones
- Intuitive navigation (< 3 taps to any feature)
- Large touch targets (min 44x44 CSS pixels)
- High contrast text for readability in outdoor environments
- Installable via "Add to Home Screen" on Android and iOS
- Support for low-end Android and iOS devices via modern mobile browsers

**NFR-U-2: Web Dashboard**
- Responsive design (desktop and tablet)
- Modern browser support (Chrome, Firefox, Safari, Edge)
- Keyboard navigation support
- Clear error messages

**NFR-U-3: Language**
- UI text in English (expandable to regional languages in future)
- AI responses in English
- Voice input/output in English (demo)

### Reliability

**NFR-R-1: Error Handling**
- Graceful API error handling with user-friendly messages
- Retry logic for transient failures (3 retries with exponential backoff)
- Fallback to cached data when offline

**NFR-R-2: Data Consistency**
- Firestore transactions for critical operations
- Eventual consistency acceptable for analytics
- No data loss for submitted queries

### Maintainability

**NFR-M-1: Code Quality**
- Consistent code formatting (Prettier)
- Modular architecture
- README documentation for each component
- Environment configuration via .env files

**NFR-M-2: Logging**
- Backend request/response logging
- Error logging to console (no external logging service)
- Client-side error tracking (console.error)

### Compatibility

**NFR-C-1: Farmer PWA — Supported Browsers (Mobile)**
- Chrome for Android 90+
- Samsung Internet 14+
- Safari for iOS 14+ (PWA install supported via "Add to Home Screen")
- Firefox for Android 88+
- No native app installation required; accessed via browser URL

**NFR-C-2: Web Browsers**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**NFR-C-3: Device Resolution**
- Mobile: 360x640 to 414x896 (common smartphone resolutions)
- Web: 1280x720 to 1920x1080 (desktop)

---

## AI and Intelligence Layer

### Guiding Principle

**Use APIs and pretrained models exclusively. No custom model training or fine-tuning.**

### Natural Language Processing

#### Text Query Processing

**Model**: OpenAI GPT-4 Turbo (gpt-4-turbo-preview)

**Fallback**: OpenAI GPT-3.5 Turbo (gpt-3.5-turbo) for cost optimization

**Implementation Approach**: Prompt Engineering

**System Prompt Template**

```
You are an expert agricultural advisor helping farmers in India. 
Provide practical, actionable advice in simple language.

Context: The farmer is asking about [crop/issue/topic].

Guidelines:
- Be concise (max 200 words)
- Use simple language
- Provide specific steps if applicable
- Mention when to consult an expert
- Do not recommend harmful chemicals without proper context

Farmer's question: {user_query}

Provide your response in clear, numbered steps if applicable.
```

**API Call Parameters**

| Parameter | Value | Purpose |
|-----------|-------|---------|
| model | gpt-4-turbo-preview | Latest stable model |
| temperature | 0.7 | Balance creativity and consistency |
| max_tokens | 300 | Limit response length |
| top_p | 0.9 | Nucleus sampling |

**Confidence Scoring**

- Use GPT-4's logprobs (if available) or custom heuristic
- Heuristic factors: Response length, presence of disclaimers, use of uncertain language
- Threshold for escalation: < 70% confidence

**Knowledge Grounding (Simplified RAG)**

**Static Knowledge Base**: JSON file with 50-100 curated Q&A pairs

**Example Entry**

```json
{
  "category": "pest_control",
  "question": "How to control aphids on wheat?",
  "answer": "1. Spray neem oil solution (5ml per liter water) early morning. 2. Release ladybugs if available. 3. Remove heavily infested plants. 4. For severe cases, use imidacloprid as per label instructions.",
  "keywords": ["aphid", "wheat", "pest", "neem"]
}
```

**Retrieval Process**

1. Extract keywords from user query
2. Search JSON for matching keywords (simple string matching)
3. If match found with high relevance score (> 80%), return prewritten answer
4. Otherwise, include matched entries in GPT-4 context as "relevant examples"
5. Generate response using GPT-4 with grounded context

**Benefits**

- Consistent answers for common questions
- Reduced API costs
- Faster response time for cached queries
- No vector database complexity

### Voice Processing

#### Speech-to-Text

**Service**: OpenAI Whisper API (whisper-1)

**Input**: Audio file (WAV or MP3 preferred; WebM accepted)

**Output**: Transcribed text

**Implementation**

```javascript
const formData = new FormData();
formData.append('file', audioFile);
formData.append('model', 'whisper-1');
formData.append('language', 'en'); // or 'hi' for Hindi

const response = await axios.post(
  'https://api.openai.com/v1/audio/transcriptions',
  formData,
  { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
);

const transcribedText = response.data.text;
```

**Language Support** (Demo)

- English (primary)
- Hindi (optional, if time permits)

**Audio Format Conversion**

The Farmer Progressive Web App records audio using the browser MediaRecorder API, which typically outputs audio in WebM (Opus codec) format. Before the audio file is sent to the Whisper API, the Backend API performs a format conversion step to ensure compatibility.

```javascript
// Backend: convert WebM to WAV using ffmpeg (via fluent-ffmpeg)
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

function convertWebmToWav(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat('wav')
      .on('end', resolve)
      .on('error', reject)
      .save(outputPath);
  });
}

// In the voice query handler:
const webmPath = uploadedFile.path;
const wavPath = webmPath.replace('.webm', '.wav');
await convertWebmToWav(webmPath, wavPath);
// wavPath is then sent to Whisper API
```

**Error Handling**

- If transcription fails, notify user to re-record
- If format conversion fails, return an error asking the user to re-submit
- No fallback transcription service

#### Text-to-Speech

**Service**: Google Cloud Text-to-Speech API

**Input**: Text response (max 500 chars)

**Output**: MP3 audio file

**Implementation**

```javascript
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();

const request = {
  input: { text: responseText },
  voice: { languageCode: 'en-IN', ssmlGender: 'NEUTRAL' },
  audioConfig: { audioEncoding: 'MP3' }
};

const [response] = await client.synthesizeSpeech(request);
const audioContent = response.audioContent;
```

**Voice Selection**

- Language: English (India) - en-IN
- Gender: Neutral
- Speech rate: Normal (1.0x)

**Optimization**

- Cache TTS output for identical responses
- Pre-generate audio for common answers

### Image Processing

#### Crop Disease Detection

**Primary Service**: Plant.id API (RapidAPI)

**Alternative**: Crop Health API (fallback if Plant.id unavailable)

**Input**: Image file (JPEG, PNG) max 5MB

**Output**: Disease identification with confidence score

**Plant.id API Call**

```javascript
const formData = new FormData();
formData.append('images', imageFile);
formData.append('modifiers', ['crops_fast', 'similar_images']);

const response = await axios.post(
  'https://plant.id/api/v3/identification',
  formData,
  {
    headers: {
      'Api-Key': PLANTID_API_KEY,
      'Content-Type': 'multipart/form-data'
    }
  }
);

const disease = response.data.suggestions[0];
const diseaseName = disease.name;
const confidence = disease.probability * 100;
```

**Response Processing**

1. Extract top disease suggestion
2. Calculate confidence percentage
3. If confidence < 70%, escalate to officer
4. Fetch treatment recommendations from GPT-4

**Treatment Recommendation Generation**

```javascript
const treatmentPrompt = `
Disease identified: ${diseaseName}
Confidence: ${confidence}%
Crop type: ${cropType}

Provide brief treatment recommendations in 3-4 bullet points.
Include organic and chemical options.
`;

const treatment = await callGPT4(treatmentPrompt);
```

**Limitations**

- 100 free API calls per month (sufficient for demo)
- Accuracy depends on image quality
- Limited to plant diseases (not pest identification)

### Confidence Scoring and Escalation

#### Escalation Triggers

**Automatic Escalation Conditions**

1. AI confidence score < 70%
2. User feedback: "Not Helpful"
3. Query contains keywords: "emergency", "urgent", "dying"
4. Image processing fails (API error)

**Confidence Calculation**

For text queries:
```javascript
function calculateConfidence(gptResponse) {
  let confidence = 100;
  
  // Reduce confidence for uncertainty indicators
  if (gptResponse.includes('might') || gptResponse.includes('could')) {
    confidence -= 10;
  }
  
  if (gptResponse.includes('consult expert') || gptResponse.includes('specialist')) {
    confidence -= 20;
  }
  
  if (gptResponse.length < 50) {
    confidence -= 15; // Very short responses indicate low info
  }
  
  return Math.max(confidence, 0);
}
```

For image queries:
```javascript
function calculateImageConfidence(plantIdResponse) {
  const topSuggestion = plantIdResponse.suggestions[0];
  return topSuggestion.probability * 100;
}
```

#### Escalation Workflow

1. System creates escalation record in Firestore
2. Escalation includes: query ID, reason, timestamp, status = "pending"
3. Officer dashboard polls for new escalations every 30 seconds
4. Officer claims escalation (status = "in_progress")
5. Officer submits response
6. System creates response record with type = "officer"
7. Escalation status updated to "resolved"
8. Push notification sent to farmer
9. Farmer views officer response in the Farmer Progressive Web App

### API Rate Limits and Cost Management

**OpenAI API Limits** (Tier 1 - Pay-as-you-go)

| Model | RPM | TPM | Cost |
|-------|-----|-----|------|
| GPT-4 Turbo | 500 | 30,000 | $10/1M input, $30/1M output |
| GPT-3.5 Turbo | 3,500 | 90,000 | $0.50/1M input, $1.50/1M output |
| Whisper | 50 | - | $0.006/minute |

**Plant.id API** (Free Tier)

- 100 requests/month
- No rate limiting per minute

**Google TTS** (Free Tier)

- 1 million characters/month
- No rate limiting

**Cost Optimization Strategies**

1. Use knowledge base for common queries (bypass GPT-4)
2. Cache responses for identical queries
3. Limit max_tokens to 300 for concise answers
4. Use GPT-3.5 for simple queries (future enhancement)
5. Limit demo usage to 200-300 total queries

**Estimated Demo Costs**

- 100 text queries × $0.003/query = $0.30
- 50 voice queries × $0.01/query = $0.50
- 20 image queries × $0.00/query (free tier) = $0.00
- 100 TTS generations × $0.00/generation (free tier) = $0.00
- **Total estimated cost**: $1-2 for entire demo period

---

## Data Model

### Firestore Collections

#### users Collection

```javascript
{
  userId: "firebase_auth_uid",
  phone: "+911234567890",
  role: "farmer", // "farmer" | "officer" | "admin"
  name: "Ramesh Kumar",
  region: "Punjab", // optional
  language: "en", // "en" | "hi" | "pa"
  createdAt: Timestamp,
  lastLoginAt: Timestamp
}
```

**Indexes**: phone, role

#### queries Collection

```javascript
{
  queryId: "auto_generated_id",
  userId: "firebase_auth_uid",
  type: "text", // "text" | "voice" | "image"
  
  // Text query
  content: "How to treat wheat rust?",
  
  // Voice query
  audioUrl: "https://firebase-storage.../audio.webm",
  transcribedText: "How to treat wheat rust?",
  
  // Image query
  imageUrl: "https://firebase-storage.../image.jpg",
  detectedDisease: "Leaf Rust",
  diseaseConfidence: 85,
  
  // Response
  status: "answered", // "pending" | "answered" | "escalated" | "resolved"
  aiResponse: "To treat wheat rust: 1. Apply fungicide...",
  aiResponseAudioUrl: "https://firebase-storage.../response.mp3",
  confidence: 85, // 0-100
  
  // Timestamps
  createdAt: Timestamp,
  answeredAt: Timestamp
}
```

**Indexes**: userId, status, createdAt

#### responses Collection

```javascript
{
  responseId: "auto_generated_id",
  queryId: "reference_to_query",
  type: "ai", // "ai" | "officer"
  
  // Common fields
  content: "To treat wheat rust: 1. Apply fungicide containing...",
  
  // AI response
  generatedBy: "gpt-4-turbo-preview",
  confidence: 85,
  
  // Officer response
  officerId: "firebase_auth_uid_of_officer",
  officerName: "Dr. Suresh Patel",
  
  // Optional
  audioUrl: "https://firebase-storage.../response.mp3",
  referenceLinks: ["https://example.com/wheat-rust"],
  
  createdAt: Timestamp
}
```

**Indexes**: queryId, type

#### escalations Collection

```javascript
{
  escalationId: "auto_generated_id",
  queryId: "reference_to_query",
  reason: "Low confidence (65%)", // or "User marked not helpful"
  
  // Assignment
  assignedTo: "officer_firebase_uid", // null if unassigned
  assignedAt: Timestamp,
  
  // Status
  status: "pending", // "pending" | "in_progress" | "resolved"
  
  // Resolution
  responseId: "reference_to_response", // null until resolved
  resolvedAt: Timestamp,
  
  // Metadata
  priority: "normal", // "low" | "normal" | "high"
  createdAt: Timestamp
}
```

**Indexes**: status, assignedTo, createdAt

#### feedback Collection

```javascript
{
  feedbackId: "auto_generated_id",
  queryId: "reference_to_query",
  responseId: "reference_to_response",
  userId: "firebase_auth_uid",
  
  rating: "helpful", // "helpful" | "not_helpful"
  comment: "Very useful information, thank you!", // optional
  
  createdAt: Timestamp
}
```

**Indexes**: queryId, rating

### Firebase Storage Structure

```
/audio/
  /{userId}/
    /{queryId}.webm
    
/images/
  /{userId}/
    /{queryId}.jpg
    
/responses/
  /{queryId}/
    /ai_response.mp3
    /officer_response.mp3 (if applicable)
```

**File Naming Convention**
- Audio: `{timestamp}_{userId}.webm`
- Images: `{timestamp}_{userId}.jpg`
- Responses: `{queryId}_response.mp3`

**Access Control**
- Users can only read/write their own files
- Officers can read all files
- Admins have full access

### Data Relationships

```
User 1 -----> N Queries
Query 1 -----> N Responses
Query 1 -----> 0..1 Escalation
Query 1 -----> 0..N Feedback
Escalation 1 -> 1 Response (when resolved)
Officer 1 ---> N Escalations (assigned)
```

---

## User Workflows

### Workflow 1: Farmer Submits Text Query

**Actors**: Farmer

**Preconditions**: User is logged in

**Steps**

1. Farmer opens the PWA in mobile browser or launches it from home screen
2. PWA displays home screen with "Ask a Question" button
3. Farmer taps "Ask a Question"
4. PWA displays query type selection: Text | Voice | Image
5. Farmer selects "Text"
6. PWA displays text input field
7. Farmer types question: "How to increase wheat yield?"
8. Farmer taps "Submit"
9. PWA shows loading indicator
10. Backend receives query, calls GPT-4 API
11. GPT-4 generates response in 3 seconds
12. Backend saves query and response to Firestore
13. Backend returns response to the Farmer Progressive Web App
14. PWA displays response with "Play Audio" button
15. Farmer reads response
16. Farmer optionally taps "Play Audio"
17. PWA plays TTS audio response via HTML5 Audio element
18. Farmer marks response as "Helpful" or "Not Helpful"
19. Feedback saved to Firestore

**Postconditions**
- Query and response saved in database
- Feedback recorded
- Query visible in history

**Alternative Flow: Low Confidence**
- Step 11a: GPT-4 response has low confidence (< 70%)
- Step 11b: Backend creates escalation record
- Step 11c: Backend returns partial response with "Expert will review"
- Step 11d: Officer receives escalation in dashboard

**Alternative Flow: Offline Submission**
- Step 9a: App detects no network
- Step 9b: Query saved to IndexedDB
- Step 9c: PWA displays "Queued for submission" status indicator
- Step 9d: When online, PWA automatically submits queued query
- Workflow continues from Step 10

---

### Workflow 2: Farmer Submits Voice Query

**Actors**: Farmer

**Preconditions**: User is logged in, microphone permission granted

**Steps**

1. Farmer selects "Voice" query type
2. PWA displays record button with animated recording indicator
3. Farmer taps and holds record button
4. PWA requests microphone permission via `getUserMedia`, then starts recording with MediaRecorder API (max 60 seconds)
5. Farmer asks question: "Mere gehun ke patte peelay ho rahe hain, kya karoon?"
6. Farmer releases button
7. PWA stops recording
8. PWA displays playback controls
9. Farmer reviews recording, taps "Submit"
10. PWA uploads audio to Firebase Storage
11. Backend receives audio URL
12. Backend converts WebM audio to WAV format, then calls Whisper API for transcription
13. Whisper returns text: "My wheat leaves are turning yellow, what should I do?"
14. Backend displays transcription to user for confirmation (optional)
15. Backend processes as text query (follows Workflow 1 from Step 10)
16. Response includes audio playback

**Postconditions**
- Audio file stored in Firebase Storage
- Transcription saved with query
- Response delivered as text and audio

**Alternative Flow: Re-record**
- Step 9a: Farmer taps "Re-record"
- Workflow returns to Step 3

---

### Workflow 3: Farmer Submits Image Query

**Actors**: Farmer

**Preconditions**: User is logged in, camera/gallery permission granted

**Steps**

1. Farmer selects "Image" query type
2. PWA displays options: Take Photo | Choose from Gallery
3. Farmer selects "Take Photo"
4. PWA activates device camera via `<input capture="environment">` or `getUserMedia` Camera API
5. Farmer captures image of diseased wheat leaf
6. PWA displays image preview
7. Farmer optionally adds text description: "Spots on leaves"
8. Farmer taps "Submit"
9. PWA compresses image to < 1MB using Canvas API
10. PWA uploads image to Firebase Storage
11. Backend receives image URL
12. Backend calls Plant.id API with image
13. Plant.id returns: Disease = "Leaf Rust", Confidence = 88%
14. Backend generates treatment prompt for GPT-4
15. GPT-4 returns treatment steps
16. Backend combines disease name + treatment into response
17. Backend saves query and response
18. PWA displays: "Disease: Leaf Rust (88% confidence)" + treatment steps
19. PWA offers audio playback option
20. Farmer reads and listens to response

**Postconditions**
- Image stored in Firebase Storage
- Disease identified and saved
- Treatment recommendations provided

**Alternative Flow: Gallery Selection**
- Step 3a: Farmer selects "Choose from Gallery"
- Step 4a: PWA opens device photo library via file input
- Step 5a: Farmer selects existing image
- Workflow continues from Step 6

**Alternative Flow: Failed Detection**
- Step 13a: Plant.id confidence < 70%
- Step 13b: Backend creates escalation
- Step 13c: Response: "Unable to identify disease. Expert will review your image."

---

### Workflow 4: Query Escalation to Officer

**Actors**: System, Officer

**Preconditions**: Query has low confidence or marked unhelpful

**Automatic Escalation Steps**

1. AI generates response with confidence = 65%
2. System detects confidence < 70%
3. System creates escalation record in Firestore
   - escalationId: auto-generated
   - queryId: reference
   - reason: "Low confidence (65%)"
   - status: "pending"
4. System sends partial response to farmer with note: "An expert will review your question."
5. Officer dashboard polls Firestore every 30 seconds
6. Officer sees new escalation in queue
7. Officer clicks on escalation
8. Dashboard displays: Query, AI response, farmer info, image/audio if applicable
9. Officer reviews and clicks "Respond"
10. Officer types response: "Based on your description, apply fungicide X..."
11. Officer clicks "Submit"
12. Backend creates response record (type = "officer")
13. Backend updates escalation status to "resolved"
14. Backend sends push notification to farmer
15. Farmer opens notification
16. PWA displays officer's response
17. Farmer reads response

**Manual Escalation Steps (User Feedback)**

1. Farmer receives AI response
2. Farmer reads and finds it unhelpful
3. Farmer taps "Not Helpful"
4. System creates escalation record (reason: "User marked not helpful")
5. Workflow continues from Step 5 above

**Postconditions**
- Escalation resolved
- Farmer receives expert response
- Escalation metrics updated

---

### Workflow 5: Officer Reviews Analytics

**Actors**: Officer, Admin

**Preconditions**: Officer is logged in

**Steps**

1. Officer logs into web dashboard
2. Dashboard displays default analytics view (last 7 days)
3. Officer views metrics:
   - Total queries: 247
   - By type: Text (60%), Voice (30%), Image (10%)
   - Escalation rate: 12%
   - Avg response time: 4.2 seconds
4. Officer selects date range: Last 30 days
5. Dashboard updates charts and numbers
6. Officer views "Top Query Categories" chart:
   - Pest control: 35%
   - Disease management: 28%
   - Fertilizer: 20%
   - Irrigation: 17%
7. Officer clicks "Export Data"
8. System generates CSV file with all queries in selected range
9. Browser downloads CSV file
10. Officer reviews data in spreadsheet

**Postconditions**
- Officer has insights into farmer issues
- Data exported for reporting

---

## Security and Authentication

### Authentication Strategy

**User Registration and Login**

**Farmers**: Phone OTP-based authentication via Firebase Auth

**Process**
1. Farmer enters phone number
2. Firebase sends OTP via SMS
3. Farmer enters OTP
4. Firebase verifies OTP
5. Backend creates user record (if new)
6. Backend issues JWT token
7. PWA stores token securely in browser (httpOnly cookie or localStorage)

**Officers/Admins**: Email and password authentication

**Process**
1. Officer enters email and password
2. Firebase Auth verifies credentials
3. Backend verifies user role = "officer" or "admin"
4. Backend issues JWT token
5. Token stored in browser localStorage or httpOnly cookie

### JWT Token Structure

**Payload**

```javascript
{
  userId: "firebase_auth_uid",
  role: "farmer", // "farmer" | "officer" | "admin"
  phone: "+911234567890", // only for farmers
  iat: 1612345678, // issued at
  exp: 1614937678  // expires at (30 days)
}
```

**Signing Algorithm**: HS256  
**Secret Key**: Stored in environment variable `JWT_SECRET`

### API Authentication Middleware

**Protected Endpoints**

All endpoints except `/api/auth/*` require valid JWT.

**Middleware Implementation**

```javascript
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

**Role-Based Access Control**

```javascript
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Usage
app.get('/api/analytics/*', authenticateToken, requireRole('officer'), ...);
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isOfficer() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['officer', 'admin'];
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isOfficer();
    }
    
    // Queries collection
    match /queries/{queryId} {
      allow read: if isOwner(resource.data.userId) || isOfficer();
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId);
    }
    
    // Responses collection
    match /responses/{responseId} {
      allow read: if isAuthenticated();
      allow write: if isOfficer();
    }
    
    // Escalations collection
    match /escalations/{escalationId} {
      allow read: if isOfficer();
      allow write: if isOfficer();
    }
    
    // Feedback collection
    match /feedback/{feedbackId} {
      allow read: if isOfficer();
      allow create: if isAuthenticated();
    }
  }
}
```

### Firebase Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Audio files
    match /audio/{userId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Image files
    match /images/{userId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Response audio
    match /responses/{queryId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if false; // Only backend can write
    }
  }
}
```

### Data Validation

**Backend Input Validation**

Using `express-validator` for all API endpoints:

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/queries',
  authenticateToken,
  [
    body('type').isIn(['text', 'voice', 'image']),
    body('content').optional().isString().isLength({ max: 500 }),
    body('audioUrl').optional().isURL(),
    body('imageUrl').optional().isURL()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
);
```

**File Upload Validation**

- Max file size: 5MB for images, 10MB for audio
- Allowed file types: JPEG, PNG for images; WebM, MP3, WAV for audio
- Virus scanning: Not implemented (acceptable for academic project)

### HTTPS Enforcement

**Production Deployment**
- Vercel (web dashboard): Automatic HTTPS
- Render/Railway (backend): Automatic HTTPS
- Firebase: Automatic HTTPS for all services

**Development**
- Local development: HTTP acceptable
- Production: HTTPS enforced

### Secrets Management

**Environment Variables**

```bash
# Backend .env file
JWT_SECRET=random_256_bit_secret
OPENAI_API_KEY=sk-...
PLANTID_API_KEY=...
GOOGLE_APPLICATION_CREDENTIALS=./firebase-key.json
FIREBASE_PROJECT_ID=dko-project
NODE_ENV=production
```

**Security Practices**
- Never commit .env files to Git
- Use separate keys for development and production
- Rotate secrets periodically (every 90 days)
- Store production secrets in deployment platform (Render/Railway environment variables)

---

## Deployment Strategy

### Deployment Architecture

**Component Locations**

| Component | Platform | URL |
|-----------|----------|-----|
| Farmer PWA | Vercel | dko.vercel.app/farmer |
| Officer Dashboard | Vercel | dko.vercel.app/dashboard |
| Backend API | Render or Railway | dko-api.onrender.com |
| Database | Firebase Firestore | N/A |
| Authentication | Firebase Auth | N/A |
| File Storage | Firebase Storage | N/A |

### Farmer PWA Deployment (Vercel)

The Farmer Progressive Web App is deployed on Vercel alongside the Officer Dashboard. Users access the PWA by navigating to its URL in a mobile browser. Once loaded, they can install it on their home screen using the browser's "Add to Home Screen" prompt — no app store submission required.

**Development Testing**

1. Run `npm run dev` in the project root
2. Open `http://localhost:3000/farmer` in Chrome on desktop to test the Farmer PWA
3. Use Chrome DevTools device emulation for mobile testing
4. For on-device testing, use `ngrok` to expose localhost to a public URL and open on a smartphone
5. Verify Service Worker registration in DevTools → Application tab
6. Run Lighthouse PWA audit at `/farmer` route to validate installability and offline support

**Production Deployment**

1. Push code to GitHub repository
2. Connect the repository root to a single Vercel project
3. Vercel auto-deploys on every push to `main` branch
4. Farmer PWA: users visit `dko.vercel.app/farmer` in mobile browser and install via "Add to Home Screen"
5. Officer Dashboard: officers access `dko.vercel.app/dashboard` from desktop or laptop

**Configuration**

```javascript
// next.config.js (project root — configures PWA for /farmer route)
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
});

module.exports = withPWA({
  reactStrictMode: true,
});
```

**Distribution**
- Share PWA URL with evaluators
- Users open URL in mobile browser and tap "Add to Home Screen"
- No Google Play Store or Apple App Store submission required

### Next.js Application Deployment (Vercel)

Both the Farmer Progressive Web App (`/farmer`) and the Officer Web Dashboard (`/dashboard`) are deployed together as a single Next.js application on Vercel. This simplifies deployment and keeps both interfaces within the same codebase.

**Automatic Deployment**

1. Push code to GitHub repository
2. Connect repository root to a single Vercel project
3. Vercel auto-deploys on every push to `main` branch
4. Both `/farmer` and `/dashboard` routes are served from `dko.vercel.app`

**Configuration**

```javascript
// vercel.json
{
  "builds": [
    { "src": "package.json", "use": "@vercel/next" }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://dko-api.onrender.com",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID": "dko-project",
    "NEXT_PUBLIC_FIREBASE_API_KEY": "..."
  }
}
```

**Access URLs**
- Farmer PWA: `dko.vercel.app/farmer`
- Officer Dashboard: `dko.vercel.app/dashboard`
- Free Vercel subdomain is used (no custom domain required for academic prototype)

### Backend API Deployment (Render)

**Service Configuration**

```yaml
# render.yaml
services:
  - type: web
    name: dko-backend
    env: node
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: JWT_SECRET
        sync: false
      - key: OPENAI_API_KEY
        sync: false
```

**Deployment Steps**

1. Push code to GitHub
2. Create new Web Service in Render dashboard
3. Connect GitHub repository
4. Configure environment variables
5. Deploy

**Health Check Endpoint**

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});
```

**Alternative: Railway**

- Similar deployment process
- Connect GitHub repository
- Configure environment variables
- Automatic deployments on push

### Firebase Setup

**Firestore Database**

1. Create Firebase project: `dko-project`
2. Enable Firestore in Firebase Console
3. Set security rules (see Security section)
4. Create indexes:
   - users: phone, role
   - queries: userId, status, createdAt
   - escalations: status, assignedTo

**Firebase Authentication**

1. Enable Phone authentication
2. Configure authorized domains (localhost, Vercel domain)
3. Enable Email/Password for officers (optional)

**Firebase Storage**

1. Enable Firebase Storage
2. Create folders: audio/, images/, responses/
3. Set security rules (see Security section)

**Firebase Admin SDK Setup**

1. Generate service account key
2. Download JSON key file
3. Store as `firebase-key.json` (gitignored)
4. Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable in Render/Railway

### Database Initialization

**Seed Data Script**

```javascript
// scripts/seedData.js
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-key.json'))
});

const db = admin.firestore();

async function seedUsers() {
  await db.collection('users').doc('admin_uid').set({
    phone: null,
    role: 'admin',
    name: 'Admin User',
    email: 'admin@dko.com',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  await db.collection('users').doc('officer_uid').set({
    phone: null,
    role: 'officer',
    name: 'Agricultural Officer',
    email: 'officer@dko.com',
    region: 'Punjab',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
}

seedUsers().then(() => console.log('Seed complete'));
```

**Run Seeding**

```bash
node scripts/seedData.js
```

### Environment Variables Management

**Next.js Application (.env.local)** — shared by Farmer PWA and Officer Dashboard

```bash
NEXT_PUBLIC_API_URL=https://dko-api.onrender.com
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dko-project
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dko-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dko-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

**Backend (.env)**

```bash
PORT=3000
JWT_SECRET=...
OPENAI_API_KEY=...
PLANTID_API_KEY=...
GOOGLE_APPLICATION_CREDENTIALS=./firebase-key.json
FIREBASE_PROJECT_ID=dko-project
```

### Monitoring and Logging

**Backend Logging**

- Use `morgan` for HTTP request logging
- Console.log for errors (no external logging service)
- Monitor Render/Railway logs via dashboard

**Error Tracking**

- Basic try-catch error handling
- Error responses logged to console
- No Sentry or external monitoring (cost constraint)

**Performance Monitoring**

- Manual testing of response times
- Firebase Console for Firestore usage
- Render/Railway metrics for CPU/memory

### Rollback Strategy

**Backend**

1. Identify last working deployment in Render/Railway
2. Revert to previous commit in GitHub
3. Trigger new deployment

**Web Dashboard**

1. Vercel automatically keeps deployment history
2. Revert to previous deployment via Vercel dashboard

**Farmer PWA**

1. Vercel automatically keeps deployment history
2. Revert to previous deployment via Vercel dashboard

### Pre-Launch Checklist

**Farmer PWA**
- [ ] Test on physical Android device in Chrome browser
- [ ] Test "Add to Home Screen" installation and standalone mode
- [ ] Verify Service Worker registration and offline queue functionality
- [ ] Test voice recording via MediaRecorder API (microphone permission)
- [ ] Test audio playback before submission
- [ ] Test image capture via Camera API and gallery file input
- [ ] Verify push notifications via Web Push API
- [ ] Run Lighthouse PWA audit (score > 90)
- [ ] Test login/logout flow

**Web Dashboard**
- [ ] Test on Chrome, Firefox, Safari
- [ ] Verify officer authentication
- [ ] Test escalation queue display
- [ ] Test response submission
- [ ] Verify analytics charts
- [ ] Test CSV export

**Backend API**
- [ ] Test all endpoints with Postman
- [ ] Verify JWT authentication
- [ ] Test AI integrations (GPT-4, Whisper, Plant.id)
- [ ] Verify file uploads to Firebase Storage
- [ ] Test error handling
- [ ] Verify CORS configuration

**Firebase**
- [ ] Verify security rules
- [ ] Test authentication flows
- [ ] Verify Firestore indexes
- [ ] Check storage permissions

**Integration Testing**
- [ ] Submit query from mobile → verify in Firestore
- [ ] Escalate query → verify in dashboard
- [ ] Submit officer response → verify farmer receives notification
- [ ] Test full end-to-end workflows

---

## Success Metrics

The following criteria define a successful prototype submission. Success is evaluated across four dimensions: functional completeness, performance benchmarks, user experience validation, and demonstration readiness.

### Functional Completeness

**Must-Have Features** (100% required for submission)

- [ ] Farmer authentication via phone OTP (Firebase Auth)
- [ ] Officer authentication via email and password (Firebase Auth)
- [ ] Text query submission and AI response (GPT-4)
- [ ] Voice query submission with transcription (Whisper API)
- [ ] Image query submission with disease detection (Plant.id API)
- [ ] Query history display in Farmer Progressive Web App
- [ ] Feedback submission (helpful / not helpful)
- [ ] Automatic and manual escalation mechanism
- [ ] Officer Web Dashboard with escalation queue display
- [ ] Officer manual response submission
- [ ] Farmer push notification upon officer response
- [ ] Complete end-to-end query-to-response workflow functional

**Should-Have Features** (80% target)

- [ ] Offline query queue (IndexedDB storage and automatic sync)
- [ ] Text-to-speech audio responses (Google Cloud TTS)
- [ ] Analytics dashboard with charts
- [ ] CSV export functionality
- [ ] Search in query history

**Nice-to-Have Features** (50% target)

- [ ] Multi-language support (Hindi)
- [ ] Crop disease similarity matching
- [ ] Officer assignment to regions
- [ ] Advanced filtering in dashboard

### Performance Benchmarks

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| AI text response time | < 5 seconds | Manual testing with timer |
| Image processing time | < 10 seconds | Manual testing |
| Voice transcription time | < 8 seconds | Manual testing |
| Farmer PWA load time (first visit) | < 3 seconds | Lighthouse audit / device testing |
| Farmer PWA load time (subsequent, cached) | < 1 second | Browser DevTools Network tab |
| Officer Dashboard load time | < 3 seconds | Browser DevTools |
| Backend API latency (excluding AI) | < 500ms | Postman response time |
| Offline sync success rate | > 95% | Test with 20 offline queries |

### User Experience Validation

**Farmer Progressive Web App**
- Zero crashes or unhandled errors during demonstration
- Smooth screen transitions and clear loading indicators
- Readable text on low-end device screens (tested on mid-range Android)
- Intuitive navigation achievable within 3 taps for any primary feature
- PWA installs successfully from Chrome on Android via "Add to Home Screen"
- Offline query submission and sync functions correctly in field simulation

**Officer Web Dashboard**
- Professional and clean appearance suitable for formal demonstration
- Responsive design functional on both desktop and tablet viewports
- Data visualizations (charts) display clearly and update on date filter change
- Officer can complete the full escalation-response workflow in under 5 clicks

### AI Quality Metrics

**Response Quality** (Manual Evaluation)

- Relevant response: > 80% of test queries
- Actionable advice: > 70% of responses
- Correct disease identification: > 75% accuracy (limited by Plant.id API)

**Escalation Effectiveness**

- True positive escalations: > 80% (queries that actually needed expert help)
- False positive escalations: < 20% (queries that could have been handled by AI)

### Technical Stability

**Zero Critical Bugs**
- No data loss
- No authentication failures
- No payment issues (N/A - no payments)
- No security breaches

**Acceptable Minor Bugs**
- UI layout issues on specific devices
- Delayed notifications (< 30 seconds)
- Intermittent API timeouts (rare)

### Demonstration Readiness

The prototype must demonstrate end-to-end functional workflows during evaluation. The following five scenarios must operate without failure:

**Required Demo Scenarios**

1. **Complete Query Workflow**: Farmer submits a text query via the Farmer PWA, receives an AI-generated response, and plays the audio response.
2. **Image-Based Disease Detection**: Farmer uploads a crop image, the system identifies the disease, and treatment recommendations are displayed.
3. **Escalation System**: Farmer marks an AI response as "Not Helpful"; the query is automatically escalated and appears in the Officer Web Dashboard.
4. **Officer Response Workflow**: Officer reviews the escalated query, submits a manual expert response, and the farmer receives a push notification.
5. **Analytics Dashboard Demonstration**: Officer or Admin views the analytics dashboard, applies a date range filter, and exports data to a CSV file.

**Demo Environment Prerequisites**
- Stable internet connection during evaluation
- Pre-loaded sample data (minimum 10-20 queries in Firestore)
- Farmer and officer test user accounts created in Firebase Auth
- All third-party API keys (OpenAI, Plant.id, Google TTS) verified as active

### Academic Evaluation Criteria

**Alignment with Project Documentation**
- All features described in this PRD and the project report are functional
- System architecture diagram matches implementation
- Technology stack reflects what was documented
- All user workflows operate as described

**Code Quality**
- Code is clean, readable, and consistently formatted (Prettier)
- Architecture is modular with clear separation of concerns
- Error handling is present for all API calls and user interactions
- Complex logic is annotated with inline comments

**Technical Documentation**
- Repository includes a README with setup and deployment instructions
- API endpoints are documented with request/response formats
- Architecture overview is available for evaluator reference
- Known limitations are clearly stated

**Innovation and Problem-Solving**
- Effective use of GPT-4 prompt engineering for agricultural advice
- Practical AI-human escalation mechanism
- Offline query capability via IndexedDB
- Multimodal input (text, voice, image) handled in a single cohesive interface
- PWA architecture enabling mobile access without native app distribution

---

## Project Timeline

### Phase 1: Foundation (Week 1-2)

**Week 1: Setup and Infrastructure**

| Day | Task | Deliverable |
|-----|------|-------------|
| 1-2 | Firebase project setup | Firestore, Auth, Storage configured |
| 2-3 | Backend API scaffolding | Express server running locally |
| 3-4 | Farmer PWA initialization | Next.js PWA project created with next-pwa |
| 4-5 | Web dashboard initialization | Next.js project created |
| 5-7 | Authentication implementation | Phone OTP and email/password working |

**Week 2: Core AI Integration**

| Day | Task | Deliverable |
|-----|------|-------------|
| 8-9 | OpenAI GPT-4 integration | Text query processing working |
| 9-10 | Whisper API integration | Voice transcription working |
| 10-11 | Plant.id API integration | Image disease detection working |
| 11-12 | Knowledge base creation | 50 Q&A pairs in JSON |
| 12-14 | Response confidence logic | Escalation triggering correctly |

### Phase 2: Core Features (Week 3-4)

**Week 3: Farmer Progressive Web App**

| Day | Task | Deliverable |
|-----|------|-------------|
| 15-16 | Text query UI and submission | Complete text flow |
| 16-17 | Voice recording and submission | Complete voice flow |
| 17-18 | Image capture and submission | Complete image flow |
| 18-19 | Response display and TTS | Audio playback working |
| 19-21 | Query history and feedback | History screen functional |

**Week 4: Officer Dashboard**

| Day | Task | Deliverable |
|-----|------|-------------|
| 22-23 | Dashboard layout and routing | Navigation working |
| 23-24 | Escalation queue display | List of escalations shown |
| 24-25 | Manual response submission | Officers can respond |
| 25-26 | Analytics implementation | Charts displaying data |
| 26-28 | CSV export functionality | Download working |

### Phase 3: Refinement (Week 5-6)

**Week 5: Integration and Testing**

| Day | Task | Deliverable |
|-----|------|-------------|
| 29-30 | End-to-end testing | All workflows verified |
| 30-31 | Offline queue implementation | Queuing working |
| 31-32 | Push notifications | Notifications delivered |
| 32-33 | Bug fixes | Critical bugs resolved |
| 33-35 | Performance optimization | Response times improved |

**Week 6: Polish and Deployment**

| Day | Task | Deliverable |
|-----|------|-------------|
| 36-37 | UI/UX improvements | Professional appearance |
| 37-38 | Deployment to Vercel/Render | Apps live and accessible |
| 38-39 | Demo data preparation | Sample queries loaded |
| 39-40 | Documentation | README and guides complete |
| 40-42 | Final testing and rehearsal | Demo scenarios practiced |

### Milestones

**Milestone 1 (Week 2)**: Authentication and AI integration complete  
**Milestone 2 (Week 4)**: All core features functional  
**Milestone 3 (Week 6)**: Production-ready prototype deployed

### Buffer Time

- Built-in 2-day buffer for unexpected issues
- Holidays and personal time accounted for
- Scope reduction possible if timeline slips

---

## Risks and Mitigations

### Technical Risks

**Risk 1: OpenAI API Rate Limits or Downtime**

**Impact**: High  
**Probability**: Low

**Mitigation**
- Use GPT-3.5 as fallback for text queries
- Implement retry logic with exponential backoff
- Cache responses for identical queries
- Prepare static responses for demo if API unavailable

**Contingency**
- Switch to Anthropic Claude API (similar pricing)
- Use Hugging Face open-source models (lower quality, but free)

---

**Risk 2: Plant.id API Free Tier Exhausted**

**Impact**: Medium  
**Probability**: Medium

**Mitigation**
- Limit demo to 50 image queries
- Use cached results for repeated demo images
- Prepare backup images with known results

**Contingency**
- Switch to alternative Crop Health API
- Use static JSON mapping of sample images to diseases
- Demo with pre-recorded video of image processing

---

**Risk 3: Firebase Free Tier Limits Exceeded**

**Impact**: Medium  
**Probability**: Low

**Mitigation**
- Monitor usage via Firebase Console
- Limit data reads with pagination
- Cache frequently accessed data
- Delete test data after development

**Limits**
- Firestore: 1GB storage, 50K reads/day, 20K writes/day
- Storage: 1GB, 5GB/day downloads
- Auth: 10K verifications/month

**Contingency**
- Upgrade to Blaze plan (pay-as-you-go, likely < $5)
- Use MongoDB Atlas free tier (512MB)

---

**Risk 4: Speech-to-Text Accuracy Issues**

**Impact**: Medium  
**Probability**: Medium

**Mitigation**
- Use high-quality audio recording (48kHz sample rate)
- Test with clear speech in controlled environment
- Provide transcription preview for user confirmation
- Fallback to text input if transcription fails

**Contingency**
- Display transcribed text and allow manual editing
- Use Google Cloud Speech-to-Text as alternative

---

**Risk 5: Deployment Platform Downtime**

**Impact**: High (during demo)  
**Probability**: Low

**Mitigation**
- Use reliable platforms (Vercel, Render have 99%+ uptime)
- Test deployments 48 hours before evaluation
- Prepare local development environment as backup

**Contingency**
- Run backend locally with ngrok for public URL
- Use localhost for web dashboard during demo
- Record demo video as fallback

---

### Project Management Risks

**Risk 6: Feature Creep**

**Impact**: High  
**Probability**: Medium

**Mitigation**
- Strictly adhere to PRD scope
- Prioritize must-have features only
- Defer nice-to-have features to post-evaluation
- Weekly scope review to cut features if needed

**Prevention**
- Clear requirements documented (this PRD)
- Focus on 90/30 rule: 90% features, 30% effort

---

**Risk 7: Timeline Delays**

**Impact**: High  
**Probability**: Medium

**Mitigation**
- 2-day buffer built into timeline
- Daily progress tracking
- Prioritize blockers immediately
- Reduce scope if behind schedule

**Escalation Plan**
- Week 3: Cut offline queue feature
- Week 4: Cut analytics dashboard
- Week 5: Cut TTS audio responses
- Core demo scenarios must always work

---

**Risk 8: Third-Party API Changes**

**Impact**: Medium  
**Probability**: Low

**Mitigation**
- Pin API versions where possible
- Monitor API provider announcements
- Test APIs weekly during development

**Contingency**
- Use mocked responses for demo
- Switch to alternative APIs

---

### Data and Security Risks

**Risk 9: Data Loss**

**Impact**: Low (demo data)  
**Probability**: Low

**Mitigation**
- Regular Firestore data exports (manual)
- Test data backed up locally
- Version control for code

**Recovery**
- Re-run seed script to restore sample data
- Firestore data recovery via Firebase Console (up to 7 days)

---

**Risk 10: Security Vulnerability**

**Impact**: Low (academic project, no real user data)  
**Probability**: Low

**Mitigation**
- Follow security best practices (HTTPS, JWT, input validation)
- Firebase security rules properly configured
- No sensitive data stored (demo only)

**Response**
- Fix critical vulnerabilities before evaluation
- Document known limitations in README

---

### Evaluation Risks

**Risk 11: Demo Failure**

**Impact**: Critical  
**Probability**: Low

**Mitigation**
- Rehearse demo scenarios 3 times before evaluation
- Prepare backup video recording of successful demo
- Have evaluator accounts pre-created
- Test on actual demo device 24 hours prior

**Backup Plan**
- Video walkthrough of all features
- Code walkthrough if live demo fails
- Screenshots of working features

---

**Risk 12: Evaluator Misalignment**

**Impact**: Medium  
**Probability**: Low

**Mitigation**
- Clearly state project scope and limitations upfront
- Emphasize "working prototype" vs "production system"
- Document trade-offs and justifications in PRD
- Align demo with project report

**Communication Strategy**
- "This demonstrates AI-human collaboration in agriculture"
- "Focus is on functional workflows, not production scale"
- "APIs chosen for rapid development and demonstration"

---

## Future Enhancements

### Post-Evaluation Improvements

The following features are intentionally excluded from the initial prototype to meet the academic deadline. They represent logical next steps for production deployment.

### Enhanced AI Capabilities

**1. Fine-Tuned Models**

- Fine-tune GPT-3.5 on agricultural dataset for better accuracy
- Train custom disease detection model on local crop diseases
- Improve confidence scoring with domain-specific calibration

**2. Advanced RAG Implementation**

- Vector database (Pinecone, Weaviate) for semantic search
- Embedding-based knowledge retrieval
- Dynamic knowledge base updates from extension officer responses

**3. Multi-Language Support**

- Hindi, Punjabi, Tamil, Telugu voice and text support
- Language detection and automatic translation
- Regional dialect handling

### User Experience Enhancements

**4. Personalized Recommendations**

- Track farmer's crop types and provide proactive tips
- Seasonal reminders (planting, fertilizing, harvesting)
- Location-based weather integration

**5. Rich Media Responses**

- Video tutorials for complex treatments
- Step-by-step illustrated guides
- Comparison images of healthy vs diseased crops

**6. Social Features**

- Community forum for farmers
- Peer-to-peer advice sharing
- Success story showcases

### System Improvements

**7. Advanced Analytics**

- Predictive outbreak modeling (disease spread prediction)
- Farmer sentiment analysis from feedback
- Officer performance metrics
- Regional trend identification

**8. Scalability Enhancements**

- Microservices architecture
- Redis caching layer
- Message queue for asynchronous processing (RabbitMQ, Kafka)
- Auto-scaling infrastructure

**9. Integration with External Systems**

- Government agricultural databases
- Weather APIs for localized forecasts
- Market price information
- Subsidy and scheme information

### Farmer PWA Enhancements

**10. Offline-First Architecture**

- Full offline functionality with local LLM
- Sync conflict resolution
- Enhanced offline-first architecture with local caching of AI responses

**11. Advanced Camera Features**

- Real-time disease detection (camera viewfinder overlay)
- Multiple image angles for better diagnosis
- Image enhancement (brightness, contrast auto-adjustment)

**12. Geolocation Features**

- Automatic region detection
- Nearby agricultural officer finder
- Soil type database by location

### Officer Dashboard Enhancements

**13. Advanced Escalation Management**

- Priority scoring algorithm
- Automatic assignment based on expertise
- SLA tracking and alerts
- Bulk response templates

**14. Farmer Insights**

- Individual farmer profiles and history
- Risk scoring (farmers needing urgent attention)
- Follow-up reminders

**15. Collaboration Tools**

- Internal chat between officers
- Case discussion forums
- Second opinion requests

### Business and Operational

**16. Monetization Options**

- Premium features for commercial farmers
- API access for agri-tech companies
- Subscription tiers (basic, pro, enterprise)

**17. Compliance and Certification**

- Pesticide usage tracking for organic certification
- Compliance with agricultural regulations
- Data export for government reporting

**18. Hardware Integration**

- IoT soil sensors
- Drone imagery integration
- Weather station data

### Research and Development

**19. Research Dataset Generation**

- Anonymized dataset for agricultural AI research
- Disease outbreak pattern analysis
- Contribution to open agricultural knowledge bases

**20. Experimental Features**

- Crop yield prediction using historical data
- Optimal planting date calculator
- Fertilizer recommendation engine based on soil tests

---

### Prioritization Framework for Future Work

**High Priority** (Next 6 months)
- Multi-language support
- Advanced analytics
- Scalability improvements

**Medium Priority** (6-12 months)
- Personalized recommendations
- Rich media responses
- Offline-first architecture

**Low Priority** (12+ months)
- Social features
- Hardware integration
- Experimental AI features

---

## Appendices

### Appendix A: API Endpoint Reference

**Base URL**: `https://dko-api.onrender.com/api`

#### Authentication Endpoints

**POST /auth/register**

Request:
```json
{
  "phone": "+911234567890",
  "name": "Ramesh Kumar"
}
```

Response:
```json
{
  "success": true,
  "message": "OTP sent",
  "userId": "firebase_uid"
}
```

**POST /auth/verify-otp**

Request:
```json
{
  "phone": "+911234567890",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "userId": "firebase_uid",
    "phone": "+911234567890",
    "role": "farmer",
    "name": "Ramesh Kumar"
  }
}
```

#### Query Endpoints

**POST /queries**

Request:
```json
{
  "type": "text",
  "content": "How to treat wheat rust?",
  "language": "en"
}
```

Response:
```json
{
  "success": true,
  "queryId": "query_123",
  "response": {
    "content": "To treat wheat rust: 1. Apply fungicide...",
    "confidence": 85,
    "audioUrl": "https://storage.../response.mp3",
    "type": "ai"
  }
}
```

**GET /queries/:id**

Response:
```json
{
  "success": true,
  "query": {
    "queryId": "query_123",
    "userId": "farmer_uid",
    "type": "text",
    "content": "How to treat wheat rust?",
    "status": "answered",
    "createdAt": "2026-02-04T10:30:00Z",
    "response": { ... }
  }
}
```

**GET /queries/user/:userId**

Response:
```json
{
  "success": true,
  "queries": [
    { "queryId": "query_123", ... },
    { "queryId": "query_124", ... }
  ],
  "total": 15,
  "page": 1,
  "limit": 20
}
```

#### Escalation Endpoints

**GET /escalations** (Officer only)

Response:
```json
{
  "success": true,
  "escalations": [
    {
      "escalationId": "esc_001",
      "queryId": "query_125",
      "reason": "Low confidence (65%)",
      "status": "pending",
      "createdAt": "2026-02-04T11:00:00Z",
      "query": { ... }
    }
  ]
}
```

**POST /escalations/:id/respond**

Request:
```json
{
  "response": "Based on the image, this is leaf rust. Apply Tilt fungicide..."
}
```

Response:
```json
{
  "success": true,
  "responseId": "resp_456",
  "escalationId": "esc_001",
  "status": "resolved"
}
```

---

### Appendix B: Firestore Query Examples

**Fetch User's Queries**

```javascript
const queriesRef = db.collection('queries');
const snapshot = await queriesRef
  .where('userId', '==', userId)
  .orderBy('createdAt', 'desc')
  .limit(20)
  .get();

const queries = snapshot.docs.map(doc => ({
  queryId: doc.id,
  ...doc.data()
}));
```

**Fetch Pending Escalations**

```javascript
const escalationsRef = db.collection('escalations');
const snapshot = await escalationsRef
  .where('status', '==', 'pending')
  .orderBy('createdAt', 'asc')
  .get();

const escalations = snapshot.docs.map(doc => ({
  escalationId: doc.id,
  ...doc.data()
}));
```

**Create Query with Response**

```javascript
const batch = db.batch();

const queryRef = db.collection('queries').doc();
batch.set(queryRef, {
  userId: userId,
  type: 'text',
  content: 'How to treat wheat rust?',
  status: 'answered',
  createdAt: admin.firestore.FieldValue.serverTimestamp()
});

const responseRef = db.collection('responses').doc();
batch.set(responseRef, {
  queryId: queryRef.id,
  type: 'ai',
  content: 'To treat wheat rust...',
  generatedBy: 'gpt-4-turbo-preview',
  confidence: 85,
  createdAt: admin.firestore.FieldValue.serverTimestamp()
});

await batch.commit();
```

---

### Appendix C: Sample Prompts

**Text Query Prompt Template**

```
You are an expert agricultural advisor helping farmers in India.
Provide practical, actionable advice in simple English.

Farmer's question: "{user_query}"

Guidelines:
- Be concise (max 200 words)
- Use numbered steps for actionable advice
- Recommend organic solutions first, then chemical if necessary
- Mention when to consult an expert for serious issues
- Avoid complex technical jargon

Provide your response now:
```

**Disease Treatment Prompt Template**

```
A farmer has uploaded an image of their crop with the following issue:
Disease detected: {disease_name}
Confidence: {confidence}%
Crop type: {crop_type}

Provide treatment recommendations in the following format:

Immediate Actions:
1. [First step]
2. [Second step]

Treatment Options:
- Organic: [organic treatment]
- Chemical: [chemical treatment with safety precautions]

Prevention:
- [Preventive measure]

When to Seek Expert Help:
- [Conditions requiring expert consultation]

Keep it under 250 words and use simple language.
```

---

### Appendix D: Testing Checklist

**Farmer PWA Testing**

- [ ] Access PWA via browser URL on Android device
- [ ] "Add to Home Screen" prompt appears and installation succeeds
- [ ] PWA launches in standalone mode from home screen
- [ ] User registration with phone OTP
- [ ] Login and logout
- [ ] Text query submission
- [ ] Voice recording via MediaRecorder API (30 seconds)
- [ ] Voice playback before submit (HTML5 Audio)
- [ ] Image capture via Camera API
- [ ] Image selection from device gallery via file input
- [ ] Image preview before submit
- [ ] Response display (text)
- [ ] Response playback (audio)
- [ ] Mark response as helpful
- [ ] Mark response as not helpful (triggers escalation)
- [ ] View query history
- [ ] Search in history
- [ ] Delete query from history
- [ ] Offline queue (submit without internet, stored in IndexedDB)
- [ ] Automatic sync when connectivity restored (queries submitted from IndexedDB)
- [ ] Push notification reception via Web Push API
- [ ] Tap notification to view response
- [ ] Lighthouse PWA audit score > 90
- [ ] Service Worker active in DevTools → Application tab

**Web Dashboard Testing**

- [ ] Officer login with email/password
- [ ] View escalation queue
- [ ] Filter escalations by status
- [ ] Click on escalation to view details
- [ ] View farmer's original query
- [ ] View AI response (if any)
- [ ] View uploaded image (if applicable)
- [ ] Submit manual response
- [ ] Mark escalation as resolved
- [ ] View analytics dashboard
- [ ] Filter analytics by date range
- [ ] Export queries to CSV
- [ ] Export escalations to CSV
- [ ] CSV file downloads correctly
- [ ] Logout

**Backend API Testing** (Postman)

- [ ] POST /auth/register returns success
- [ ] POST /auth/verify-otp with valid OTP returns JWT
- [ ] POST /auth/verify-otp with invalid OTP returns error
- [ ] POST /queries without auth token returns 401
- [ ] POST /queries with auth token creates query
- [ ] GET /queries/:id returns query details
- [ ] POST /queries/:id/feedback saves feedback
- [ ] GET /escalations requires officer role
- [ ] POST /escalations/:id/respond creates response
- [ ] File upload endpoints accept images and audio
- [ ] Invalid inputs return 400 with error message

**AI Integration Testing**

- [ ] GPT-4 API call succeeds
- [ ] GPT-4 response is relevant to query
- [ ] Whisper API transcribes audio correctly
- [ ] Plant.id API identifies disease from image
- [ ] Confidence scoring triggers escalation at < 70%
- [ ] Knowledge base returns cached answer for known query
- [ ] TTS generates audio file successfully

**End-to-End Testing**

- [ ] Submit text query → receive AI response (< 5 sec)
- [ ] Submit voice query → transcribed and answered
- [ ] Submit image query → disease identified and treatment provided
- [ ] Mark response as "Not Helpful" → appears in officer dashboard
- [ ] Officer responds → farmer receives notification
- [ ] Analytics reflect all queries and escalations

---

### Appendix E: Known Limitations

**Scope Limitations**

1. **Single Language**: English only; no multi-language support
2. **Limited AI Accuracy**: Dependent on OpenAI and Plant.id API quality
3. **No Custom Training**: Using pretrained models; not optimized for Indian agriculture
4. **Basic Analytics**: No predictive insights or advanced visualizations
5. **No Real-Time Collaboration**: Officers cannot chat with farmers directly

**Technical Limitations**

1. **Free Tier Constraints**: Limited API calls, storage, and bandwidth
2. **No Load Balancing**: Single backend instance; not horizontally scalable
3. **Eventual Consistency**: Firestore may have slight delays in data propagation
4. **No Offline AI**: Farmer PWA requires internet for AI responses
5. **Basic Error Handling**: No comprehensive retry strategies or circuit breakers

**Data Limitations**

1. **Small Knowledge Base**: Only 50-100 Q&A pairs
2. **No Historical Data**: Cannot provide insights based on past seasons
3. **No Weather Integration**: Cannot consider current weather in recommendations
4. **No Soil Data**: Cannot tailor advice to specific soil types

**Security Limitations**

1. **No Rate Limiting**: APIs are not protected against abuse
2. **Basic Authentication**: No multi-factor authentication
3. **No Audit Logs**: Cannot track who accessed what data
4. **No Data Encryption at Rest**: Firebase default encryption only

**Platform Limitations**

1. **PWA Installation on iOS**: Safari supports "Add to Home Screen" but has limited Service Worker and Web Push support compared to Chrome on Android; offline sync and push notifications may be degraded on iOS
2. **MediaRecorder API**: WebM audio format used in Chrome; Safari may require fallback to MP4/AAC; Whisper API accepts both
3. **Desktop Only for Dashboard**: Officer web dashboard not optimized for mobile browsers
4. **Modern Browsers Required**: No support for IE or older browser versions
5. **No Offline AI**: Farmer PWA requires internet connectivity for AI responses; only query submission is queued offline

---

### Appendix F: Glossary

**API (Application Programming Interface)**: A set of protocols for building and integrating application software.

**Escalation**: The process of routing a query to a human expert when AI cannot provide a confident answer.

**Firebase**: Google's Backend-as-a-Service platform providing authentication, database, and storage.

**Firestore**: NoSQL document database by Firebase for storing and syncing data.

**GPT-4**: OpenAI's large language model used for natural language understanding and generation.

**IndexedDB**: A low-level browser API for client-side storage of significant amounts of structured data, used in the Farmer PWA for offline query queuing.

**MediaRecorder API**: A browser API that provides functionality to record media (audio/video), used in the Farmer PWA for voice query recording.

**JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties.

**OTP (One-Time Password)**: A password valid for only one login session or transaction.

**Plant.id API**: Third-party service for plant and disease identification from images.

**Progressive Web App (PWA)**: A web application that uses modern browser capabilities to deliver an app-like experience, including offline support, home screen installation, and push notifications, without requiring distribution through an app store.

**RAG (Retrieval-Augmented Generation)**: Technique combining information retrieval with language generation.

**TTS (Text-to-Speech)**: Technology that converts written text into spoken voice output.

**Service Worker**: A JavaScript file that the browser runs in the background, separate from a web page, enabling features such as offline caching, background sync, and push notifications in Progressive Web Apps.

**Web Push API**: A browser API that enables web applications to receive push notifications from a server even when the application is not open.

**Whisper**: OpenAI's automatic speech recognition (ASR) system for transcribing audio to text.

---

