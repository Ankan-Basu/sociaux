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
        // shares?: z.number(),
        // likes?: z.array(string()),
        // comments?: z.array(string()),
        // time?: z.date()
    }))
    .mutation(async ({ input }) => {
      dbConnect();
      console.log(input);
      const post = input;

      const dbResp = await PostModel.create(post);

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
