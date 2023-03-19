import { FC, useState } from "react";
import CommentContextProvider from "~/contexts/commentContext";
import EditCommentContextProvider from "~/contexts/editCommentContext";
import ReplyingContextProvider from "~/contexts/replyingContext";
import EditComment from "../edit/editComment";
import CommentInput from "./commentInput";
import CommentList from "./commentList";

interface ICommentScreenProps {
  postId: string;
}

const CommentScreen: FC<ICommentScreenProps> = ({ postId }) => {
  const [refreshReplies, setRefreshReplies] = useState<Object>({ val: 1 });
  const [refreshComments, setRefreshComments] = useState({ val: 1 });

  // console.log('comment screen here', postId);

  return (
    <div className="">
      <div className="p-2 pt-0">
        <h3 className="text-lg font-medium">Comments:</h3>
      </div>

      <CommentContextProvider>
        <ReplyingContextProvider
          additionVals={{
            refreshReplies,
            setRefreshComments,
            setRefreshReplies,
          }}
        >
          <EditCommentContextProvider
            additionVals={{
              refreshReplies,
              setRefreshReplies,
              setRefreshComments,
            }}
          >
            <CommentList
              postId={postId}
              refresh={refreshComments}
              customCssClass="pb-14"
            />
            <CommentInput
              postId={postId}
              customCssClass="
        fixed bottom-0
        // /border-2 /border-solid /border-black
        "
            />
            <EditComment />
          </EditCommentContextProvider>
        </ReplyingContextProvider>
      </CommentContextProvider>
    </div>
  );
};

export default CommentScreen;
