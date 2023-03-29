import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { usersRouter } from "./routers/users";
import { notifsRouter } from "./routers/notifs";
import { postsRouter } from "./routers/posts";
import { commentsRouter } from "./routers/comments";
import { replyCommentsRouter } from "./routers/replyComments";
import { likesRouter } from "./routers/likes";
import { signupRouter } from "./routers/signup";
import { imageRouter } from "./routers/image";
import { friendsRouter } from "./routers/friend";
import { buttonRouter } from "./routers/buttonState";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  signup: signupRouter,
  users: usersRouter,
  notifs: notifsRouter,
  friends: friendsRouter,
  posts: postsRouter,
  comments: commentsRouter,
  replyComments: replyCommentsRouter,
  likes: likesRouter,
  images: imageRouter,
  button: buttonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
