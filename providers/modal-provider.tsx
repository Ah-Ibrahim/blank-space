"use client";

import SettingsModal from "@/app/(main)/_components/settings-modal";
import CoverImageModal from "@/components/modals/cover-image-model";
import React, { useEffect, useEffectEvent, useState } from "react";
import CoverImageUploadProvider from "./cover-image-upload-provider";

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
      <CoverImageUploadProvider>
        <CoverImageModal />
      </CoverImageUploadProvider>
      <SettingsModal />
      {children}
    </>
  );
}
export default ModalProvider;
