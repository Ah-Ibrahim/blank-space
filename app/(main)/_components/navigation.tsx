"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import screenBreakpoints from "@/lib/breakpoints";
import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { ComponentRef, useEffect, useRef, useState } from "react";

function Navigation() {
  // hide sidebar on Mobile
  const isMobile = useMediaQuery(`(max-width: ${screenBreakpoints.md})`);

  const sidebarRef = useRef<ComponentRef<"aside">>(null);
  const navbarRef = useRef<ComponentRef<"div">>(null);
  const isResizingRef = useRef<boolean>(false);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

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
          className="absolute top-4 right-4"
          role="button"
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <p>Action</p>
        </div>
        <div className="mt-4">documents</div>
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
      </div>
    </>
  );
}
export default Navigation;
