import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import CommentModel, { IComment } from "~/server/db/models/Comment";
import PostModel from "~/server/db/models/Post";
import dbConnect from "~/server/db/mongo";
import removeNotification from "../utilFuncs/removeNotification";
import sendNotification from "../utilFuncs/sendNotification";

export const commentsRouter = createTRPCRouter({
  getComments: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      try {
        await dbConnect();
        
        const comments: Array<HydratedDocument<IComment>> =
        await CommentModel.find({ postId: input.postId }).sort({time: 'desc'});
        
        return comments;
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
      }
    }),

  postComment: publicProcedure
    .input(
      z.object({ uname: z.string(), postId: z.string(), message: z.string() })
    )
    .mutation(async ({ input }) => {
      try {
        await dbConnect();
        const dbResp: HydratedDocument<IComment> = await CommentModel.create({
          ...input, time: Date.now()
        });
        if (dbResp) {

          // send notification
          (async () => {
            try {
              // get the targetuname from the post
              const post = await PostModel.findOne({_id: input.postId});
              if (!post) {
                //ignore
                return;
              } else {
                sendNotification({uname: post.uname, source: input.uname, type: "comment", postId: input.postId, commentId: dbResp._id.toString()})
                .then(()=>{}).catch(()=>{});

              }
            } catch(err) {
              //ignore
            }
          })()
          .then(()=>{}).catch(()=>{});

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
      try {
       await dbConnect();
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
            code: "BAD_REQUEST",
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
    .input(z.object({ uname: z.string(), commentId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await dbConnect();
        const dbResp = await CommentModel.findOneAndDelete({ _id: input.commentId });

        // console.log('DELETE COMMENT', dbResp);

        if (!dbResp) {
          throw new TRPCError({
            code: "NOT_FOUND"
          })
        }
        

        //remove notification
        (async () => {
          try {
            // get the targetuname from the post
            const post = await PostModel.findOne({_id: dbResp.postId});
            if (!post) {
              //ignore
              return;
            } else {
              removeNotification({uname: post.uname, source: input.uname, type: "comment", postId: post._id.toString(), commentId: dbResp._id.toString()})
              .then(()=>{}).catch(()=>{});

            }
          } catch(err) {
            //ignore
          }
        })()
        .then(()=>{}).catch(()=>{});


        return dbResp;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Not found",
        });
      }
    }),
});
