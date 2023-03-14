import { HydratedDocument } from "mongoose";
import { string, z } from "zod";
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
    .input(z.object({ uname: z.string() }))
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
      

      

      return 'xD';
    }),
});
