import { type FC, useState } from "react";
import CommentContextProvider from "~/contexts/commentContext";
import EditCommentContextProvider from "~/contexts/editCommentContext";
import ReplyingContextProvider from "~/contexts/replyingContext";
import EditComment from "../edit/editComment";
import CommentInput from "./commentInput";
import CommentList from "./commentList";

interface ICommentScreenProps {
  postId: string | undefined;
}

const CommentScreen: FC<ICommentScreenProps> = ({ postId }) => {
  const [refreshReplies, setRefreshReplies] = useState<{val: number}>({ val: 1 });
  const [refreshComments, setRefreshComments] = useState<{val: number}>({ val: 1 });

  // console.log('comment screen here', postId);

  if (!postId) {
    return (
      <>
      Error
      </>
    )
  }

  return (
    <div className="//overflow-x-hidden">
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
              refreshComments,
              setRefreshComments,
            }}
          >
      <div className="sticky top-0
      bg-white/40 backdrop-blur-md
      rounded-lg pb-2
      ">
      <div className="p-2 pt-0">
        <h3 className="text-lg font-medium
        //sticky //top-0
        pb-2 pt-2
        ">Comments:</h3>
        </div>
        <CommentInput
              postId={postId}
              customCssClass="
        //sticky //absolute //top-0 //left-0
        "
        />
        </div>

            <CommentList
              postId={postId}
              refresh={refreshComments}
              customCssClass="pb-14"
            />
            {/* <CommentInput
              postId={postId}
              customCssClass="
        //fixed //absolute bottom-0
        // /border-2 /border-solid /border-black
        "
            /> */}
            <EditComment />
          </EditCommentContextProvider>
        </ReplyingContextProvider>
      </CommentContextProvider>
    </div>
  );
};

export default CommentScreen;
