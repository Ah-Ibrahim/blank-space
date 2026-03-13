"use client";

import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Loading from "./loading";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

function DocumentPage() {
  const { documentId } = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<"documents">,
  });
  const update = useMutation(api.documents.update);
  const router = useRouter();

  useEffect(() => {
    if (document === null) {
      toast.error("Document not found");
      router.replace("/documents");
    }
  }, [document, router]);

  if (!document) return <Loading />;

  const handleChange = (content: string) => {
    update({ id: documentId as Id<"documents">, content });
  };

  const initialContent = document.content
    ? JSON.parse(document.content)
    : undefined;

  return (
    <div className="pb-40">
      <Cover url={document.coverImg} />
      <div
        className={cn(
          "md:max-w-3xl lg:max-w-4xl mx-auto relative",
          document.coverImg && "-top-10",
          document.icon && "-top-13",
        )}
      >
        <Toolbar initialData={document} />
        <Editor
          onChange={handleChange}
          editable
          initialContent={initialContent}
        />
      </div>
    </div>
  );
}
export default DocumentPage;
