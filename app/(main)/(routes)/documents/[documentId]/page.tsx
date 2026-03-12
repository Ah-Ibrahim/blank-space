"use client";

import Cover from "@/components/cover";
import Editor from "@/components/editor";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import Loading from "./loading";

function DocumentPage() {
  const { documentId } = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<"documents">,
  });
  const update = useMutation(api.documents.update);

  if (document === undefined) return <Loading />;

  const handleChange = (content: string) => {
    update({ id: documentId as Id<"documents">, content });
  };

  const initialContent = document.content
    ? JSON.parse(document.content)
    : undefined;

  return (
    <div className="pb-40">
      <Cover url={document.coverImg} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
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
