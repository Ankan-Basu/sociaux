// import PostFeedContextProvider, { PostFeedContext } from '@/contexts/postFeedContext';
import { useRouter } from "next/router";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "~/utils/api";
import EditPost from "../edit/editPost";
import Post from "../posts/Post";
import PostScreen from "../posts/postScreen";

export const PostFeedContext = createContext<any>(null);

export const PostEditContext = createContext<any>(null);

const PostFeed: FC = () => {
  const [posts, setPosts] = useState<Array<Object>>([]);
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [currPost, setCurrPost] = useState(null);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currEditPost, setCurrEditPost] = useState(null);

  const [reload, setReload] = useState({reolad: 1});

  // const {showExpanded} = useContext(PostFeedContext)

  const router = useRouter();

  const { data, refetch } = api.posts.getUserPosts.useQuery(
    { uname: `${router.query.uname}` },
    {}
  );

  useEffect(() => {
    // data && setPosts(data);
    // console.log(data);

    if (router.query.uname) {
      (async () => {
        const x = await refetch();
        console.log(x);
        if (x.status === "success") {
          setPosts(x.data);
        }
      })();
    }
  }, [router, reload]);

  return (
    <div className="m-auto rounded-lg p-2 lg:w-101">
      Posts:
      <PostFeedContext.Provider
        value={{
          showExpanded,
          setShowExpanded,
          currPost,
          setCurrPost,
        }}
      >

        <PostEditContext.Provider
        value={{
          showEditModal,
          setShowEditModal,
          currEditPost,
          setCurrEditPost,
          setReload
        }}
        >
        {/* <PostFeedContextProvider> */}
        {posts.map((post: any) => {
          return (
            <Post
              key={post._id}
              expanded={false}
              uname={post.uname}
              message={post.message}
              privacy={post.privacy}
              time={post.time}
              likes={post.likes}
              comments={post.comments}
              _id={post._id}
            />
          );
        })}
        <PostScreen display={showExpanded} />
        <EditPost />
        {/* </PostFeedContextProvider> */}
        </PostEditContext.Provider>
      </PostFeedContext.Provider>
    </div>
  );
};

export default PostFeed;
