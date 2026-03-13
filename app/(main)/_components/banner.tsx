"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  id: Id<"documents">;
}

function Banner({ id }: BannerProps) {
  const restore = useMutation(api.documents.restoreDocument);
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const router = useRouter();

  const handleRestore = () => {
    const promise = restore({ documentId: id });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored successfully",
      error: "Failed to restore document",
    });
  };

  const handleDelete = () => {
    router.replace("/documents");
    const promise = deleteDocument({ documentId: id });

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted successfully",
      error: "Failed to delete document",
    });
  };

  return (
    <div className="bg-rose-400 text-sm p-2 flex items-center gap-x-2 justify-center">
      <p>This page is in Trash</p>
      <Button variant="outline" size="sm" onClick={handleRestore}>
        Restore
      </Button>
      <ConfirmModal
        title="Are you sure you want to delete this document?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        isDestructive
      >
        <Button variant="outline" size="sm">
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
}
export default Banner;
