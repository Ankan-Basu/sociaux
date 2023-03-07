import React from "react";
import { useRouter } from "next/router";
import Post from "@/components/posts/Post";
import Comment from '@/components/comment/Comment';
import CommentInput from "@/components/comment/commentInput";
import CommentList from "@/components/comment/commentList";

function PostPage() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div className="border-2 border-solid">
      <div>
        <Post />
      </div>
      <div>Comments

        {/* <Comment /> */}
      </div>
      postId {postId}
      <CommentList />
      <CommentInput />
    </div>
  );
}

export default PostPage;
