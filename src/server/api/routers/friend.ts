import { TRPCError } from "@trpc/server";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import FriendListModel from "~/server/db/models/Friend";
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

    sendFriendReq: publicProcedure
    .input(z.object({targetUname: z.string(), requesterUname: z.string()}))
    .mutation(async ({ input }) => {
      try {
        dbConnect();
        const targetUser = await FriendReqModel.findOne({uname: input.targetUname});

        if (!targetUser) {
          //create
          console.log('Creating new');
          const reqs = [{source: input.requesterUname}];
          const friendListObj = {
            uname: input.targetUname,
            reqs: reqs
          }
          const dbResp = await FriendReqModel.create(friendListObj);
  
          
          return dbResp;
        } else {
          console.log('Modifying old');
          targetUser.reqs.push({source: input.requesterUname});
          const dbResp = await targetUser.save();
  
          return dbResp;
        }
       
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
    }),

    acceptFriendReq: publicProcedure
    .input(z.object({targetUname: z.string(), acceptorUname: z.string()}))
    .mutation(async ({ input }) => {
      try {
        dbConnect();

        const friendReqList = await FriendReqModel.findOne({uname: input.acceptorUname});
        if (!friendReqList) {
          // do something
          // res.status(500).json({message: 'int serv err'});
          throw new TRPCError ({
            code: 'NOT_FOUND'
          })
        } else {
  
        // add to friend List
  
        const friendListTarget = await FriendListModel.findOne({uname: input.targetUname});
  
        if (!friendListTarget) {
          // add
          const friendListTargetObj = {
            uname: input.targetUname,
            friends: [input.acceptorUname]
          }
          await FriendListModel.create(friendListTargetObj);
        } else {
          //modify
  
          let alreadyExists = false;
  
          for (let i=0; i<friendListTarget.friends.length; i++) {
            if (friendListTarget.friends[i] === input.acceptorUname) {
              alreadyExists = true;
              break;
            }
          }
  
          if (!alreadyExists) {
            friendListTarget.friends.push(input.acceptorUname);
            await friendListTarget.save();
          }
        }
  
        const friendListAcceptor = await FriendListModel.findOne({uname: input.acceptorUname});
  
        if (!friendListAcceptor) {
          // add
          const friendListAcceptorObj = {
            uname: input.acceptorUname,
            friends: [input.targetUname]
          }
          await FriendListModel.create(friendListAcceptorObj);
        } else {
          //modify
          let alreadyExists = false;
          for (let i=0; i<friendListAcceptor.friends.length; i++) {
            if (friendListAcceptor.friends[i] === input.targetUname) {
              alreadyExists = true;
              break;
            }
          }
          if (!alreadyExists) {
            friendListAcceptor.friends.push(input.targetUname);
            await friendListAcceptor.save();
          }
        }
          
          //delete from req list
          const newReqs = friendReqList.reqs.filter((req) => {
            return req.source !== input.targetUname;
          });
          
          //@ts-ignore
          friendReqList.reqs = newReqs;
         
  
          const dbResp1 = await friendReqList.save();
  
          return dbResp1;
        }
       
      } catch(err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'
        })
      }
    }),
});
