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

export const postsRouter = createTRPCRouter({
    getFriendReqList: publicProcedure
    .input(z.object({uname: z.string()}))
    .query(async ({ input }) => {
        dbConnect();
        const notif = await FriendReqModel.findOne({ uname: input.uname });
            
        return notif;
    }),
});
