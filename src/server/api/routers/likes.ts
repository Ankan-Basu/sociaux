import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import CommentModel, { IComment } from "~/server/db/models/Comment";
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

  likeComment: publicProcedure
    .input(z.object({ uname: z.string(), commentId: z.string() }))
    .mutation(async ({ input }) => {
      dbConnect();
      try {
        const comment: HydratedDocument<IComment> | null =
          await CommentModel.findOne({ _id: input.commentId });
        // console.log(comment);
        if (!comment) {
          //ie null
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Comment not found",
          });
        } else {
          if (comment.likes.includes(input.uname)) {
            return {
              message: "Already Liked",
            };
          } else {
            comment.likes.push(input.uname);

            const dbResp = await comment.save();

            return dbResp;
          }
        }
      } catch (err) {
        /**
         *  we compare string (comment ID) with objwct ID
         * exception will arise when mongoose won't be able to do typecasting
         * ie user send wrong lwength or format of string
         * */
        console.log(err);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }
    }),

  unlikeComment: publicProcedure
    .input(z.object({ uname: z.string(), commentId: z.string() }))
    .mutation(async ({ input }) => {
      dbConnect();
      try {
        const comment: HydratedDocument<IComment> | null =
          await CommentModel.findOne({ _id: input.commentId });

        if (!comment) {
          //ie null
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Comment not found",
          });
        } else {
          if (!comment.likes.includes(input.uname)) {
            return { message: "Not Liked yet" };
          } else {
            const likesArr = comment.likes.filter((likeUname) => {
              return likeUname !== input.uname;
            });

            comment.likes = likesArr;

            const dbResp = await comment.save();

            return dbResp;
          }
        }
      } catch (err) {
        /**
         *  we compare string (comment ID) with objwct ID
         * exception will arise when mongoose won't be able to do typecasting
         * ie user send wrong lwength or format of string
         * */
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }
    }),
});
