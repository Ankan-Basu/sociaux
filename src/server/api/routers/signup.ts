import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

import UserModel, { IUser } from "~/server/db/models/User";
import dbConnect from "~/server/db/mongo";

export const signupRouter = createTRPCRouter({
    signup: publicProcedure
    .input(z.object({ uname: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string()}))
    .mutation(async ({ input }) => {
        try {
            dbConnect();

            const user = await UserModel.create(input);
            if (!user) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR'
                });
            }
            return {status:201, ...user};
        } catch(err) {
            let errorsFound = handleErrors(err);
            if (errorsFound.others) {
              return {status: 500, message: 'Internal Server Error'};
            } else {
              return {status: 400, ...errorsFound};
            }
        }
    }),
});

const handleErrors = (error: any) => {
    const errorsFound = {email: '',uname: '', password: '', others: false};
  
    if (error.message.includes('user validation failed')) {
      Object.values(error.errors).forEach((item: any) => {
        //@ts-ignore
        errorsFound[item.properties.path] = item.properties.message
      })
    } else if (error.message.includes('duplicate key error')) {
      if (error.message.includes('email')) {
        errorsFound['email'] = 'duplicate email';
      } else if (error.message.includes('uname')) {
        errorsFound['uname'] = 'duplicate uname';
      } else {
        errorsFound['others'] = true;
      }
    } else {
      errorsFound['others'] = true;
    }
  
    return errorsFound;
  }