"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DocumentsPage() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((id) => {
      router.push(`/documents/${id}`);
    });

    toast.promise(promise, {
      loading: "Creating Note",
      success: "Created Note",
      error: "Error Occurred!",
    });
  };

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
        <Button onClick={onCreate}>
          Add Note
          <PlusCircle />
        </Button>
      </div>
    </div>
  );
}
export default DocumentsPage;
