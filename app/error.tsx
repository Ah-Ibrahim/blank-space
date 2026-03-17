"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace("/documents");
  };

  useEffect(() => console.log(error), [error]);

  return (
    <div className="flex flex-col items-center h-screen justify-center gap-4">
      <h1 className="font-bold text-2xl md:text-3xl">Something went wrong!</h1>
      <Image
        src="/error.png"
        alt="Error image"
        width={2000}
        height={2000}
        className="w-md"
      />
      <div className="flex gap-2">
        <Button onClick={reset}>Try Again</Button>
        <Button onClick={handleRedirect} variant={"outline"}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
export default ErrorPage;
