import { type HydratedDocument } from "mongoose";
import { type Session } from "next-auth";
import FriendListModel from "~/server/db/models/Friend";
import PostModel, { type IPost } from "~/server/db/models/Post";

const fetchPosts = async (ctx: { session: Session | null }) => {
  const posts: Array<HydratedDocument<IPost>> = await PostModel.find({}).sort({time: 'desc'});

  if (!ctx.session) {
    // not logged in
    // send only public
    const resArr = filterPublicPosts(posts);
    return resArr;
  }

  const targetUname = ctx.session.user.uname;

  const friendListTarget = await FriendListModel.findOne({
    uname: targetUname,
  });


  if (!friendListTarget) {
    // no fiends added ever
    // send all public
    const resArr = filterPublicPosts(posts);

    return resArr;
  }

  const friendsArrTarget = friendListTarget.friends;

  if (friendsArrTarget.length === 0) {
    // no friends
    // send all public

    const resArr = filterPublicPosts(posts);

    return resArr;
  }

  const resArr = posts.filter((post: HydratedDocument<IPost>) => {
    return post.privacy === 0 || targetUname === post.uname || friendsArrTarget.indexOf(post.uname) !== -1;
    // if privacy === 0(public) return it
    // else check if own post
    // else (if privacy === 1) check if the poster in in target's friendlist
    // if yes then return
  });

  return resArr;
};

const filterPublicPosts = (posts: Array<HydratedDocument<IPost>>) => {
  const resArr = posts.filter((post: HydratedDocument<IPost>) => {
    return post.privacy === 0;
  });

  return resArr;
};

export default fetchPosts;
