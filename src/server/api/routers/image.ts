import { TRPCError } from "@trpc/server";
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
      try {
        await dbConnect();
        // console.log('Img upload', input);
        const dbResp = await ImageModel.create({img: input.image});
        
        return {
          dbResp
        };
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
      }
    }),

  get: publicProcedure
    .input(z.object({imageId: z.string()}))
    .query(async ({ input }) => {
      try {
        await dbConnect();
        // console.log('Img upload', input);
        const dbResp = await ImageModel.findOne({_id: input.imageId});
        
        return {
          dbResp
        };
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
    })
});
