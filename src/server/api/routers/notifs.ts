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
    .input(z.object({ uname: z.string() }))
    .query(async ({ input }) => {
      dbConnect();

      const notif: HydratedDocument<INotification> | null =
        await NotificationModel.findOne({ uname: input.uname });

      return notif;
    }),
});
