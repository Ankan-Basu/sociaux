import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import FriendReqModel from "~/server/db/models/FriendReq";

import dbConnect from "~/server/db/mongo";

export const friendsRouter = createTRPCRouter({
    getFriendReqList: publicProcedure
    .input(z.object({uname: z.string()}))
    .query(async ({ input }) => {
      try {

        dbConnect();
        const friendReqs = await FriendReqModel.findOne({ uname: input.uname });

        if (!friendReqs) {
          return {reqs: []}
        }
      
        return friendReqs;
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
    }),
});
