"use client";

import type { EditorProps } from "@/components/editor";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

function DynamicEditor(props: EditorProps) {
  return <Editor {...props} />;
}

export default DynamicEditor;
