import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import PostModel, { IPost } from "~/server/db/models/Post";
import dbConnect from "~/server/db/mongo";

export const commentsRouter = createTRPCRouter({
  likePost: publicProcedure
    .input(z.object({ uname: z.string(), postId: z.string() }))
    .mutation(async ({ input }) => {
      dbConnect();

      const post: HydratedDocument<IPost> | null = await PostModel.findOne({
        _id: input.postId,
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not found",
        });
      } else {
        if (!post.likes.includes(input.uname)) {
          post.likes.push(input.uname);
          const dbResp = await post.save();

          return dbResp;
        } else {
          return {
            message: "Already Liked",
          };
        }
      }
    }),

  unlikePost: publicProcedure
    .input(z.object({ uname: z.string(), postId: z.string() }))
    .mutation(async ({ input }) => {
      dbConnect();
      const post: HydratedDocument<IPost> | null = await PostModel.findOne({
        _id: input.postId,
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      } else {
        if (post.likes.includes(input.uname)) {
          const likesArr = post.likes.filter((likeName: string | undefined) => {
            return likeName !== input.uname;
          });
          post.likes = likesArr;

          const dbResp = await post.save();

          return dbResp;
        } else {
          return {
            message: "Not liked yet",
          };
        }
      }
    }),
});
