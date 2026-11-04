---
title: Technology Stack
sidebar_position: 2
---

# Technology Stack

| Area | Technology | Use in OA Duck |
|---|---|---|
| Web application | Next.js 16 App Router, React 19, JavaScript/JSX | Server-rendered pages, client-side interactive workspaces, and API route handlers live in one application. |
| Styling and editor | Tailwind CSS 4, CSS, Monaco Editor (`@monaco-editor/react`) | Tailwind and component styles build the interface; Monaco provides the coding workspace. |
| Interaction | Lenis, `next/font/google` | Lenis provides smooth scrolling; Manrope, Space Grotesk, and Geist Mono are loaded by the root layout. |
| Authentication | Auth.js / NextAuth 5, Google OAuth, Credentials provider, `bcryptjs` | Google and email/password sign-in use JWT sessions; passwords are stored as bcrypt hashes. |
| Database | PostgreSQL on Neon, Prisma ORM 7, `@prisma/adapter-neon` | Prisma models and migrations define application data; the Neon adapter connects the server to PostgreSQL. |
| Code execution | Judge0 CE HTTP API | The server submits source code and test input, polls for results, and maps Judge0 statuses to application verdicts. |
| AI feedback | LangChain (`@langchain/core`, `@langchain/google-genai`), Google Gemini | Duck Insight prompts Gemini and requests schema-constrained structured output for assessment feedback. |
| Validation | Zod | Validates the structured Duck Insight response. |
| Documentation | Docusaurus 3.10.2 | Builds the documentation site as static output; the main build copies it into `public/docs` for the Next.js app to serve. |
| Local Judge0 setup | Docker Compose, PowerShell | The optional setup script starts the Judge0 services from the Judge0 release under `judge0/`. |

## Integration details

- **Authentication and roles**: Google OAuth is configured in `auth.config.js`; the credentials provider and database-backed user callbacks are in `src/auth.js`. Password hashes are generated and checked with `bcryptjs`. Auth.js uses JWT session strategy and the application reads `USER` or `ADMIN` from the account record.
- **PostgreSQL and Prisma**: `prisma/schema.prisma` contains the data model. `src/lib/prisma.js` creates the Prisma Client with `PrismaNeon`; `prisma/migrations/` contains SQL migrations. Neon branch behavior is configured separately in `neon.ts`.
- **Judge0**: `src/lib/judge0.js` maps C++, Java, and Python to Judge0 language IDs 54, 62, and 71, respectively, and calls the configured endpoint (defaults to `https://ce.judge0.com`). `JUDGE0_API_URL` can point at another Judge0 instance; `JUDGE0_AUTH_TOKEN` is optional. The local Docker setup is optional, not part of the Next.js runtime.
- **Duck Insight**: `src/lib/duck-insight.js` uses `ChatGoogleGenerativeAI` with `AI_API_KEY`; the model can be overridden with `DUCK_INSIGHT_MODEL` (source default: `gemini-3.8-flash`). LangChain formats the prompt and requests JSON-schema output; `src/lib/duck-insight-schema.js` validates it with Zod. The route sends the candidate submission and relevant problem/reference data to this service.
- **Editor languages**: the UI and server currently support C++, Java, and Python. Judge0 performs compilation/execution outside the Next.js process.

`@langchain/openai` is present in the dependency manifest but is not imported by the application source. Duck Insight currently uses Google Gemini. Although Cloudinary-related names exist in the local environment configuration, no Cloudinary client is wired into the application; profile image values are handled by the profile API and stored in the user record.
