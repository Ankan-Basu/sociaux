import { type HydratedDocument } from "mongoose";
import { type Session } from "next-auth";
import FriendListModel from "~/server/db/models/Friend";
import PostModel, { type IPost } from "~/server/db/models/Post";

const fetchPosts = async (ctx: { session: Session | null }, page: number) => {
  let pageNo = page;
  const limit = 500;

  const skip = (pageNo - 1) * limit;

  const posts: Array<HydratedDocument<IPost>> = await PostModel.find({}).sort({time: 'desc'});

  if (!ctx.session) {
    // not logged in
    // send only public
    let resArr = filterPublicPosts(posts);
    
    // if (resArr.length < limit/2) {
    //   // fetch some more
    //   pageNo += 1;
    //   let resArr2: Array<HydratedDocument<IPost>> = []
    //   try {
    //     resArr2 = await fetchMore(pageNo, limit, undefined, [])
    //   } catch(err) {
    //     //end
    //   } finally {
    //     resArr = resArr.concat(resArr2)
    //   }
    // }
    return {resArr, pageNo};
  }

  // target is the user who's browsing
  const targetUname = ctx.session.user.uname;

  const friendListTarget = await FriendListModel.findOne({
    uname: targetUname,
  });


  if (!friendListTarget) {
    // no fiends added ever
    // send all public
    let resArr = filterPublicPosts(posts);

    // if (resArr.length < limit/2) {
    //   // fetch some more
    //   pageNo += 1;
    //   let resArr2: Array<HydratedDocument<IPost>> = [];
    //   try {
    //     resArr2 = await fetchMore(pageNo+1, limit, targetUname, [])
    //   } catch(err) {
    //     //end
    //   } finally {
    //     resArr = resArr.concat(resArr2)
    //   }
    // }

    return {resArr, pageNo};
  }

  const friendsArrTarget = friendListTarget.friends;

  if (friendsArrTarget.length === 0) {
    // no friends
    // send all public

    let resArr = filterPublicPosts(posts);

    // if (resArr.length < limit/2) {
    //   // fetch some more
    //   pageNo += 1;
    //   let resArr2: Array<HydratedDocument<IPost>> = []
    //   try {
    //     resArr2 = await fetchMore(pageNo+1, limit, targetUname, [])
    //   } catch(err) {
    //     //end of doc
    //   } finally {
    //     resArr = resArr.concat(resArr2);
    //   }
    // }

    return {resArr, pageNo};
  }

  let resArr = posts.filter((post: HydratedDocument<IPost>) => {
    return post.privacy === 0 || targetUname === post.uname || friendsArrTarget.indexOf(post.uname) !== -1;
    // if privacy === 0(public) return it
    // else check if own post
    // else (if privacy === 1) check if the poster in in target's friendlist
    // if yes then return
  });

  // if (resArr.length < limit/2) {
  //   // fetch some more
  //   pageNo += 1;
  //     let resArr2: Array<HydratedDocument<IPost>> = []
  //     try {
  //       resArr2 = await fetchMore(pageNo+1, limit, targetUname, friendsArrTarget)
  //     } catch(err) {
  //       //end of doc
  //     } finally {
  //       resArr = resArr.concat(resArr2);
  //     }
  // }

  return {resArr, pageNo};

};

const filterPublicPosts = (posts: Array<HydratedDocument<IPost>>) => {
  const resArr = posts.filter((post: HydratedDocument<IPost>) => {
    return post.privacy === 0;
  });

  return resArr;
};

const fetchMore = async (pageNo: number, limit: number, targetUname: string|undefined|null, friendsArrTarget: string[]) => {
  const skip = (pageNo - 1) * limit;

  const posts: Array<HydratedDocument<IPost>> = await PostModel.find({}).sort({time: 'desc'}).skip(skip).limit(limit);

  if (posts.length === 0) {
    // end of db
    // return [];
    throw 'END';
  }

  if (!targetUname) {
    // notlogged in
    const resArr2 = filterPublicPosts(posts);
    return resArr2;
  }

  if (friendsArrTarget.length === 0) {
    // no friend. return public posts
    const resArr2 = filterPublicPosts(posts);
    return resArr2;
  }


  const resArr2 = posts.filter((post: HydratedDocument<IPost>) => {
    return post.privacy === 0 || targetUname === post.uname || friendsArrTarget.indexOf(post.uname) !== -1;
  });

  return resArr2;
}
export default fetchPosts;
