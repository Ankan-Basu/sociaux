import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import ImageModel from "~/server/db/models/Image";
import dbConnect from "~/server/db/mongo";

export const imageRouter = createTRPCRouter({
  upload: publicProcedure
    .input(z.object({image: z.string()}))
    .mutation(async ({ input }) => {

      dbConnect();
        // console.log('Img upload', input);
        const dbResp = await ImageModel.create({img: input.image});
        
      return {
        dbResp
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  get: publicProcedure
    .input(z.object({imageId: z.string()}))
    .query(async ({ input }) => {

      dbConnect();
        // console.log('Img upload', input);
        const dbResp = await ImageModel.findOne({_id: input.imageId});
        
      return {
        dbResp
      };
    })
});
