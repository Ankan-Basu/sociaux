import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const buttonRouter = createTRPCRouter({
  getState: publicProcedure
    .input(z.object({ profileUname: z.string() }))
    .query(({ ctx, input }) => {
      // console.log('Button', ctx, '\nprofil', input.profileUname);
      
      return {
        greeting: `Hello`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
