"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useSearchStore } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

function SearchCommand() {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearchDocuments);

  const onToggle = useSearchStore((state) => state.onToggle);
  const isOpen = useSearchStore((state) => state.isOpen);
  const onClose = useSearchStore((state) => state.onClose);

  const [search, setSearch] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const markAsMounted = useEffectEvent(() => {
    setIsMounted(true);
  });

  useEffect(() => {
    markAsMounted();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onToggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onToggle]);

  if (!isMounted) return null;

  const handleSelect = (id: Id<"documents">) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${user?.firstName}'s documents...`}
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandGroup heading="Documents">
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={doc.title + doc._id}
              title={doc.title}
              onSelect={() => handleSelect(doc._id)}
            >
              {doc.icon ? (
                <span className="mr-2 text-[18px]">{doc.icon}</span>
              ) : (
                <File className="mr-2 w-4 h-4" />
              )}
              {doc.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandEmpty>No documents found</CommandEmpty>
      </CommandList>
    </CommandDialog>
  );
}
export default SearchCommand;
