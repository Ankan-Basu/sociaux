import { TRPCClientError } from "@trpc/client";
import { useSession } from "next-auth/react";
import { type FC, type FormEvent, useContext, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { CommentContext, type CommentContextType } from "~/contexts/commentContext";
import { ErrorContext, type ErrorContextType } from "~/contexts/errorContext";
import { ReplyingContext, type ReplyingContextType } from "~/contexts/replyingContext";
import { api } from "~/utils/api";

interface ICommentInputProps {
  postId: string;
  customCssClass?: string;
  replyingTo?: string;
}

const CommentInput: FC<ICommentInputProps> = ({ postId, customCssClass }) => {
  const [inp, setInp] = useState<string>("");

  const { setCommentList } = useContext(CommentContext) as CommentContextType;

  const {
    setIsReplying,
    isReplying,
    replyingTo,
    setReplyingTo,
   setRefreshReplies
  } = useContext(ReplyingContext) as ReplyingContextType;


  const commentMutation = api.comments.postComment.useMutation();
  const replyCommentMutation = api.replyComments.postReplyComment.useMutation();

  const {refetch} = api.comments.getComments.useQuery({postId: postId});

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

  const session = useSession();

  // post comment
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session.status !== 'authenticated') {
      // console.log('UNAUTHORISED');
      setErrorDisplay(true);
      setErrorMessage('You need to Login to comment');
      setErrorType('simple');
      setInp('');

      return;
    }

    if (!postId) {
      setErrorDisplay(true);
      setErrorMessage('BAD_REQUEST\nNo post found');
      setErrorType('simple');
      return;
    }

    if (!inp) {
      return;
    }

    const uname = session.data.user.uname;
    const message = inp;

    if (!uname) {
      // console.log('UNauthorised');
      setErrorDisplay(true);
      setErrorMessage('UNAUTHORISED');
      setErrorType('logout');
      return;
    }
    
    setInp('');

    const data = await commentMutation.mutateAsync({message,postId,uname});
    console.log(data);

    const {data: data2} = await refetch();
    setCommentList(data2);
    
  };

  // interface IReplyBody {
  //   uname: string;
  //   parenCommId: string;
  //   message: string;
  // }

  // reply to comment
  const handleReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session.status !== 'authenticated') {
      // console.log('UNAUThorised');
      setErrorDisplay(true);
      setErrorMessage('You need to Login to comment');
      setErrorType('simple');
      setInp('');
      return;
    }
    if (!inp) {
      return;
    }

    const uname = session.data.user.uname;
    const message = inp;

    if (!uname) {
      // console.log('Unauthorised');
      setErrorDisplay(true);
      setErrorMessage('UNAUTHORISED');
      setErrorType('logout');
      return;
    }

    setInp('');

    try {

      if (!replyingTo) {
        setErrorDisplay(true);
        setErrorMessage('BAD_REQUEST. No comment selected to reply');
        setErrorType('simple');
        return;
      }
      
      await replyCommentMutation.mutateAsync({message, parenCommId: replyingTo._id, uname});
    } catch(err) {
      setErrorDisplay(true);
      let msg = 'An unknown error occured'
      if (err instanceof TRPCClientError) {
        msg = err.data.code;
      }
      setErrorMessage(msg);
      setErrorType('simple');
    }
    
    // setReplyingTo(null);
    if (!setRefreshReplies) {
      setErrorDisplay(true);
      setErrorMessage('An unexpected error occured');
      setErrorType('simple');
      return;
    }
    setRefreshReplies({ val: 1 });
  };

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    if (isReplying) {
      handleReply(e)
      .then(()=>{}).catch(()=>{});
    } else {
      handleSubmit(e)
      .then(()=>{}).catch(()=>{});
    }
  };

  return (
    <div
      className={`
        ${customCssClass || '' + " "}
        //sticky //top-0
        -left-1 -right-1 m-auto
        flex w-full flex-col
        //bg-white p-2
        pb-1 pt-1 sm:w-100
        `}
    >
      <div
        className={`
            ${isReplying ? "block" : "hidden"}
            
            flex items-center justify-between
            px-2`}
      >
        <span>
          Replying to
          {" " + (replyingTo?.uname || 'undefined')}
          ...
        </span>
        <span
          onClick={() => {
            setReplyingTo(null);
            setIsReplying(false);
          }}
          className="
        active:text-primary
        lg:hover:text-primary lg:active:text-primary2
        "
        >
          <FiX />
        </span>
      </div>
      <form onSubmit={handleClick} className={`flex`}>
        <input
          type="text"
          placeholder="Write your comment here"
          value={inp}
          onChange={(e) => {
            setInp(e.target.value);
          }}
          className="
        flex-1
        rounded-lg bg-secondary2
        p-2 outline-primary2
        "
        ></input>
        <button
          type="submit"
          className={`
        rounded-lg 
        bg-primary p-3
        active:bg-primary2 active:text-white
        lg:hover:bg-primary2 lg:hover:text-white
        lg:active:bg-primary
        lg:active:text-black
        `}
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
