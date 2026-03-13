"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignUpButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function HeroButton() {
  return (
    <>
      <Authenticated>
        <Button asChild>
          <Link href="/documents">
            Enter BlankSpace <ArrowRight />
          </Link>
        </Button>
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
