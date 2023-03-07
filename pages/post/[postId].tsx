import React from "react";
import { useRouter } from "next/router";
import Post from "@/components/posts/Post";
import Comment from '@/components/comment/comment';
import CommentInput from "@/components/comment/commentInput";
import CommentList from "@/components/comment/commentList";
import CommentScreen from "@/components/comment/commentScreen";

function PostPage() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div className="
    w-screen
    flex flex-col justify-center items-center
    ">
    <div className="
    border-2 border-solid border-red-500
    w-full sm:w-100
    
    ">
      <div>
        <Post />
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
