"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  Ellipsis,
  LucideIcon,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { toast } from "sonner";
import { DOCUMENT_MESSAGES } from "../(routes)/messages";
import DocumentsList from "./documents-list";

interface ItemProps {
  onClick?: () => void;
  label: string;
  icon: LucideIcon;
  documentId?: Id<"documents">;
  documentIcon?: string;
  level?: number;
  isExpanded?: boolean;
  isActive?: boolean;
  isSearch?: boolean;
  onExpand?: () => void;
  onCloseMenu?: () => void;
}

function Item({
  onClick,
  label,
  icon: Icon,
  level = 0,
  isExpanded,
  documentId: id,
  documentIcon,
  isActive,
  isSearch,
  onExpand,
  onCloseMenu = () => {},
}: ItemProps) {
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archiveDocument);
  const router = useRouter();
  const { user } = useUser();

  const handleExpand = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const handleCreate = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!isExpanded) onExpand?.();

        router.push(`/documents/${documentId}`);
      },
    );

    toast.promise(promise, DOCUMENT_MESSAGES.page.create);
  };

  const handleArchive = () => {
    if (!id) return;
    const promise = archive({ documentId: id });

    toast.promise(promise, DOCUMENT_MESSAGES.page.archive);
  };

  const handleClick = () => {
    onClick?.();
    onCloseMenu();
  };

  return (
    <div>
      <button
        role="button"
        onClick={handleClick}
        style={{
          paddingLeft: `${level * 12 + 12}px`,
        }}
        className={cn(
          "group flex items-center min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 text-muted-foreground font-medium",
          isActive && "bg-primary/5 text-primary",
        )}
      >
        {Boolean(id) && (
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
            onClick={handleExpand}
          >
            <ChevronIcon className="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
        )}
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-4.5 mr-2 text-muted-foreground" />
        )}
        <span className="truncate">{label}</span>
        {isSearch && (
          <kbd className="ml-auto pointer-events-none select-none inline-flex h-5 items-center gap-1 rounded bg-muted border px-1.5 font-mono text-[12px] font-medium text-muted-foreground opacity-100">
            CTRL K
          </kbd>
        )}
        {Boolean(id) && (
          <div className="ml-auto flex gap-x-3 opacity-0 group-hover:opacity-100">
            <div className=" flex items-center gap-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                    <Ellipsis className="w-4 h-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  align="start"
                  className="w-3xs"
                >
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
                      <span className="font-medium text-primary">
                        {" "}
                        {user?.fullName}
                      </span>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <div
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                onClick={handleCreate}
              >
                <Plus className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </button>
      {isExpanded && (
        <DocumentsList
          parentDocumentId={id}
          level={level + 1}
          onItemClick={onCloseMenu}
        />
      )}
    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level = 0 }: { level?: number }) {};

export default Item;
