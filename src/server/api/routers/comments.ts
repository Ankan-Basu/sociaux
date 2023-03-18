import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import CommentModel, { IComment } from "~/server/db/models/Comment";
import dbConnect from "~/server/db/mongo";

export const commentsRouter = createTRPCRouter({
  getComments: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      dbConnect();

      const comments: Array<HydratedDocument<IComment>> =
        await CommentModel.find({ postId: input.postId });

      return comments;
    }),

  postComment: publicProcedure
    .input(
      z.object({ uname: z.string(), postId: z.string(), message: z.string() })
    )
    .mutation(async ({ input }) => {
      dbConnect();

      try {
        const dbResp: HydratedDocument<IComment> = await CommentModel.create(
          input
        );
        if (dbResp) {
          return dbResp;
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Not found",
          });
        }
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Not found",
        });
      }
    }),

    editComment: publicProcedure
    .input(
      z.object({ uname: z.string(), commentId: z.string(), message: z.string() })
    )
    .mutation(async ({ input }) => {
      dbConnect();

      try {
        const comment: HydratedDocument<IComment> | null = await CommentModel.findOne(
          {_id: input.commentId}
        );
        if (comment) {
          // return dbResp;
          comment.message = input.message;

          try {
            const dbResp = await comment.save();
            return dbResp;
            
          } catch (err) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Internal Server Error",
            });
          }
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Not found",
          });
        }
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Not found",
        });
      }
    }),

  deleteComment: publicProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ input }) => {
      dbConnect();

      try {
        const dbResp = await CommentModel.deleteOne({ _id: input.commentId });
        return dbResp;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Not found",
        });
      }
    }),
});
