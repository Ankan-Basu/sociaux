import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import OtpModel from "~/server/db/models/Otp";
import UserModel from "~/server/db/models/User";
import dbConnect from "~/server/db/mongo";
import otpGenerator from "../utilFuncs/otpGenerator";
import { transporter } from "../utilFuncs/transporter";

export const passwordResetRouter = createTRPCRouter({
  verifyMail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      try {
        dbConnect();

        const dbResp = await UserModel.findOne({email: input.email});

        if (!dbResp) {
          return false;
        }
        return true;
      } catch(err) {
        if (err instanceof TRPCError) {
          throw err;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
      }
    }),
  sendOtp: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      try {
        dbConnect();

        // check if email exists;

        const user = await UserModel.findOne({email: input.email});

        if (!user) {
          return {
            status: 500,
            message: 'Email not registered'
          }
        }

        const email = input.email;

        const otp = otpGenerator(6);
        const resp = await transporter.sendMail({
          from: process.env.MAIL,
          to: email,
          subject: 'Password Reset',
          text: `OTP is ${otp}. Valid for 5 mins.`
        });

        const dbResp = await OtpModel.findOneAndUpdate({email: input.email}, {email: input.email, otp: otp, expireAt: Date.now()}, {upsert: true});

        return {
          status: 200,
          message: 'Success'
        }
    

      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
    }),



    verifyOtp: publicProcedure
    .input(z.object({ email: z.string(), otp: z.string() }))
    .mutation(async ({ input }) => {
      try {
        dbConnect();

        const dbResp = await OtpModel.findOne({email: input.email});

        if (!dbResp) {
          // otp expired
          return false;
        }

        return (dbResp.otp === input.otp);
      } catch(err) {
        if (err instanceof TRPCError) {
          throw err;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
      }
    }),


    changePassword: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      try {
        dbConnect();

        const user = await UserModel.findOne({email: input.email});

        if (!user) {
          throw new TRPCError({
            code: 'BAD_REQUEST'
          });
        }
        
        user.password = input.password;
        const dbResp = await user.save();

        return dbResp;
      } catch(err) {
        if (err instanceof TRPCError) {
          throw err;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        });
      }
    }),


});
