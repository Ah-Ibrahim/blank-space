"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface DocumentTitleProps {
  initialData: Doc<"documents">;
  isPreview: boolean;
}

function DocumentTitle({ initialData, isPreview }: DocumentTitleProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState<string>(initialData.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const update = useMutation(api.documents.update);

  const enableInput = () => {
    if (isPreview) return;

    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(title.length, title.length);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);

    update({
      id: initialData._id,
      title: e.target.value.trim() || "Untitled",
    });
  };

  const disableInput = () => {
    setIsEditing(false);
    setTitle(initialData.title);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      textareaRef.current?.blur();
    }
  };

  return (
    <>
      {isEditing && !isPreview ? (
        <TextareaAutosize
          ref={textareaRef}
          value={title}
          onChange={handleChange}
          className={cn(
            "w-full resize-none overflow-hidden bg-transparent text-[#3f3f3f] dark:text-[#cfcfcf] font-bold focus:outline-none text-5xl cursor-pointer focus:cursor-text leading-[1.2]",
          )}
          spellCheck={false}
          onBlur={disableInput}
          placeholder="Untitled"
          onKeyDown={onKeyDown}
        />
      ) : (
        <div
          className={cn(
            "w-full overflow-hidden wrap-break-word bg-transparent text-[#3f3f3f] dark:text-[#cfcfcf] font-bold focus:outline-none text-5xl cursor-pointer focus:cursor-text leading-[1.2]",
            isPreview && "cursor-default",
          )}
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </>
  );
}
export default DocumentTitle;
