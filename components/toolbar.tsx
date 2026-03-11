"use client";

import DocumentTitle from "@/app/(main)/_components/document-title";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { ImagePlus, SmilePlus, X } from "lucide-react";
import { toast } from "sonner";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

function Toolbar({ initialData, preview }: ToolbarProps) {
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  const onOpen = useCoverImage((state) => state.onOpen);

  const onEmojiChange = async (emoji: string) => {
    const promise = update({
      id: initialData._id,
      icon: emoji,
    });

    toast.promise(promise, {
      loading: "Updating icon...",
      success: "Icon updated!",
      error: "Failed to update icon",
    });
  };

  const onRemoveIcon = () => {
    const promise = removeIcon({ id: initialData._id });

    toast.promise(promise, {
      loading: "Removing icon...",
      success: "Icon removed!",
      error: "Failed to remove icon",
    });
  };

  return (
    <div className="pl-[54px] group relative flex flex-col gap-y-4">
      {Boolean(initialData.icon) && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onEmojiChange}>
            <p className="text-6xl hover:opacity-75 transition-opacity ">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            variant={"outline"}
            size={"icon"}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-base"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {Boolean(initialData.icon) && preview && (
        <p className="text-6xl">{initialData.icon}</p>
      )}
      {!preview && (
        <div className="opacity-0 group-hover:opacity-100 flex gap-x-2 transition-opacity text-3xl duration-base">
          {!Boolean(initialData.icon) && (
            <IconPicker onChange={onEmojiChange} asChild>
              <Button
                variant="outline"
                className="text-muted-foreground"
                size={"sm"}
              >
                <SmilePlus /> Add Icon
              </Button>
            </IconPicker>
          )}
          {!Boolean(initialData.coverImg) && (
            <Button
              variant="outline"
              className="text-muted-foreground"
              size={"sm"}
              onClick={onOpen}
            >
              <ImagePlus /> Add Cover
            </Button>
          )}
        </div>
      )}
      <DocumentTitle initialData={initialData} isPreview={false} />
    </div>
  );
}
export default Toolbar;
