import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import FriendListModel from "~/server/db/models/Friend";
import FriendReqModel from "~/server/db/models/FriendReq";

export const buttonRouter = createTRPCRouter({
  getState: publicProcedure
    .input(z.object({ profileUname: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        if (!ctx.session) {
          return {
            code: -1,
            message: 'Login'
          };
        } else {
          const currUname = ctx.session.user.uname;
          const targetUname = input.profileUname;
          
          if (!currUname) {
            throw new TRPCError({
              code: 'UNAUTHORIZED'
            });
          }
          
          if (currUname === targetUname) {
            return {
            code: -2,
            message: 'LITERALLY ME'
          }
        }
        
        // check if friend
        const currUserFriendList = await FriendListModel.findOne({uname: currUname});
        
        if (!currUserFriendList) {
          // friendlist doesn't exist. i.e. no friend yet;
          // but there can be pending friend req
          
          return await checkFriendReqLists(currUname, targetUname);
        } else {
          // check the friendLit 
          if (currUserFriendList.friends.indexOf(targetUname) !== -1) {
            // they're friends
            return {
              code: 4,
              message: 'UNFRIEND BUTTON'
            };
          } else {
            // not friend, but can be pending
            return await checkFriendReqLists(currUname, targetUname);
          }
        }
      }
    } catch(err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR'
      })
    }
  }),
  });


const checkFriendReqLists = async (currUname: string, targetUname: string) => {
  const friendReqListTarget = await FriendReqModel.findOne({uname: targetUname});

  if (!friendReqListTarget) {
    // no req list of target exists.
    // currUser (or any user) has not send any friend req yet to target

    // but check if target user has sent friend req to currUser

    const friendReqListCurrUser = await FriendReqModel.findOne({uname: currUname});

    if (!friendReqListCurrUser) {
      // currUser has also not received any friend req (from anyone)
      // so these ppl are not friends, neither pending friends

      return {
        code: 1,
        message: 'ADD FRIEND BUTTON'
      };
    } else {
      // let's check inside the friendList of currUser

      for (let i=0; i<friendReqListCurrUser.reqs.length; i++) {
        if (friendReqListCurrUser.reqs[i]?.source === targetUname) {
          return {
            code: 2,
            message: 'ACCEPT FRIEND BUTTON'
          };
        }
      }

      // for loop ends without finding target user in currUser's request list
      // ie they're not pending friends

      return {
        code: 1,
        message: 'ADD FRIEND BUTTON'
      }
    }
  } else {
    // check inside req list of target user
    for (let i=0; i<friendReqListTarget.reqs.length; i++) {
      if (friendReqListTarget.reqs[i]?.source === currUname) {
        // currUser sent friend req to target user
        return {
          code: 3,
          message: 'CANCEL REQUEST BUTTON'
        };
      }
    }

      // for loop ended without finding currUser inside target user's req list.
      // currUser didn't send req to target user.
      // check if target user send req to currUser
      const friendReqListCurrUser = await FriendReqModel.findOne({uname: currUname});

      if (!friendReqListCurrUser) {
        // curr User didn't receive any req from anyone
        return {
          code: 1,
          message: 'ADD FRIEND BUTTON'
        }
      } else {
        // check inside currUser's req list
        for (let i=0; i<friendReqListCurrUser.reqs.length; i++) {
          if (friendReqListCurrUser.reqs[i]?.source === targetUname) {
            // target sent req
            return {
              code: 2,
              message: 'ACCEPT FRIEND BUTTON'
            };
          }
        }

        // loop ends without finding targetUser in currUser's req list
        // targetUser didn't send req to currUser
        // (neither did currUser send to targetUSer)
        return {
          code: 1,
          message: 'ADD FRIEND BUTTON'
        };
      }
  }
}