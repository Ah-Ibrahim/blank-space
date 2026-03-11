"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageOffIcon, Pen } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Spinner from "./ui/spinner";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

function Cover({ url, preview }: CoverProps) {
  const onReplaceUrl = useCoverImage((state) => state.onReplaceUrl);
  const { documentId } = useParams();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const { edgestore } = useEdgeStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRemoveCover = () => {
    if (!url) return;

    setIsSubmitting(true);

    const promise = edgestore.publicFiles.delete({ url }).then(() =>
      removeCoverImage({
        id: documentId as Id<"documents">,
      }),
    );

    promise.finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      error: "Failed to remove cover image",
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        url ? "bg-muted" : "h-[12vh]",
      )}
    >
      {url && <Image src={url} fill alt="cover" />}
      {url && !preview && (
        <div className="opacity-100 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => onReplaceUrl(url)}
            variant="outline"
            size={"sm"}
            className="text-muted-foreground"
            disabled={isSubmitting}
          >
            <Pen /> Change Cover
          </Button>
          <Button
            onClick={handleRemoveCover}
            variant="outline"
            size={"sm"}
            className="text-muted-foreground"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : <ImageOffIcon />} Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
}

export function CoverSkeleton() {
  return <Skeleton className="w-full h-[20vh]" />;
}

export default Cover;
