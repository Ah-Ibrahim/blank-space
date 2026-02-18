"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

function DocumentsPage() {
  const { user } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty.svg"
        width={300}
        height={300}
        alt="Empty Page"
        className="dark:hidden w-full sm:w-xl"
      />
      <Image
        src="/empty-dark.svg"
        width={300}
        height={300}
        alt="Empty Page"
        className="hidden dark:block w-full sm:w-xl"
      />
      <div className="flex flex-col items-center space-y-4">
        <p>Welcome to BlankSpace, {user?.fullName}</p>
        <Button>
          Add Note
          <PlusCircle />
        </Button>
      </div>
    </div>
  );
}
export default DocumentsPage;
