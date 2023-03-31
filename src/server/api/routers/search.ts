import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import UserModel from "~/server/db/models/User";
import dbConnect from "~/server/db/mongo";

export const searchRouter = createTRPCRouter({
  searchUser: publicProcedure
    .input(z.object({ searchName: z.string() }))
    .query(async ({ input }) => {
      try {
        dbConnect();

        const dbResp = await UserModel.find({ $or: [
          {uname: input.searchName}, 
          {name: input.searchName}
        ]}
      );

      return dbResp;

      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
    }),
});
