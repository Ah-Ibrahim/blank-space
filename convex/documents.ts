import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

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

    ctx.db.insert("documents", {
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
