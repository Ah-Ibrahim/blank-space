"use client";

import { api } from "@/convex/_generated/api";
import { useSearchStore } from "@/hooks/use-search";
import { useSettingsStore } from "@/hooks/use-settings";
import useMediaQuery from "@/hooks/useMediaQuery";
import screenBreakpoints from "@/lib/breakpoints";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ComponentRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import DocumentsList from "./documents-list";
import Item from "./item";
import Navbar from "./navbar";
import TrashItem from "./trash-item";
import { UserItem } from "./user-items";

function Navigation() {
  // hide sidebar on Mobile
  const isMobile = useMediaQuery(`(max-width: ${screenBreakpoints.md})`);

  const params = useParams();

  const sidebarRef = useRef<ComponentRef<"aside">>(null);
  const navbarRef = useRef<ComponentRef<"div">>(null);
  const isResizingRef = useRef<boolean>(false);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const onOpenSearch = useSearchStore((state) => state.onOpen);
  const onOpenSettings = useSettingsStore((state) => state.onOpen);

  const create = useMutation(api.documents.create);

  const router = useRouter();

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.removeProperty("width");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((id) =>
      router.push(`/documents/${id}`),
    );

    toast.promise(promise, {
      loading: "Creating Note",
      success: "Created Note",
      error: "Error Occurred!",
    });
  };

  return (
    <>
      <aside
        className={cn(
          "group/sidebar bg-secondary relative z-300 flex h-full w-60 flex-col overflow-hidden overflow-x-hidden pb-4",
          isResetting && "transition-[width] ease-in-out duration-100",
          isMobile && "w-0",
        )}
        ref={sidebarRef}
      >
        <div
          className="text-muted-foreground absolute top-3 right-2 h-6 w-6 rounded-sm opacity-0 transition group-hover/sidebar:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600"
          role="button"
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <UserItem />
        <Item onClick={onOpenSettings} label="Settings" icon={Settings} />
        <Item onClick={onOpenSearch} isSearch label="Search" icon={Search} />
        <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
        <div className="my-4">
          <DocumentsList />
          <Item onClick={handleCreate} label="Add a Page" icon={Plus} />
          <div className="mt-2">
            <TrashItem />
          </div>
        </div>
        <div
          className="h-full opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize absolute w-1 bg-primary/10 right-0 top-0"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={resetWidth}
        />
      </aside>
      <div
        className={cn(
          "absolute top-0 left-60 w-[calc(100%-240px)] z-9999",
          isResetting && "transition-[width] ease-in-out duration-100",
          isMobile && "left-0 w-full",
        )}
        ref={navbarRef}
      >
        {Boolean(params.documentId) ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav
            className={cn(
              "w-full bg-transparent px-3 py-2",
              !isCollapsed && "p-0",
            )}
          >
            {isCollapsed && (
              <MenuIcon
                role="button"
                className="w-6 h-6 text-muted-foreground"
                onClick={resetWidth}
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
export default Navigation;
