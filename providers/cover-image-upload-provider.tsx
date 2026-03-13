"use client";

import {
  UploaderProvider,
  UploadFn,
} from "@/components/upload/uploader-provider";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function CoverImageUploadProvider({ children }: { children: React.ReactNode }) {
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);
  const { documentId } = useParams();
  const oldUrl = useCoverImage((state) => state.url);

  const uploadFn: UploadFn = async ({ file }) => {
    const res = await edgestore.publicFiles.upload({
      file,
      options: {
        replaceTargetUrl: oldUrl,
      },
    });

    const promise = update({
      id: documentId as Id<"documents">,
      coverImg: res.url,
    });

    toast.promise(promise, {
      error: "Failed to update cover image",
    });

    return res;
  };

  return <UploaderProvider uploadFn={uploadFn}>{children}</UploaderProvider>;
}
export default CoverImageUploadProvider;
