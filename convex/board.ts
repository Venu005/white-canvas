// api end point to create a new board // like creating a table in a database
// create mutate and deleting for a single board
import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
  "/placeholders/11.svg",
  "/placeholders/12.svg",
];

export const createBoard = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const deleteBoard = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorised");
    }
    // after deleting delete the favorite relation as well
    const userId = identity.subject;
    const existingFav = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();
    if (existingFav) {
      await ctx.db.delete(existingFav._id);
    }
    await ctx.db.delete(args.id);
  },
});
export const updateBoard = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorised");
    }
    const title = args.title.trim();
    if (!title) {
      throw new Error("Title can't be empty");
    }
    if (title.length > 75) {
      throw new Error("Title can't be more than 75 characters");
    }

    // after deleting delete the favorite relation as well
    const userId = identity.subject;
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();
    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }
    const board = await ctx.db.patch(args.id, { title: args.title });

    return board;
  },
});
export const favoriteBoard = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorised");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Canvas not found");
    }

    const userId = identity.subject;
    // cchecking if the canavs I want to fav is already in the favorite list or not
    // getting userFavorites directly from the schema
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();
    if (existingFavorite) {
      throw new Error("Already in favorites");
    }
    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unfavoriteBoard = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorised");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Canvas not found");
    }

    const userId = identity.subject;
    // cchecking if the canavs I want to fav is already in the favorite list or not
    // getting userFavorites directly from the schema
    const existingFavorite = await ctx.db
      .query("userFavorites")
      // if  a canvas is favorited that means an org is already created, I can't create a canvas without having an organization
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();
    // can't unfavorite if it's not in the favorite list
    if (!existingFavorite) {
      throw new Error("Favorited canvas not found");
    }
    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
