import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import PostModel, { IPost } from "~/server/db/models/Post";
import PostImageModel from "~/server/db/models/PostImage";

import dbConnect from "~/server/db/mongo";

export const postsRouter = createTRPCRouter({
  getAllPosts: publicProcedure
    .query(async () => {
      dbConnect();
        const posts: Array<HydratedDocument<IPost>> = await PostModel.find({})
      

      return posts;
    }),
    
    
    getUserPosts: publicProcedure
    .input(z.object({ uname: z.string()}))
    .query(async ({ input }) => {
      dbConnect();
      const posts: Array<HydratedDocument<IPost>> = await PostModel.find({uname: input.uname})
      

      return posts;
    }),
    
    
    getOnePost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      dbConnect();

      
      const post: Array<HydratedDocument<IPost>> | null = await PostModel.findOne({_id: input.postId})
      
      if (!post) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Not found"
        })
      }

      return post;
    }),

    
    createPost: publicProcedure
    .input(z.object({
        uname: z.string(),
        privacy: z.number(),
        message: z.string(),
        img: z.string(),
    }))
    .mutation(async ({ input }) => {
      dbConnect();
      console.log(input);
      const post = input;

      const img = input.img;
      let imgResp = null;
      
      if (img) {
        imgResp = await PostImageModel.create({img: img});
      }

     if (img && !imgResp) {
      //something wrong;
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Image not saved'
      });
     }

     //create post obj
     const imgId = imgResp?imgResp._id.toString() : '';
     console.log('imgId', imgId);
     
     const postObj: IPost = {
      uname: input.uname,
      privacy: input.privacy,
      message: input.message,
      imageId: imgId
     };

     console.log('post', postObj);
     

      const dbResp = await PostModel.create(postObj);

      return dbResp;
    }),


    modifyPost: publicProcedure
    .input(z.object({
        postId: z.string(),
        uname: z.string(),
        privacy: z.number(),
        message: z.string(),
    }))
    .mutation(async ({ input }) => {
      dbConnect();
      console.log(input);

      const post = await PostModel.findOne({_id: input.postId});

      if (!post) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Not found"
        })
      }

      post.message = input.message;
      post.privacy = input.privacy;

      const dbResp = await post.save();

      return dbResp;
    }),


    getPostImage: publicProcedure
    .input(z.object({
        imageId: z.string(),
        
    }))
    .query(async ({ input }) => {
      try {
        console.log('imgId', input.imageId);
        
        if (!input.imageId) {
          return {img: ''}
        }

        if (input.imageId === 'undefined') {
          return {img: ''}
        }

        dbConnect();
        
        try {
          const dbResp = await PostImageModel.findOne({_id: input.imageId});
          return dbResp;
        } catch(err) {
          //wrong img id
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid Img Id'
          })
        }        
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
      }
    }),

    deletePost: publicProcedure
    .input(z.object({
        postId: z.string(),
        
    }))
    .mutation(async ({ input }) => {
      dbConnect();
      console.log(input);

      const dbResp = await PostModel.deleteOne({_id: input.postId});

      return dbResp;
    }),
});
