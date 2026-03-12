"use client";

import type { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

interface EditorProps {
  initialContent?: Block<any, any, any>[];
  editable: boolean;
  onChange: (value: string) => void;
}

function Editor({ initialContent, editable, onChange }: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent,
  });

  useEditorChange((editor) => {
    const savedBlocks = JSON.stringify(editor.document);

    onChange(savedBlocks);
  }, editor);

  return <BlockNoteView editor={editor} />;
}
export default Editor;
