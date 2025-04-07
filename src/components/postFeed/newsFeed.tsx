import { FC, useEffect, useState } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
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

const NewsFeed: FC = () => {
  // const [posts, setPosts] = useState<Array<Object>>([]);
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [reload, setReload] = useState({ reolad: 1 });

  let postsQuery = api.posts.getAllPosts.useQuery({page: page});  

  useEffect(() => {
    (async () => {
      await postsQuery.refetch();
    }
    )()
    setShowExpanded(false)
  }, [reload]);

  const increasePageNo = () => {
    setPage((currPage) => currPage + 1)
    setReload({reolad: 1})
  }

  const decreasePageNo = () => {
    if (page === 1) {
      return;
    }
    setPage((currPage) => currPage - 1)
    setReload({reolad: 1})
  }

  if (postsQuery.isFetching && postsQuery.data === undefined) {
    return (
      <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
        <PostEditContextProvider additionVals={{ setReload }}>
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

  if (postsQuery.isFetched && postsQuery.data?.resArr?.length === 0) {
    return (
      <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
        <PostEditContextProvider additionVals={{ setReload }}>
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
    <div className="m-auto rounded-lg p-2 lg:w-101">
      <div className="w-80">
      <span className="text-2xl font-medium pb-4">Posts:</span>
      </div>
      <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
        <PostEditContextProvider additionVals={{ setReload }}>
              <PostModal />
        {/* <PostModalContextProvider> */}
          {postsQuery.data?.resArr?.map((post: any) => {
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
      {/* <Test /> */}
      {/* <div className="flex justify-between mb-20 sm:mb-6 text-primary
      active:text-primary2 lg:hover:text-primary2 lg:active:text-primary
      font-medium text-lg
      ">
        <span 
        className="flex items-center gap-2"
        onClick={decreasePageNo}
        >
          <FiArrowLeft />Previous
        </span>
        <span 
        className="flex items-center gap-2"
        onClick={increasePageNo}
        >
          Next <FiArrowRight />
        </span>
      </div> */}
    </div>
  );
};

export default NewsFeed;
