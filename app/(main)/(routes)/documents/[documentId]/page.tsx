"use client";

import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import Loading from "./loading";

function DocumentPage() {
  const { documentId } = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<"documents">,
  });

  if (document === undefined) return <Loading />;

  return (
    <div className="pb-40">
      <Cover url={document.coverImg} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}
export default DocumentPage;
