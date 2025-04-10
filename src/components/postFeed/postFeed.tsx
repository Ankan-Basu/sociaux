import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import PostEditContextProvider from "~/contexts/postEditContext";
import PostFeedContextProvider from "~/contexts/postFeedContext";
import PostModalContextProvider from "~/contexts/postModalContext";
import { api } from "~/utils/api";
import EditPost from "../edit/editPost";
import Loading from "../loading/loading";
import PostModal from "../modal/postModal";
import Post from "../posts/Post";
import PostScreen from "../posts/postScreen";
import Test from "../test/test";

const PostFeed: FC = () => {
  const [posts, setPosts] = useState<Array<Object>>([]);
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [reload, setReload] = useState({ reload: 1 });

  const router = useRouter();

  const { data, refetch, isFetching, isFetched, isLoading } = api.posts.getUserPosts.useQuery(
    { uname: `${router.query.uname || ''}` },
    {}
  );

  useEffect(() => {
    // data && setPosts(data);
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
        if (x.status === "success") {
          setPosts(x.data);
        }
  }

  if (isFetching && posts.length === 0) {
    return (
      <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
        <PostEditContextProvider additionVals={{ reload, setReload }}>
          <PostModal />
      <div className="mx-auto rounded-lg p-2 lg:w-101">
        <div className="w-80">
      <span className="text-2xl font-medium pb-4">Posts:</span>
      </div>
        <div className=" flex justify-center">
      <Loading height={100} width={100}/>
      </div>
      </div>
      </PostEditContextProvider>
      </PostFeedContextProvider>
    );
  }

  if (isFetched && posts.length === 0) {
    return (
      <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
        <PostEditContextProvider additionVals={{ reload, setReload }}>
          <PostModal />
      <div className="mx-auto rounded-lg p-2 lg:w-101">
        <div className="w-80">
      <span className="text-2xl font-medium pb-4">Posts:</span>
      </div>
        <div className=" flex justify-center">
      No posts found
      </div>
      </div>
      </PostEditContextProvider>
      </PostFeedContextProvider>
    );
  }

  return (
    <div className="mx-auto rounded-lg /z-0 p-2 lg:w-101">
      <div className="w-80">
      <span className="text-2xl font-medium pb-4">Posts:</span>
      </div>
      <div>

      </div>
      <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
        <PostEditContextProvider additionVals={{ reload, setReload }}>
          <PostModal />
          {/* <PostModalContextProvider> */}

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
          {/* </PostModalContextProvider> */}
        </PostEditContextProvider>
      </PostFeedContextProvider>
    </div>
  );
};

export default PostFeed;
