import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// Trigger for deleting children
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to mutation");

    const { title, parentDocument } = args;
    const userId = identity.subject;

    return ctx.db.insert("documents", {
      title,
      isArchived: false,
      isPublished: false,
      parentDocument,
      userId,
    });
  },
});

export const getAllDocuments = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to mutation");

    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", identity?.subject))
      .collect();
  },
});

export const getSidebarDocuments = query({
  args: {
    parentDocumentId: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to query");

    const userId = identity.subject;
    const { parentDocumentId } = args;

    return ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", parentDocumentId),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
  },
});

export const archiveDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to query");

    const userId = identity.subject;
    const { documentId } = args;

    const document = await ctx.db.get("documents", documentId);

    if (document === null) throw new Error("Document not found");

    if (document.userId !== userId)
      throw new Error("Unauthorized access to document");

    /**
     * Recursively archives all descendant documents and detaches them
     * from their parent relationships to allow independent restoration.
     */

    const recursiveChildrenArchive = async (documentId: Id<"documents">) => {
      const childDocuments = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId),
        )
        .collect();

      for (const childDocument of childDocuments) {
        await ctx.db.patch("documents", childDocument._id, {
          isArchived: true,
          parentDocument: undefined,
        });
        await recursiveChildrenArchive(childDocument._id);
      }
    };

    await recursiveChildrenArchive(documentId);

    await ctx.db.patch("documents", documentId, { isArchived: true });
  },
});

export const getArchivedDocuments = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to query");

    const userId = identity.subject;

    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
  },
});

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to query");

    const { documentId } = args;

    const userId = identity.subject;
    const document = await ctx.db.get("documents", documentId);
    if (document === null) throw new Error("Document not found");

    if (document.userId !== userId)
      throw new Error("Unauthorized access to document");

    if (document.isArchived === false)
      throw new Error("Cannot delete a non-archived document");

    await ctx.db.delete("documents", documentId);
  },
});

export const deleteArchivedDocuments = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to query");

    const userId = identity.subject;

    await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .collect()
      .then((archivedDocuments) => {
        const deletePromises = archivedDocuments.map((doc) =>
          ctx.db.delete("documents", doc._id),
        );
        return Promise.all(deletePromises);
      });
  },
});

export const restoreDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to query");

    const userId = identity.subject;
    const { documentId } = args;

    const document = await ctx.db.get("documents", documentId);

    if (document === null) return null;
    if (document.userId !== userId)
      throw new Error("Unauthorized access to document");

    await ctx.db.patch("documents", documentId, { isArchived: false });
  },
});

export const getSearchDocuments = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to query");

    const userId = identity.subject;
    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
  },
});

export const getById = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const { documentId } = args;

    const document = await ctx.db.get("documents", documentId);

    if (document === null) return null;

    if (!document.isArchived && document.isPublished) return document;

    if (!identity) throw new Error("Unauthenticated call to query");

    const userId = identity.subject;
    if (document.userId !== userId)
      throw new Error("Unauthorized access to document");

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImg: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to mutation");

    const userId = identity.subject;
    const { id, ...rest } = args;

    const document = await ctx.db.get("documents", id);

    if (document === null) throw new Error("Document not found");
    if (document.userId !== userId)
      throw new Error("Unauthorized access to document");

    await ctx.db.patch("documents", id, rest);
  },
});

export const removeIcon = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to mutation");

    const userId = identity.subject;
    const { id } = args;

    const document = await ctx.db.get(id);

    if (document === null) throw new Error("Document not found");
    if (document.userId !== userId)
      throw new Error("Unauthorized access to document");

    await ctx.db.patch("documents", id, { icon: undefined });
  },
});

export const removeCoverImage = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated call to mutation");

    const userId = identity.subject;
    const { id } = args;

    const document = await ctx.db.get("documents", id);

    if (document === null) throw new Error("Document not found");
    if (document.userId !== userId)
      throw new Error("Unauthorized access to document");

    await ctx.db.patch("documents", id, { coverImg: undefined });
  },
});
