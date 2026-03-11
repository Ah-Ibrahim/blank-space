"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster {...props} theme={resolvedTheme as ToasterProps["theme"]} />
  );
}
