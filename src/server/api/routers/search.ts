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
        if (!input.searchName) {
          return []
        }

        dbConnect();

        // const queryString = '^' + input.searchName;
        const queryString = '^' + input.searchName + '|' + '\\s' + input.searchName;

        // set 'i' for case insensitive matching
        const queryRegexp = new RegExp(queryString, 'i');


        const dbResp = await UserModel.find({ $or: [
          {uname: {$regex: queryRegexp}}, 
          {name: {$regex: queryRegexp}}
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
