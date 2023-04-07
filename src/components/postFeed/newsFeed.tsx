import { FC, useEffect, useState } from "react";
import PostEditContextProvider from "~/contexts/postEditContext";
import PostFeedContextProvider from "~/contexts/postFeedContext";
import { api } from "~/utils/api";
import EditPost from "../edit/editPost";
import Loading from "../loading/loading";
import Post from "../posts/Post";
import PostScreen from "../posts/postScreen";

const NewsFeed: FC = () => {
  // const [posts, setPosts] = useState<Array<Object>>([]);
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [reload, setReload] = useState({ reolad: 1 });

  let postsQuery = api.posts.getAllPosts.useQuery();
  console.log('News feed', postsQuery);
  

  useEffect(() => {
    // (async () => {
      
    //   // console.log('NewsFeed2', postsQuery2);
      
    // })();
    postsQuery.refetch();
    setShowExpanded(false)
  }, [reload])

  if (postsQuery.isFetching && postsQuery.data === undefined) {
    return (
      <>
      <div className="mx-auto rounded-lg p-2 lg:w-101 flex justify-center
      ">
      <Loading height={100} width={100}/>
      </div>
      </>
    );
  }

  return (
    <div className="m-auto rounded-lg p-2 lg:w-101">
      Posts:
      <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
        <PostEditContextProvider additionVals={{ setReload }}>
          {postsQuery.data?.map((post: any) => {
            return (
              <Post
                key={post._id}
                expanded={false}
                uname={post.uname}
                message={post.message}
                privacy={post.privacy}
                imageId={post.imageId}
                shareId={post.shareId}
                time={post.time}
                likes={post.likes}
                comments={post.comments}
                _id={post._id}
              />
            );
          })}
          <PostScreen display={showExpanded} />
          <EditPost />
        </PostEditContextProvider>
      </PostFeedContextProvider>
    </div>
  );
};

export default NewsFeed;
