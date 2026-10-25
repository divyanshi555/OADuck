"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import { NavigationProvider } from "./NavigationContext";

function shouldPersistNavigation(pathname) {
  // The public landing page owns its own navigation, including for signed-in users.
  if (pathname === "/") return false;

  const pathSegments = pathname.split("/").filter(Boolean);
  const isQuestionDetail = pathSegments[0] === "questions" && pathSegments.length > 1;
  return ![
    "/login",
    "/register",
    "/setup-password",
    "/logout",
  ].some((route) => pathname === route || pathname.startsWith(`${route}/`)) && !isQuestionDetail;
}

export default function NavigationPersistence({ children }) {
  const pathname = usePathname();
  const { status } = useSession();
  // Do not show workspace chrome during the initial session-loading state.
  // Otherwise a logged-out refresh briefly renders the authenticated shell.
  const persistent = status === "authenticated" && shouldPersistNavigation(pathname);

  return (
    <NavigationProvider value={persistent}>
      {persistent && <AppHeader persistentRoot />}
      {persistent && <Sidebar persistentRoot />}
      {children}
    </NavigationProvider>
  );
}
