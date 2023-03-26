import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import NotificationModel, {
  INotification,
} from "~/server/db/models/Notification";
import dbConnect from "~/server/db/mongo";

export const notifsRouter = createTRPCRouter({
  getNotifs: publicProcedure
    .input(z.object({ uname: z.string()}))
    .query(async ({ input }) => {
      try {

        dbConnect();
        
        const notif: HydratedDocument<INotification> | null =
        await NotificationModel.findOne({ uname: input.uname });
        
        console.log('Notif Api\n', notif);
        
        if (!notif) {
          return {notifs: []};
        }
        return notif;
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
        // return {notifs: []};
      }
    }),
});
