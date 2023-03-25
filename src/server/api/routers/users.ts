import { HydratedDocument } from "mongoose";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import ProfileImageModel from "~/server/db/models/profileImage";

import UserModel, { IUser } from "~/server/db/models/User";
import dbConnect from "~/server/db/mongo";

export const usersRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ uname: z.string() }))
    .query(async ({ ctx, input }) => {
        dbConnect();
        console.log('Context', ctx);
        
      const res: IUser | null = await UserModel.findOne({uname: input.uname});
      
        return res; 
    }
    ),

    uploadProfileImage: publicProcedure
    .input(z.object({uname: z.string(), image: z.string()}))
    .mutation(async ({ input }) => {

      dbConnect();
        // console.log('Img upload', input);
        const dbResp = await ProfileImageModel.findOneAndUpdate({uname: input.uname}, {uname: input.uname, img: input.image}, {upsert: true});
        
      return {
        dbResp
      };
    }),

    getProfileImage: publicProcedure
    .input(z.object({uname: z.string()}))
    .query(async ({ input }) => {

      dbConnect();
        // console.log('Img upload', input);
        const dbResp = await ProfileImageModel.findOne({uname: input.uname});

        if (!dbResp) {
          return {img:''};
        }
        
      return {img: dbResp.img};
    }),


  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
