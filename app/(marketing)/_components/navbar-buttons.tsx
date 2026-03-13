"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ArrowRightIcon } from "lucide-react";

function NavbarButtons() {
  return (
    <>
      <Unauthenticated>
        <div className="flex gap-x-4">
          <SignInButton mode="modal">
            <Button variant={"ghost"} className="hidden md:block">
              Log in
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button>
              Get BlankSpace <ArrowRightIcon />
            </Button>
          </SignUpButton>
        </div>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
        <Spinner />
      </AuthLoading>
    </>
  );
}
export default NavbarButtons;
