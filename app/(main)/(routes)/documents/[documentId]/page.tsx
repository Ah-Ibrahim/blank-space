"use client";

import Cover from "@/components/cover";
import DynamicEditor from "@/components/dynamic-editor";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useDocumentStore } from "@/hooks/use-document-state";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import Loading from "./loading";
import DocumentNotFound from "./not-found";

function DocumentPage() {
  const { documentId } = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<"documents">,
  });
  const isDeleting = useDocumentStore((state) => state.isDeleting);

  const update = useMutation(api.documents.update);

  if (document === undefined) return <Loading />;
  if (document === null) {
    return isDeleting ? <Loading /> : <DocumentNotFound />;
  }

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
        <DynamicEditor
          onChange={handleChange}
          editable
          initialContent={initialContent}
        />
      </div>
    </div>
  );
}
export default DocumentPage;
