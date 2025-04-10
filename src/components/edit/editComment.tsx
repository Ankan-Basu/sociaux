import { TRPCClientError } from "@trpc/client";
import { useSession } from "next-auth/react";
import { type FC, useContext, useEffect, useState } from "react";
import {
  FiCornerUpRight,
  FiTrash,
  FiX,
} from "react-icons/fi";
import { EditCommentContext, type EditCommentContextType } from "~/contexts/editCommentContext";
import { ErrorContext, type ErrorContextType } from "~/contexts/errorContext";
import { api } from "~/utils/api";
import { Button } from "../modal/Modal";

const EditComment: FC = () => {
  const mode = ""; //change later

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
  } = useContext(EditCommentContext) as EditCommentContextType;

  const [commentMessage, setCommentMessage] = useState(
    currEditComment?.message
  );

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;
  const session = useSession();
  
  useEffect(() => {
    setCommentMessage(currEditComment?.message);

    // return () => {
    //     setPostMessage('');
    //     setCurrEditPost(null);
    // }
  }, [currEditComment]);

  const handleClose = () => {
    // setPostMessage("");
    // setCurrEditPost(null);
    setShowCommentEditModal(false);
    setCurrEditComment(null);
    setCommentMessage("");
  };

  const handlePost = async () => {
    if (session.status === 'unauthenticated') {
      setErrorDisplay(true);
      setErrorMessage('You need to login to edit');
      setErrorType('simple');
    }

    if (!currEditComment) {
      setErrorDisplay(true);
      setErrorMessage('An unexpected error occured');
      setErrorType('redirect');
      setShowCommentEditModal(false);
      return;
    }

    if (!currEditComment._id) {
      setErrorDisplay(true);
      setErrorMessage('BAD_REQUEST');
      setErrorType('simple');
      return;
    }


    const uname = session.data?.user.uname;

        if (!uname) {
          setErrorDisplay(true);
          setErrorMessage('You need to login to edit');
          setErrorType('simple');
          return;
        }



    try {
      if (isReplyComment) {
        const x = await editReplyCommentMutation.mutateAsync({
          message: commentMessage || '',
          uname: uname,
          replyCommId: currEditComment._id,
        });
        
        if (!setRefreshReplies) {
          setErrorDisplay(true);
           setErrorMessage('An unexpected error occured');
          setErrorType('simple');
            return;
        }
        setRefreshReplies({val: 1});
      } else {
        const x = await editCommentMutation.mutateAsync({
          commentId: currEditComment._id,
          uname: uname,
          message: commentMessage || '',
        });

        if (!setRefreshComments) {
          setErrorDisplay(true);
           setErrorMessage('An unexpected error occured');
          setErrorType('simple');
            return;
        }

        setRefreshComments({ val: 1 });
      }

      handleClose();
    } catch (err) {
      setErrorDisplay(true);
      let msg = 'An unknown error occured';
      if (err instanceof TRPCClientError) {
        msg = err.data.code;
      }
      setErrorMessage(msg);
      setErrorType('simple');
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
        //lg:w-100 /z-60 rounded-lg border-2 bg-white p-2 pt-1
    `}
      >
        <div
          className={`
            flex justify-end 
            `}
            // ${mode === "mobile" ? "mt-4" : "mt-1"} 
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
            className="w-full resize-none rounded-lg bg-secondary2 p-1 outline-primary2 lg:w-99"
          ></textarea>
        </div>
        <div className="flex flex-col justify-center gap-1 pt-1">
          <span onClick={handleClose} className="flex-1">
            <Button>
              <FiTrash />
              Discard
            </Button>
          </span>
          <span onClick={() => {
            handlePost()
            .then(()=>{}).catch(()=>{});
          }
          } className="flex-1">
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
