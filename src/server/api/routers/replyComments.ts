import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import CommentModel, { IComment } from "~/server/db/models/Comment";
import ReplyCommentModel, {
  IReplyComment,
} from "~/server/db/models/ReplyComment";
import dbConnect from "~/server/db/mongo";
import removeNotification from "../utilFuncs/removeNotification";
import sendNotification from "../utilFuncs/sendNotification";

export const replyCommentsRouter = createTRPCRouter({
  getComments: publicProcedure
    .input(z.object({ parenCommId: z.string() }))
    .query(async ({ input }) => {
      dbConnect();

      const replyComments: Array<HydratedDocument<IReplyComment>> =
        await ReplyCommentModel.find({ parenCommId: input.parenCommId });

      return replyComments;
    }),

  postReplyComment: publicProcedure
    .input(
      z.object({
        uname: z.string(),
        parenCommId: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      dbConnect();

      const parenComm = await CommentModel.findOne({ _id: input.parenCommId });

      if (!parenComm) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not found",
        });
      } else {
        const replyCommObj: IReplyComment = {
          uname: input.uname,
          parenCommId: input.parenCommId,
          message: input.message
        };

        try {
          const replyComm: HydratedDocument<IReplyComment> | null =
            await ReplyCommentModel.create({...replyCommObj, time: Date.now()});
          if (!replyComm) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Internal Server Error",
            });
          } else {
            parenComm.replies.push(replyComm._id.toString());

            const dbResp = await parenComm.save();



            sendNotification({source: input.uname, uname: parenComm.uname, type: "replyToComment", postId: parenComm.postId, commentId: parenComm._id.toString(),
          replyCommentId: replyComm._id.toString()});

          
            return dbResp;
          }
        } catch (err) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal Server Error",
          });
        }
      }
    }),

    editReplyComment: publicProcedure
    .input(
      z.object({
        uname: z.string(),
        replyCommId: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      dbConnect();

      const comment = await ReplyCommentModel.findOne({ _id: input.replyCommId });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not found",
        });
      } else {
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
      }
    }),

  deleteReplyComment: publicProcedure
    .input(
      z.object({
        uname: z.string(),
        parenCommId: z.string(),
        replyCommId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      dbConnect();
      try {
        const parenComm: HydratedDocument<IComment> | null =
          await CommentModel.findOne({ _id: input.parenCommId });

        if (!parenComm) {
          // ie null
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Parent Comment Not found",
          });
        } else {
          try {
            // remove from parenComm

            //    if (parenComm.replies.includes(reqBody.commentId)) {

            //    }
            //    const repliesArr = parenComm.replies.filter((reply) => {
            //         return reply !== reqBody.commentId;
            //    });

            // try in single pass
            const repliesArr: Array<string> = [];

            const len = parenComm.replies.length;
            let found = false;

            for (let i = 0; i < len; i++) {
              if (parenComm.replies[i] === input.replyCommId) {
                found = true;
              } else {
                repliesArr.push(parenComm.replies[i]!);
              }
            }
            /*********************************************** */
            if (!found) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: "Reply comment doesnt exist",
              });
            } else {
              parenComm.replies = repliesArr;

              const dbResp1 = await parenComm.save();
              // err will be catched by catch block;

              const dbResp = await ReplyCommentModel.deleteOne({
                _id: input.replyCommId,
              });



              //remove the notif
              removeNotification({source: input.uname, uname: parenComm.uname, type: "replyToComment", postId: parenComm.postId, commentId: parenComm._id.toString(),
          replyCommentId: input.replyCommId});




              return dbResp1;
            }
          } catch (err) {
            // console.log('INNER DEL CMM', err);
            
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Internal server error",
            });
          }
        }
      } catch (err) {
        // console.log('Outer DEL CMM', err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
        });
      }
    }),
});
