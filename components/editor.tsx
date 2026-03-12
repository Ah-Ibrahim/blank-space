"use client";

import type { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";

interface EditorProps {
  // This is recommended to way from docs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialContent?: Block<any, any, any>[];
  editable: boolean;
  onChange: (value: string) => void;
}

function Editor({ initialContent, editable, onChange }: EditorProps) {
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  const editor = useCreateBlockNote({
    initialContent,
  });

  useEditorChange((editor) => {
    const savedBlocks = JSON.stringify(editor.document);

    onChange(savedBlocks);
  }, editor);

  return <BlockNoteView editor={editor} editable={editable} theme={theme} />;
}
export default Editor;
