"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./item";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
}

function DocumentsList({ parentDocumentId, level = 0 }: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<
    Record<Id<"documents">, boolean>
  >({});

  const documents = useQuery(api.documents.getSidebarDocuments, {
    parentDocumentId,
  });

  if (!documents)
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );

  const handleExpand = (id: Id<"documents">) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRedirect = (id: Id<"documents">) => {
    router.push(`/documents/${id}`);
  };

  const documentsItems = documents.map((document) => (
    <Item
      onClick={handleRedirect.bind(null, document._id)}
      documentId={document._id}
      key={document._id}
      onExpand={handleExpand.bind(null, document._id)}
      icon={File}
      label={document.title}
      level={level}
      isExpanded={expandedItems[document._id]}
      documentIcon={document.icon}
      isActive={params.documentId === document._id}
    />
  ));

  return (
    <>
      <div
        style={{
          paddingLeft: `${level * 12 + 12}px`,
        }}
        className="text-sm font-medium text-muted-foreground/80 hidden last:block"
      >
        No pages inside
      </div>
      <>{documentsItems}</>
    </>
  );
}
export default DocumentsList;
