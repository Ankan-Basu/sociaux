import { HydratedDocument } from "mongoose";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import UserModel, { IUser } from "~/server/db/models/User";
import dbConnect from "~/server/db/mongo";

export const usersRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ uname: z.string() }))
    .query(async ({ input }) => {
        dbConnect();
        console.log(input);
        
      const res: IUser | null = await UserModel.findOne({uname: input.uname});
      
        return res; 
    }
    ),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
