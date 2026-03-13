"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

interface TitleProps {
  initialData: Doc<"documents">;
}

function Title({ initialData }: TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const update = useMutation(api.documents.update);

  const enableEditing = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableEditing();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({
      id: initialData._id,
      title: e.target.value.trim() || "Untitled",
    });
  };

  return (
    <div className="flex items-center gap-x-1">
      {Boolean(initialData.icon) && initialData.icon}
      {isEditing ? (
        <Input
          value={title}
          ref={inputRef}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={disableEditing}
        />
      ) : (
        <Button
          onClick={enableEditing}
          variant={"ghost"}
          className="font-normal h-auto py-2 px-3 max-w-[230px]"
        >
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  );
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-4 w-25 rounded-md" />;
};

export default Title;
