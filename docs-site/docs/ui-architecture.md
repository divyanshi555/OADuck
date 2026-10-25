---
id: ui-architecture
title: UI architecture
sidebar_position: 2
---

# UI architecture

## App Router layout

The UI is organized under src/app using the Next.js App Router. The root layout loads global fonts and CSS, then wraps the app in the session provider and navigation persistence provider. Pages are server components by default; a component opts into browser behavior with the use client directive.

## Shared shell

NavigationPersistence reads the client session status and only renders AppHeader and Sidebar when the status is definitively authenticated. This prevents a private workspace shell from flashing during the initial session-loading state.

AppHeader owns the top bar, role switcher, streak summary, profile menu, assessment timer, and the developer documentation link. Sidebar owns workspace links and admin/user navigation. Both are shared rather than duplicated inside feature pages.

## Server/client split

Use a server component when the page needs auth(), database data, redirects, or secure server-only dependencies. Use a client component for useSession, editor state, timers, browser events, keyboard shortcuts, monitoring, or interactive forms.

Do not import Prisma, environment secrets, or server-only integrations into client components. Pass only the minimum serializable data required by the browser UI.

## Styling conventions

The project uses Tailwind utility classes alongside src/app/globals.css. Shared workspace styles are centralized in global CSS so the header, sidebar, profile, assessment, and landing surfaces retain a consistent visual system.
