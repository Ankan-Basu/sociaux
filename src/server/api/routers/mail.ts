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

export const mailRouter = createTRPCRouter({
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
          from: 'ankan.basu.webdev@gmail.com',
          to: email,
          subject: 'Password Reset',
          text: `OTP is ${otp}`
        });

        const dbResp = await OtpModel.findOneAndUpdate({uname: 'testOTP'}, {uname: 'testOTP', otp: otp, expireAt: Date.now()}, {upsert: true});
        // console.log('MAIL', resp);

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


});
