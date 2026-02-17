"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignUpButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ArrowRight } from "lucide-react";

function HeroButton() {
  return (
    <>
      <Authenticated>
        <Button>Enter BlankSpace</Button>
      </Authenticated>
      <Unauthenticated>
        <SignUpButton mode="modal">
          <Button>
            Get BlankSpace <ArrowRight />
          </Button>
        </SignUpButton>
      </Unauthenticated>
      <AuthLoading>
        <Spinner />
      </AuthLoading>
    </>
  );
}
export default HeroButton;
