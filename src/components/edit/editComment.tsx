import React, { FC, useContext, useEffect, useState } from "react";
import {
  FiCornerUpRight,
  FiImage,
  FiPenTool,
  FiTrash,
  FiVideo,
  FiX,
} from "react-icons/fi";
import { api } from "~/utils/api";
import { EditCommentContext } from "../comment/commentScreen";
import { Button } from "../modal/Modal";

const EditComment: FC = () => {
  let mode = ""; //change later

  const editCommentMutation = api.comments.editComment.useMutation();

  const editReplyCommentMutation =
    api.replyComments.editReplyComment.useMutation();

  const {
    showCommentEditModal,
    setShowCommentEditModal,
    currEditComment,
    setCurrEditComment,
    setRefreshComments,
    refreshComments,
    isReplyComment,
    setIsReplyComment,
    refreshReplies,
    setRefreshReplies,
  } = useContext(EditCommentContext);

  const [commentMessage, setCommentMessage] = useState(
    currEditComment?.message
  );

  
  useEffect(() => {
    // console.log("use Effect", currEditPost);

    setCommentMessage(currEditComment?.message);

    // return () => {
    //     setPostMessage('');
    //     setCurrEditPost(null);
    // }
  }, [currEditComment]);

  const handleClose = () => {
    console.log("Close");
    // setPostMessage("");
    // setCurrEditPost(null);
    setShowCommentEditModal(false);
    setCurrEditComment(null);
    setCommentMessage("");
  };

  const handlePost = async () => {
    if (!currEditComment && !currEditComment._id) {
      console.log("error");
      return;
    }

    try {
      if (isReplyComment) {
        const x = await editReplyCommentMutation.mutateAsync({
          message: commentMessage,
          uname: currEditComment.uname,
          replyCommId: currEditComment._id,
        });
        console.log(x);
        setRefreshReplies((currState: Object) => {
          return { ...currState };
        });
      } else {
        console.log(currEditComment.uname);

        const x = await editCommentMutation.mutateAsync({
          commentId: currEditComment._id,
          uname: currEditComment.uname,
          message: commentMessage,
        });
        // console.log(x);

        setRefreshComments({ ...refreshComments });
      }

      // or better get uname from useSession
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`
      ${showCommentEditModal ? "flex" : "hidden"}
      fixed top-0 left-0
    z-60
    h-screen w-screen items-center justify-center
    bg-slate-500/50 backdrop-blur-md
    `}
    >
      <div
        className={`
    //h-screen
     //w-screen //lg:h-auto
        //lg:w-100 z-60 rounded-lg border-2 bg-white p-2 pt-1
    `}
      >
        <div
          className={`
            flex justify-end 
            ${mode === "mobile" ? "mt-4" : "mt-1"} 
            `}
        >
          <span
            onClick={handleClose}
            className="mb-2 cursor-pointer text-primary"
          >
            <FiX />
          </span>
        </div>
        Edit Comment
        {/* <FiPenTool /> Edit Post: */}
        <div className="">
          {/* <label htmlFor="textarea" className='py-1'>Edit post:</label> */}

          <textarea
            value={commentMessage}
            onChange={(e) => setCommentMessage(e.target.value)}
            id="textarea"
            name="textarea"
            rows={4}
            cols={50}
            className="w-full resize-none rounded-lg bg-secondary2 p-1 outline-none lg:w-99"
          ></textarea>
        </div>
        <div className="flex flex-col justify-center gap-1 pt-1">
          <span onClick={handleClose} className="flex-1">
            <Button>
              <FiTrash />
              Discard
            </Button>
          </span>
          <span onClick={handlePost} className="flex-1">
            <Button type="normal">
              <FiCornerUpRight />
              Submit
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
