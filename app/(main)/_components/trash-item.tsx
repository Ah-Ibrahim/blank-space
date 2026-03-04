"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Reply, Search, Trash, Trash2, Wind } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./item";

function TrashItem() {
  const [search, setSearch] = useState<string>("");

  const archivedDocuments = useQuery(api.documents.getArchivedDocuments);
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const restoreDocument = useMutation(api.documents.restoreDocument);
  const deleteArchivedDocuments = useMutation(
    api.documents.deleteArchivedDocuments,
  );

  const router = useRouter();

  let content: React.ReactNode = (
    <DropdownMenuLabel className="text-muted-foreground text-xs flex gap-x-1 items-center justify-center">
      <Spinner />
    </DropdownMenuLabel>
  );

  const filteredDocuments = archivedDocuments?.filter((document) =>
    document.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRestore = (documentId: Id<"documents">) => {
    restoreDocument({ documentId });
  };

  const handleDelete = (documentId: Id<"documents">) => {
    deleteDocument({ documentId });
  };

  const handleEmptyTrash = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await deleteArchivedDocuments();
  };

  const handleRedirect = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  };

  if (filteredDocuments?.length) {
    content = filteredDocuments.map((document) => (
      <DropdownMenuItem
        key={document._id}
        className="flex justify-between items-stretch py-0 pe-0"
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          handleRedirect(document._id);
        }}
      >
        <div className="py-2" role="button">
          {document.title}
        </div>
        <div className="flex">
          <button
            className="text-muted-foreground hover:bg-muted-foreground/20 rounded px-2"
            onClick={(e) => {
              e.stopPropagation();
              handleRestore(document._id);
            }}
          >
            <Reply className="" />
          </button>
          <button
            className="text-muted-foreground hover:bg-muted-foreground/20 rounded px-2"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(document._id);
            }}
          >
            <Trash className="aspect-square" />
          </button>
        </div>
      </DropdownMenuItem>
    ));
  } else if (archivedDocuments?.length && !filteredDocuments?.length) {
    content = (
      <DropdownMenuLabel className="text-muted-foreground text-xs flex gap-x-1 items-center justify-center">
        Nothing here
        <Wind className="w-3 aspect-square" />
      </DropdownMenuLabel>
    );
  } else {
    content = (
      <DropdownMenuLabel className="text-muted-foreground text-xs flex gap-x-1 items-center justify-center">
        Trash is empty <Wind className="w-3 aspect-square" />
      </DropdownMenuLabel>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div role="button" className="w-full">
            <Item label="Trash" icon={Trash} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="w-3xs">
          <Field
            orientation="horizontal"
            className="flex flex-row items-center p-1"
          >
            <FieldLabel htmlFor="trash-search">
              <Search className="w-4 h-4" />
            </FieldLabel>
            <Input
              type="search"
              placeholder="Search trash..."
              className="shrink"
              id="trash-search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => e.stopPropagation()}
            />
            {Number(archivedDocuments?.length) > 0 && (
              <button className="text-destructive" onClick={handleEmptyTrash}>
                <Trash2 className="w-4 aspect-square" />
              </button>
            )}
          </Field>
          {content}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default TrashItem;
