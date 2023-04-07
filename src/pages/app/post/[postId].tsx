import { type FC, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Post from "~/components/posts/Post";
import CommentScreen from "~/components/comment/commentScreen";
import { api } from "~/utils/api";
import PostFeedContextProvider from "~/contexts/postFeedContext";
import PostEditContextProvider from "~/contexts/postEditContext";
import { type IPost } from "~/server/db/models/Post";
import { type HydratedDocument } from "mongoose";
import { ErrorContext, type ErrorContextType } from "~/contexts/errorContext";

const PostPage: FC = () => {
  const router = useRouter();
  let { postId } = router.query;
  const [post, setPost] = useState<HydratedDocument<IPost>| IinvPost>();

  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [reload, setReload] = useState({ reolad: 1 });

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;
  
  if (Array.isArray(postId)) {
    setErrorDisplay(true);
    setErrorMessage('INVALID URL');
    setErrorType('redirect');

    postId = undefined;
  }
  const getPostQuery = api.posts.getOnePost.useQuery({postId: `${postId || ''}`})


  interface IinvPost {
    uname: undefined,
    message: undefined,
    privacy: undefined,
    imageId: undefined,
    shareId: undefined,
    time: undefined,
    likes: undefined,
    comments: undefined,
    _id: undefined,
  }

  useEffect(() => {
    if(postId) {
      (async () => {
        const x = await getPostQuery.refetch();

        if (x.status === 'success') {
          setPost(x.data);
        }
      })()
      .then(()=>{}).catch(()=>{});
    }
  }, [postId]);


  console.log(postId);
  

  return (
    <PostFeedContextProvider additionVals={{ showExpanded, setShowExpanded }}>
      <PostEditContextProvider additionVals={{ setReload }}>
    <div className="
    w-screen
    flex flex-col justify-center items-center
    ">
      {
        post&&
    <div className="
    /border-2 /border-solid /border-red-500
    w-full sm:w-100
    
    ">
    
      <div>
        <Post
        expanded={true}
        uname={post?.uname}
        message={post?.message}
        privacy={post?.privacy}
        imageId={post?.imageId}
        shareId={post?.shareId}
        time={post?.time}
        likes={post?.likes}
        comments={post?.comments}
        _id={post?._id?.toString() || undefined}
        />

      </div>
      <div>

        
      </div>
     
      <CommentScreen postId={post?._id?.toString() || undefined} />
    </div>
  }
    </div>
  </PostEditContextProvider>
  </PostFeedContextProvider>
  
  );
}

export default PostPage;
