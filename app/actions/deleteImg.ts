"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { backendClient } from "@/lib/edgestore-server";
import { fetchQuery } from "convex/nextjs";

export async function deleteImgFromEdgeStore(url: string): Promise<void>;
export async function deleteImgFromEdgeStore(
  documentId: Id<"documents">,
): Promise<void>;
export async function deleteImgFromEdgeStore(
  value: string | Id<"documents">,
): Promise<void> {
  let url: string | undefined;

  if (typeof value === "string") {
    url = value;
  } else {
    const document = await fetchQuery(api.documents.getById, {
      documentId: value,
    });

    url = document?.coverImg;
  }

  if (!url) return;

  await backendClient.publicFiles.deleteFile({
    url,
  });
}
