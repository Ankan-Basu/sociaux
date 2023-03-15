import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { usersRouter } from "./routers/users";
import { notifsRouter } from "./routers/notifs";
import { postsRouter } from "./routers/posts";
import { commentsRouter } from "./routers/comments";
import { replyCommentsRouter } from "./routers/replyComments";
import { likesRouter } from "./routers/likes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  users: usersRouter,
  notifs: notifsRouter,
  posts: postsRouter,
  comments: commentsRouter,
  replyComments: replyCommentsRouter,
  likes: likesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
