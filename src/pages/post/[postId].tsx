import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from "~/components/posts/Post";
import CommentScreen from "~/components/comment/commentScreen";

const PostPage: FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<any>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [serverErr, setServerErr] = useState<boolean>(false);

  useEffect(() => {
    if(postId) {
      getIndividualPost();
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
  
  );
}

export default PostPage;
