import { type Session } from "next-auth";
import FriendListModel from "~/server/db/models/Friend";

const detectFriendship = async (
  ctx: { session: Session | null },
  targetUname: string
) => {  
  let isFriend = false;

  if (!ctx.session) {
    // not logged in. session: null
    isFriend = false;
  } else {
    const requesterUname = ctx.session.user.uname;

    if (!requesterUname) {
      isFriend = false;
    } else {
      //find friendList and check

      if (requesterUname === targetUname) {
        // literally the same person
        isFriend = true;
      } else {
        // find friend list of the user
        const friendList = await FriendListModel.findOne({
          uname: targetUname,
        });

        if (!friendList) {
          //target user has no friends
          isFriend = false;
        } else {
          if (friendList.friends.indexOf(requesterUname) === -1) {
            // requester not found in target's friendList
            isFriend = false;
          } else {
            isFriend = true;
          }
        }
      }
    }
  }
  return isFriend;
};

export default detectFriendship;
