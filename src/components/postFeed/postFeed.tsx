import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import PostEditContextProvider from "~/contexts/postEditContext";
import PostFeedContextProvider from "~/contexts/postFeedContext";
import { api } from "~/utils/api";
import EditPost from "../edit/editPost";
import Loading from "../loading/loading";
import Post from "../posts/Post";
import PostScreen from "../posts/postScreen";

const PostFeed: FC = () => {
  const [posts, setPosts] = useState<Array<Object>>([]);
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [reload, setReload] = useState({ reload: 1 });

  const router = useRouter();

  const { data, refetch, isFetching } = api.posts.getUserPosts.useQuery(
    { uname: `${router.query.uname || ''}` },
    {}
  );

  useEffect(() => {
    // data && setPosts(data);
    // console.log(data);

    if (router.query.uname) {
      (async () => {
        refetchData()
      })();
    }
  }, [reload]);

  useEffect(() => {
    if (router.query.uname) {
      refetchData();
      setShowExpanded(false);
    }

    return () => {
      setPosts([]);
    }
  }, [router])

  const refetchData = async () => {
    const x = await refetch();
        console.log(x);
        if (x.status === "success") {
          setPosts(x.data);
        }
  }

  if (isFetching && posts.length === 0) {
    return (
      <div className="mx-auto rounded-lg p-2 lg:w-101 flex justify-center
      ">
      <Loading height={100} width={100}/>
      </div>
    );
  }

  return (
    <div className="m-auto rounded-lg p-2 lg:w-101">
      Posts:
      <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
        <PostEditContextProvider additionVals={{ reload, setReload }}>
          {posts.map((post: any) => {
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

export default PostFeed;
