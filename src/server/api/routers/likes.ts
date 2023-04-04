import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import CommentModel, { IComment } from "~/server/db/models/Comment";
import NotificationModel from "~/server/db/models/Notification";
import PostModel, { IPost } from "~/server/db/models/Post";
import ReplyCommentModel, { IReplyComment } from "~/server/db/models/ReplyComment";
import dbConnect from "~/server/db/mongo";
import removeNotification from "../utilFuncs/removeNotification";
import sendNotification from "../utilFuncs/sendNotification";

export const likesRouter = createTRPCRouter({
  likePost: publicProcedure
    .input(z.object({ uname: z.string(), postId: z.string() }))
    .mutation(async ({ input }) => {
      try {

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
        if (!post.likes!.includes(input.uname)) {
          post.likes!.push(input.uname);
          const dbResp = await post.save();

          //change
          sendNotification({uname: post.uname, source: input.uname, type: 'likePost', postId: post._id.toString()});

          
          return dbResp;
        } else {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Already Liked'
            })
          }
        }
      } catch(err) {
        // console.log("POST LIKE", err);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
    }),

  unlikePost: publicProcedure
    .input(z.object({ uname: z.string(), postId: z.string() }))
    .mutation(async ({ input }) => {
      try {

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
        if (post.likes!.includes(input.uname)) {
          const likesArr = post.likes!.filter((likeName: string | undefined) => {
            return likeName !== input.uname;
          });
          post.likes = likesArr;
          
          const dbResp = await post.save();


          //// remove notif
          removeNotification({source: input.uname, uname: post.uname, type: 'likePost', postId: post._id.toString()});

          
          return dbResp;
        } else {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not Liked yet'
          });
        }
      }
    } catch(err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR'
      })
    }
    }),

  likeComment: publicProcedure
    .input(z.object({ uname: z.string(), commentId: z.string() }))
    .mutation(async ({ input }) => {
      try {
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

            sendNotification({source: input.uname, uname: comment.uname, type: "likeComment", commentId: comment._id.toString(), postId: comment.postId})

            return dbResp;
          }
        }
      } catch (err) {
        /**
         *  we compare string (comment ID) with objwct ID
         * exception will arise when mongoose won't be able to do typecasting
         * ie user send wrong lwength or format of string
         * */
        // console.log(err);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }
    } catch(err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR'
      })
    }
    }),

  unlikeComment: publicProcedure
    .input(z.object({ uname: z.string(), commentId: z.string() }))
    .mutation(async ({ input }) => {
      try {

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

            removeNotification({source: input.uname, uname: comment.uname, type: "likeComment", commentId: comment._id.toString(), postId: comment.postId});

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
    } catch(err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR'
      })
    }
    }),

    likeReplyComment: publicProcedure
    .input(z.object({ uname: z.string(), replyCommentId: z.string() }))
    .mutation(async ({ input }) => {
      dbConnect();
      try {
        const replyComment: HydratedDocument<IReplyComment> | null =
          await ReplyCommentModel.findOne({ _id: input.replyCommentId });
        // console.log(comment);
        if (!replyComment) {
          //ie null
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Comment not found",
          });
        } else {
          if (replyComment.likes.includes(input.uname)) {
            return {
              message: "Already Liked",
            };
          } else {
            replyComment.likes.push(input.uname);

            const dbResp = await replyComment.save();


            // send the notification
            (async () => {

              // find the parent postId
              const parenComm = await CommentModel.findOne({_id: replyComment.parenCommId});
              
              if (!parenComm) {
                return;
              } else {              
                sendNotification({uname: replyComment.uname, source: input.uname, type: "likeReplyComment", commentId: replyComment.parenCommId, replyCommentId: replyComment._id.toString(), postId: parenComm.postId});   
              }
            })();



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

    unlikeReplyComment: publicProcedure
    .input(z.object({ uname: z.string(), replyCommentId: z.string() }))
    .mutation(async ({ input }) => {
      dbConnect();
      try {
        const replyComment: HydratedDocument<IReplyComment> | null =
          await ReplyCommentModel.findOne({ _id: input.replyCommentId });

        if (!replyComment) {
          //ie null
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Comment not found",
          });
        } else {
          if (!replyComment.likes.includes(input.uname)) {
            return { message: "Not Liked yet" };
          } else {
            const likesArr = replyComment.likes.filter((likeUname) => {
              return likeUname !== input.uname;
            });

            replyComment.likes = likesArr;

            const dbResp = await replyComment.save();


            // remove the notification
            (async () => {

              // find the parent postId
              const parenComm = await CommentModel.findOne({_id: replyComment.parenCommId});
              
              if (!parenComm) {
                return;
              } else {              
                removeNotification({uname: replyComment.uname, source: input.uname, type: "likeReplyComment", commentId: replyComment.parenCommId, replyCommentId: replyComment._id.toString(), postId: parenComm.postId});   
              }
            })();

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
