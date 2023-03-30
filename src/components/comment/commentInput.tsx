import { useSession } from "next-auth/react";
import { FC, FormEvent, useContext, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { CommentContext } from "~/contexts/commentContext";
import { ReplyingContext } from "~/contexts/replyingContext";
import { api } from "~/utils/api";

interface ICommentInputProps {
  postId: string;
  customCssClass?: string;
  replyingTo?: string;
}

const CommentInput: FC<ICommentInputProps> = ({ postId, customCssClass }) => {
  const [inp, setInp] = useState<string>("");

  const { commentList, setCommentList } = useContext(CommentContext);

  const {
    setIsReplying,
    isReplying,
    replyingTo,
    setReplyingTo,
    refreshReplies, setRefreshReplies
  } = useContext(ReplyingContext);

  console.log("Comment Input postId", postId);

  let commentMutation = api.comments.postComment.useMutation();
  let replyCommentMutation = api.replyComments.postReplyComment.useMutation();

  const {data, isLoading, isError, refetch} = api.comments.getComments.useQuery({postId: postId});

  const session = useSession();

  // post comment
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session.status !== 'authenticated') {
      console.log('UNAUTHORISED');
      return;
    }

    if (!postId) {
      return;
    }

    if (!inp) {
      return;
    }

    const uname = session.data.user.uname;
    const message = inp;

    if (!uname) {
      console.log('UNauthorised');
      return;
    }
    
    setInp('');

    let data = await commentMutation.mutateAsync({message,postId,uname});
    console.log(data);

    let {data: data2} = await refetch();
    setCommentList(data2);
    
  };

  interface IReplyBody {
    uname: string;
    parenCommId: string;
    message: string;
  }

  // reply to comment
  const handleReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session.status !== 'authenticated') {
      console.log('UNAUThorised');
      return;
    }
    if (!inp) {
      return;
    }

    const uname = session.data.user.uname;
    const message = inp;

    if (!uname) {
      console.log('Unauthorised');
      return;
    }

    setInp('');
    
    let x = await replyCommentMutation.mutateAsync({message, parenCommId: replyingTo._id, uname});
    
    // setReplyingTo(null);
    setRefreshReplies({ ...refreshReplies });


  };

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    if (isReplying) {
      handleReply(e);
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div
      className={`
        ${customCssClass + " "}
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
          {" " + replyingTo?.uname}
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
        p-2
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
