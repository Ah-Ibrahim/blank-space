"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  isDestructive?: boolean;
}

function ConfirmModal({
  children,
  title,
  description,
  onConfirm,
  isDestructive = false,
}: ConfirmModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const markAsMounted = useEffectEvent(() => {
    setIsMounted(true);
  });

  useEffect(() => {
    markAsMounted();
  }, []);

  if (!isMounted) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={isDestructive ? "destructive" : "default"}
            onClick={onConfirm}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmModal;
