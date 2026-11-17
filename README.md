# GitSummarizer

> **AI-powered public GitHub repository summarization, architectural breakdown, and readable release notes generation.**

[![Node.js Version](https://img.shields.io/badge/Node.js-v22%2B%20LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-v19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-v7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-v5%20(ESM)-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-SQLite%20(node%3Asqlite)-003B57?logo=sqlite&logoColor=white)](https://nodejs.org/api/sqlite.html)
[![AI Engine](https://img.shields.io/badge/AI-OpenAI%20%2B%20Heuristic%20Fallback-10A37F?logo=openai&logoColor=white)](https://platform.openai.com/)
[![Tests](https://img.shields.io/badge/Tests-11%20passing-brightgreen)](server/tests/backend.test.js)

---

## 📖 Overview

**GitSummarizer** turns dense READMEs, complex codebases, and sprawling commit histories into concise, structured, plain-English developer briefs.

Instead of spending hours cloning, configuring runtimes, and deciphering commit logs, developers, engineering managers, and open-source contributors can analyze any public GitHub repository in seconds.

### Key Capabilities

- ⚡ **Plain-English Overview**: Generates a beginner-friendly 2–3 paragraph summary explaining what the project does, why it exists, and its core architecture.
- 🧩 **Feature Extraction**: Automatically extracts the top technical strengths, capabilities, and distinct architectural features directly from the codebase documentation.
- 🛠️ **Prerequisites & Setup Commands**: Detects required languages, runtimes, package managers, and setup commands before cloning.
- 📜 **Recent Changes Digest**: Translates recent raw Git commits into clean, human-readable bullet points suitable for stakeholders and release notes.
- 🔐 **Authentication & User Isolation**: JWT-based session management (`scrypt` password hashing) with user-isolated history, plus a one-click Guest Explorer mode.
- 💾 **Zero-Config Persistence**: Built on Node.js native `node:sqlite` with automated schema migrations and transactional summary saves.
- 🤖 **Dual-Engine AI Intelligence**: Powered by OpenAI (`gpt-4o-mini`) with a built-in heuristic fallback engine for offline or API-key-free testing.
- 📱 **Adaptive Multi-Device Design**: Modern, responsive layout that optimizes across Mobile (< 640px), Tablet (640px–1024px with slide-over drawer and side-by-side showcase), and Desktop (centered top-nav).
- 📋 **Developer Utility**: One-click markdown export to clipboard, saved library bookmarks, and paginated history search.

---

## 🏗️ Architecture & Tech Stack

```text
┌────────────────────────────────────────────────────────┐
│              Client (React 19 + Vite + Tailwind v4)    │
│  - Auth Context & Guest Mode   - Responsive Layouts    │
│  - Summary Workspace           - History & Bookmarks   │
└───────────────────────────▲────────────────────────────┘
                            │ HTTP / JSON REST
┌───────────────────────────▼────────────────────────────┐
│         Backend Server (Express 5.x ES Modules)        │
│  - Auth Controller (JWT/scrypt) - Rate Limiter Middleware│
│  - Summary Controller          - Request Validation    │
└─────────────▲──────────────────────────────▲───────────┘
              │                              │
      ┌───────▼────────┐             ┌───────▼────────┐
      │  GitHub API    │             │  AI Adapter    │
      │  (Metadata,    │             │ (OpenAI GPT-4o │
      │   READMEs,     │             │  or Heuristic  │
      │   Commits)     │             │    Fallback)   │
      └────────────────┘             └────────────────┘
              │                              │
              └──────────────┬───────────────┘
                             │
                     ┌───────▼────────┐
                     │ SQLite Storage │
                     │ (node:sqlite)  │
                     └────────────────┘
```

| Layer | Technologies | Description |
|---|---|---|
| **Frontend** | React 19, Vite 7, Tailwind CSS v4 | Responsive Single-Page Application with custom hooks, animated dropdowns, and toast messaging. |
| **Backend** | Node.js v22 LTS, Express 5.x (ESM) | REST API built in standard ES modules (`import`/`export`) with error envelopes and correlation IDs. |
| **Database** | SQLite via native `node:sqlite` | Zero external native dependencies, automated table migrations, and transactional integrity. |
| **AI Layer** | OpenAI API + Built-in Heuristic Fallback | Extracts structured JSON; automatically activates local deterministic parser when no API key is present. |
| **Data Provider** | GitHub REST API | Retrieves repository metadata, Base64 READMEs, and recent commit trees. |

---

## 📁 Repository Structure

```text
gitsummarizer/
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── src/
│   │   ├── api/                # HTTP client & API service endpoints
│   │   ├── components/
│   │   │   ├── auth/           # AuthNavbar, AuthPage (Login & Register)
│   │   │   ├── common/         # Icon, Toast, Dialog, LoadingState, EmptyState
│   │   │   ├── history/        # HistoryList, HistoryItem
│   │   │   ├── layout/         # Header, UserProfileMenu, Sidebar (Drawer), Footer
│   │   │   └── summary/        # RepoUrlForm, RepositoryHeader, SummarySection
│   │   ├── context/            # AuthContext (JWT auth & guest mode)
│   │   ├── hooks/              # useSummaries, useClipboard
│   │   └── utils/              # urlValidator, errorMapper, formatters
│   ├── .env.example
│   └── package.json
├── server/                     # Backend API (Express.js ES Modules)
│   ├── src/
│   │   ├── config/             # Environment configuration & defaults
│   │   ├── controllers/        # Summary and Auth HTTP handlers
│   │   ├── middleware/         # Auth guard, error handler, rate limiter
│   │   ├── repositories/       # SQLite database connection & queries
│   │   ├── routes/             # Express API router definitions
│   │   ├── services/           # GitHub client, AI adapter, Summarizer service
│   │   ├── utils/              # Scrypt password hashing & validators
│   │   └── app.js              # Express app bootstrap & route registration
│   ├── tests/                  # Automated integration & unit tests
│   ├── .env.example
│   └── package.json
├── docs/                       # Engineering Reference & Collaborator Guides
│   ├── api-contract.md         # Full endpoint specifications & error formats
│   ├── architecture.md         # Component diagrams, data flow, & security model
│   └── setup-guide.md          # Step-by-step local setup for all teammates
└── README.md                   # Repository documentation
```

---

## 🚀 Quickstart Guide

### Prerequisites

- **Node.js LTS (`v22.5.0` or newer recommended)** — provides native `node:sqlite` support.
- **npm** (`v10+`)
- **Git**

Verify your environment:
```bash
node --version
npm --version
```

---

### Step 1: Backend Setup (`server/`)

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=super-secret-development-jwt-token-key-32chars
   JWT_EXPIRES_IN=7d
   DATABASE_PATH=./data/gitsummarizer.db
   RATE_LIMIT_MAX=60
   RATE_LIMIT_WINDOW_MS=60000

   # Optional: GitHub Personal Access Token (boosts rate limit from 60 to 5,000 req/hr)
   GITHUB_TOKEN=

   # Optional: OpenAI API Key (falls back to built-in heuristic engine if omitted)
   OPENAI_API_KEY=
   OPENAI_MODEL=gpt-4o-mini
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`. Database tables are initialized automatically on boot.

---

### Step 2: Frontend Setup (`client/`)

1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the client `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Default points to `VITE_API_BASE_URL=http://localhost:5000`)*

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📱 Responsive Layout & Breakpoints

GitSummarizer is optimized for seamless developer usage across devices:

| Breakpoint | Target Devices | UX & Layout Strategy |
|---|---|---|
| **Mobile** (`< 640px`) | Phones (iPhone, Pixel) | Compact header with brand icon and avatar. Fast slide-over navigation drawer. Tabbed summaries scroll horizontally. |
| **Tablet** (`640px – 1024px`) | Tablets & iPads (768px, 820px) | Side-by-side auth showcase with feature highlights. Clean header with hamburger drawer. Expanded 320px sidebar drawer. 2-column feature breakdown. |
| **Desktop** (`>= 1024px`) | Laptops & Monitors | Full centered top navigation pills, inline API health indicator, animated profile dropdown menu with interactive sign out. |

---

## 📡 API Contract Summary

All endpoints return a standardized JSON envelope:
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": { "correlationId": "corr-uuid", "timestamp": "2026-11-17T00:00:00.000Z" }
}
```

### Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | System status, database health, and AI mode. |
| `POST` | `/api/auth/register` | Public | Registers a new developer account. Returns JWT. |
| `POST` | `/api/auth/login` | Public | Authenticates credentials with scrypt. Returns JWT. |
| `GET` | `/api/auth/me` | Bearer JWT | Returns current authenticated profile. |
| `POST` | `/api/summaries` | Optional | Generates and persists repository summary. |
| `GET` | `/api/summaries` | Optional | Returns paginated history (isolated to user when authenticated). |
| `GET` | `/api/summaries/:id` | Optional | Fetches detailed summary brief by ID. |
| `DELETE` | `/api/summaries/:id` | Optional | Deletes a summary entry. |

For full request/response schemas and curl examples, see [`docs/api-contract.md`](docs/api-contract.md).

---

## 🧪 Testing

The backend includes a comprehensive automated test suite built with Node's native test runner (`node:test`):

```bash
# Run all backend unit & integration tests
npm --prefix server test
```

### Test Coverage Highlights:
- ✅ Repository URL parsing (canonical URLs, commit URLs, invalid hosts, and malformed inputs)
- ✅ Base64 README decoding and graceful handling of missing documentation
- ✅ AI output schema validation and heuristic fallback parser
- ✅ Full summary lifecycle (`POST`, `GET`, `GET :id`, `DELETE :id`)
- ✅ API health check endpoint contract
- ✅ User authentication, password hashing (`scrypt`), and account history isolation

---

## 🤝 Team Workflow & Branching Strategy

Our team uses standard Git feature branches to coordinate work:

1. **`feature/backend-setup`**: Backend API, database migrations, GitHub & AI service adapters, test suite.
2. **`feature/frontend-layout`**: React 19 UI, Vite setup, Tailwind CSS components, responsive breakpoints, state management.
3. **`docs/setup-guide`**: Architecture documentation, setup guides, API contracts.
4. **`main`**: Production-ready, fully integrated codebase.

### Collaborator Checklist Before Pull Request:
- [ ] Backend tests pass: `npm --prefix server test`
- [ ] Frontend builds cleanly: `npm --prefix client run build`
- [ ] Environment variables documented in `.env.example`
- [ ] Code follows project conventions (ES modules, clean component breakdown)

---

## 📄 License & Credits

Built for the **GitSummarizer** developer codebase intelligence platform. Distributed under the ISC License.
