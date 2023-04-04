import { contextProps } from "@trpc/react-query/shared";
import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import FriendListModel from "~/server/db/models/Friend";
import PostModel, { IPost } from "~/server/db/models/Post";
import PostImageModel from "~/server/db/models/PostImage";

import dbConnect from "~/server/db/mongo";
import detectFriendship from "../utilFuncs/detectFriend";
import fetchPosts from "../utilFuncs/fetchPosts";

export const postsRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    try {
      dbConnect();

      const resArr = await fetchPosts(ctx);

      return resArr;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),

  getUserPosts: publicProcedure
    .input(z.object({ uname: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        if (!input.uname) {
          // console.log('NO UNAME IGNORING');
          return [];
        }

        dbConnect();

        ///////////////////////////////////////
        const isFriend = await detectFriendship(ctx, input.uname);
        ////////////////////////////////////////////////////////////////////////

        let posts: Array<HydratedDocument<IPost>> = [];

        if (isFriend) {
          posts = await PostModel.find({ uname: input.uname }).sort({
            time: "desc",
          });
        } else {
          posts = await PostModel.find({ uname: input.uname, privacy: 0 }).sort(
            { time: "desc" }
          );
        }

        return posts;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getOnePost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        if (!input.postId || input.postId === "undefined") {
          // console.log('Get One Post IGNORING');
          return {
            uname: undefined,
            message: undefined,
            privacy: undefined,
            imageId: undefined,
            shareId: undefined,
            likes: undefined,
            comments: undefined,
            _id: undefined,
          };
        }

        dbConnect();

        const post: HydratedDocument<IPost> | null = await PostModel.findOne({
          _id: input.postId,
        });

        if (!post) {
          // throw new TRPCError({
          //   code: "NOT_FOUND",
          //   message: "Not found"
          // })
          return {};
        }

        if (post.privacy === 0) {
          // public post;
          return post;
        } else {
          const targetUname = post.uname;
          const isFriend: boolean = await detectFriendship(ctx, targetUname);

          if (isFriend) {
            return post;
          } else {
            return {};
          }
        }

        ///////////////////////////

        // return post;
      } catch (err) {
        console.log(err);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  createPost: publicProcedure
    .input(
      z.object({
        uname: z.string(),
        privacy: z.number(),
        message: z.string(),
        img: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        dbConnect();
        // console.log(input);
        const post = input;

        const img = input.img;
        let imgResp = null;

        if (img) {
          imgResp = await PostImageModel.create({ img: img });
        }

        if (img && !imgResp) {
          //something wrong;
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Image not saved",
          });
        }

        //create post obj
        const imgId = imgResp ? imgResp._id.toString() : "";
        //  console.log('imgId', imgId);

        const postObj: IPost = {
          uname: input.uname,
          privacy: input.privacy,
          message: input.message,
          imageId: imgId,
        };

        //  console.log('post', postObj);

        const dbResp = await PostModel.create({ ...postObj, time: Date.now() });

        return dbResp;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  modifyPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        uname: z.string(),
        privacy: z.number(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      dbConnect();
      // console.log(input);

      const post = await PostModel.findOne({ _id: input.postId });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not found",
        });
      }

      post.message = input.message;
      post.privacy = input.privacy;

      const dbResp = await post.save();

      return dbResp;
    }),

  getPostImage: publicProcedure
    .input(
      z.object({
        imageId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        // console.log('imgId', input.imageId);

        if (!input.imageId) {
          return { img: "" };
        }

        if (input.imageId === "undefined") {
          return { img: "" };
        }

        dbConnect();

        try {
          const dbResp = await PostImageModel.findOne({ _id: input.imageId });
          return dbResp;
        } catch (err) {
          //wrong img id
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid Img Id",
          });
        }
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  deletePost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      dbConnect();
      // console.log(input);

      const dbResp = await PostModel.deleteOne({ _id: input.postId });

      return dbResp;
    }),

  sharePost: publicProcedure
    .input(
      z.object({
        uname: z.string(),
        privacy: z.number(),
        message: z.string(),
        shareId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        dbConnect();
        // console.log(input);
        const dbResp = await PostModel.create({
          uname: input.uname,
          privacy: input.privacy,
          message: input.message,
          shareId: input.shareId,
          time: Date.now()
        });

        return dbResp;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "catch block of share post",
        });
      }
    }),
});
