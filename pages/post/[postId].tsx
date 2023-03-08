import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from "@/components/posts/Post";
import Comment from '@/components/comment/comment';
import CommentInput from "@/components/comment/commentInput";
import CommentList from "@/components/comment/commentList";
import CommentScreen from "@/components/comment/commentScreen";

function PostPage() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<any>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [serverErr, setServerErr] = useState<boolean>(false);

  useEffect(() => {
    getIndividualPost();
  }, []);

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
      {/* postId {postId}
      <CommentList />
      <CommentInput /> */}
      <CommentScreen />
    </div>
    </div>
  );
}

export default PostPage;
