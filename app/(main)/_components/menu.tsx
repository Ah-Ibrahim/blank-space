"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Ellipsis, Trash } from "lucide-react";
import { toast } from "sonner";

interface MenuProps {
  documentId: Id<"documents">;
}

function Menu({ documentId }: MenuProps) {
  const archiveDocument = useMutation(api.documents.archiveDocument);
  const { user } = useUser();

  const handleArchive = () => {
    if (!documentId) return;
    const promise = archiveDocument({ documentId });

    toast.promise(promise, {
      loading: "Archiving Note...",
      success: "Note Archived!",
      error: "Error Occurred!",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Ellipsis className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-3xs">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild variant="destructive">
            <button
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                handleArchive();
              }}
            >
              <Trash /> Move to Trash
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-muted-foreground">
            Last edited by
            <span className="font-medium text-primary"> {user?.fullName}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="w-6 h-6 rounded-sm" />;
};

export default Menu;
