"use client";

import { useUser } from "@clerk/clerk-react";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) return null;

  return <>{children}</>;
}
export default AuthGate;
