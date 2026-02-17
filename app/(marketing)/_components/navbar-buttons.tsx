"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import useMediaQuery from "@/hooks/useMediaQuery";
import screenBreakpoints from "@/lib/breakpoints";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ArrowRightIcon } from "lucide-react";

function NavbarButtons() {
  const isMdOrLarger = useMediaQuery(`(min-width: ${screenBreakpoints.md})`);

  return (
    <>
      <Unauthenticated>
        <div className="flex gap-x-4">
          {isMdOrLarger && (
            <SignInButton mode="modal">
              <Button variant={"ghost"}>Log in</Button>
            </SignInButton>
          )}
          <SignUpButton mode="modal">
            <Button>
              Get BlankSpace <ArrowRightIcon />
            </Button>
          </SignUpButton>
        </div>
      </Unauthenticated>
      <Authenticated>
        <UserButton showName />
      </Authenticated>
      <AuthLoading>
        <Spinner />
      </AuthLoading>
    </>
  );
}
export default NavbarButtons;
