import { TRPCError } from "@trpc/server";
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
      try {
        if (!input.uname) {
          console.log('user, ignoring', input.uname);
          return {
            uname: undefined,
            name: undefined,
            email: undefined
          };
        }

        dbConnect();
        // console.log('Context', ctx);
        
        const res: IUser | null = await UserModel.findOne({uname: input.uname});
        
        return res; 
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
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
      try {
        if (!input.uname) {
          return {img: ''}
        }
        
        dbConnect();
        // console.log('Img upload', input);
        const dbResp = await ProfileImageModel.findOne({uname: input.uname});
        
        if (!dbResp) {
          return {img:''};
        }
        
        return {img: dbResp.img};
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
    }),



    // change to private
    modifyBio: publicProcedure
    .input(z.object({uname: z.string(), bio: z.string()}))
    .mutation(async ({ input }) => {

      try {

        dbConnect();
        const dbResp = await UserModel.findOneAndUpdate({uname: input.uname}, {uname: input.uname, bio: input.bio}, {upsert: false});
        
        return {
          dbResp
        };
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
      }
    }),

    modifyName: publicProcedure
    .input(z.object({uname: z.string(), fName: z.string()}))
    .mutation(async ({ input }) => {

      try {

        dbConnect();
        const dbResp = await UserModel.findOneAndUpdate({uname: input.uname}, {uname: input.uname, name: input.fName}, {upsert: false});
        
        return {
          dbResp
        };
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
      }
    }),


    modifyEmail: publicProcedure
    .input(z.object({uname: z.string(), email: z.string()}))
    .mutation(async ({ input }) => {

      try {
        dbConnect();
        const dbResp = await UserModel.findOneAndUpdate({uname: input.uname}, {uname: input.uname, email: input.email}, {upsert: false});
        
        return {
          dbResp
        };
      } catch(err: any) {
        // console.log(err.codeName);
        
        if (err.codeName === 'DuplicateKey') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Duplicate Email'
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
        
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
