import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from "~/components/posts/Post";
import CommentScreen from "~/components/comment/commentScreen";
import { api } from "~/utils/api";
import PostFeedContextProvider from "~/contexts/postFeedContext";
import PostEditContextProvider from "~/contexts/postEditContext";

const PostPage: FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<any>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [serverErr, setServerErr] = useState<boolean>(false);

  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [reload, setReload] = useState({ reolad: 1 });

  const getPostQuery = api.posts.getOnePost.useQuery({postId: `${postId || ''}`})

  useEffect(() => {
    if(postId) {
      (async () => {
        const x = await getPostQuery.refetch();

        if (x.status === 'success') {
          setPost(x.data);
        }
      })();
    }
  }, [postId]);


  console.log(postId);
  

  const getIndividualPost = async () => {
    const url = `/api/posts/post/${postId}`;

    const resp = await fetch(url);

    if (resp.status === 200) {
      const data = await resp.json();
      console.log(data);
      setPost(data);
    } else if (resp.status === 404) {
      console.log('Not found');
      setNotFound(true);
      // TODO
    } else {
      console.log('Internal server error');
      setServerErr(true);
      // todo
    }
  }

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
        key={post?._id}
        expanded={true}
        uname={post?.uname}
        message={post?.message}
        privacy={post?.privacy}
        imageId={post?.imageId}
        shareId={post?.shareId}
        time={post?.time}
        likes={post?.likes}
        comments={post?.comments}
        _id={post?._id}
        
        />

      </div>
      <div>

        
      </div>
     
      <CommentScreen postId={post?._id} />
    </div>
  }
    </div>
  </PostEditContextProvider>
  </PostFeedContextProvider>
  
  );
}

export default PostPage;
