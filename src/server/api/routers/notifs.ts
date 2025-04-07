import { TRPCError } from "@trpc/server";
import { HydratedDocument, ObjectId } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import NotificationModel, {
  INotification, INotifItem,
} from "~/server/db/models/Notification";
import dbConnect from "~/server/db/mongo";

export const notifsRouter = createTRPCRouter({
  getNotifs: publicProcedure
    .input(z.object({ uname: z.string()}))
    .query(async ({ input }) => {
      try {

        await dbConnect();
        
        const notif: HydratedDocument<INotification> | null =
        await NotificationModel.findOne({ uname: input.uname });
                
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



    readNotifs: publicProcedure
    .input(z.object({ uname: z.string(), notifId: z.string()}))
    .mutation(async ({ input }) => {
      try {

        await dbConnect();
        
        const dbRes = await NotificationModel.findOne({ uname: input.uname });

        if (!dbRes) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'unknown'
          })
        }

        let notifs2: Array<INotifItemHydrated>;

        interface INotifItemHydrated extends INotifItem {
          _id?: ObjectId;
        }

        if (input.notifId === "0") {
          //delete all
          notifs2 = [];
        } else {
          notifs2 = dbRes.notifs.filter((notif: INotifItemHydrated) => {
            return notif._id?.toString() != input.notifId;
            // !=. !== won't work coz comaparing objectID with string
          });
        }
  
        dbRes.notifs = notifs2;
  
        const dbRes2 = await dbRes.save();
  
        return dbRes2;
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
        // return {notifs: []};
      }
    }),
});
