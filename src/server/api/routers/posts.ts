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
import PostImageModel, { IPostImage } from "~/server/db/models/PostImage";

import dbConnect from "~/server/db/mongo";
import detectFriendship from "../utilFuncs/detectFriend";
import fetchPosts from "../utilFuncs/fetchPosts";

export const postsRouter = createTRPCRouter({
  getAllPosts: publicProcedure
  .input(z.object({page: z.number()}))
  .query(async ({ ctx, input }) => {
    try {
      await dbConnect();

      const x = await fetchPosts(ctx, input.page);

      return {resArr: x.resArr, pageNo: x.pageNo};
    } catch (err) {
      
      if (err instanceof TRPCError) {
        throw err
      }
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
          // 'NO UNAME IGNORING';
          return [];
        }

        await dbConnect();

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
        if (err instanceof TRPCError) {
          throw err
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getOnePost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const invPost = {
        uname: undefined,
        message: undefined,
        privacy: undefined,
        imageId: undefined,
        shareId: undefined,
        time: undefined,
        likes: undefined,
        comments: undefined,
        _id: undefined,
      };


      try {
        if (!input.postId || input.postId === "undefined") {
          // 'Get One Post IGNORING';
          return invPost;
        }
        await dbConnect();

        try {
          const post: HydratedDocument<IPost> | null = await PostModel.findOne({
            _id: input.postId,
          });

          if (!post) {
            // throw new TRPCError({
              //   code: "NOT_FOUND",
              //   message: "Not found"
              // })
              return invPost;
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
                return invPost;
              }
            }
            
          } catch(err) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Invalid ID'
            })
          }
            ///////////////////////////
            
            // return post;
      } catch (err) {
        if (err instanceof TRPCError) {
          throw err
        }

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
        await dbConnect();
        const post = input;

        const img = input.img;
        let imgResp: HydratedDocument<IPostImage> | null = null;

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

        const postObj: IPost = {
          uname: input.uname,
          privacy: input.privacy,
          message: input.message,
          imageId: imgId,
          comments: []
        };

        const dbResp = await PostModel.create({ ...postObj, time: Date.now() });

        return dbResp;
      } catch (err) {
        if (err instanceof TRPCError) {
          throw err
        }
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
      try {

        await dbConnect();

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
    } catch(err) {
      if (err instanceof TRPCError) {
        throw err
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR'
      })
    }
    }),

  getPostImage: publicProcedure
    .input(
      z.object({
        imageId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        if (!input.imageId) {
          return { img: "" };
        }

        if (input.imageId === "undefined") {
          return { img: "" };
        }

        await dbConnect();

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
        if (err instanceof TRPCError) {
          throw err
        }
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
      try {

        await dbConnect();
        
        const dbResp = await PostModel.deleteOne({ _id: input.postId });
        
        return dbResp;
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
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
        await dbConnect();
        const dbResp = await PostModel.create({
          uname: input.uname,
          privacy: input.privacy,
          message: input.message,
          shareId: input.shareId,
          time: Date.now(),
          comments: []
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
