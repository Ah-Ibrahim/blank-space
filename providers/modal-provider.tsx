"use client";

import SettingsModal from "@/app/(main)/_components/settings-modal";
import React, { useEffect, useEffectEvent, useState } from "react";

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  const markAsMounted = useEffectEvent(() => {
    setIsMounted(true);
  });

  useEffect(() => {
    markAsMounted();
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      {children}
    </>
  );
}
export default ModalProvider;
