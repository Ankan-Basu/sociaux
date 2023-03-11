import { FC, FormEvent, useContext, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { CommentContext, ReplyingContext } from "./commentScreen";


interface ICommentInputProps {
  postId: string;
  customCssClass?: string;
  replyingTo?: string;
}


const CommentInput: FC<ICommentInputProps> = ({ postId, customCssClass }) => {
  const [inp, setInp] = useState<string>("");

  const { commentList, setCommentList } = useContext(CommentContext);

  const { setIsReplying, isReplying, replyingTo, setReplyingTo, replyList, setReplyList } = useContext(ReplyingContext);

  console.log("Comment Input postId", postId);



  // post comment
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!postId) {
      return;
    }

    const uname = "hu_tao"; //change later
    const message = inp;

    const obj = { uname, postId, message };

    const url = `/api/comments/${postId}`;

    setInp("");

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(obj),
    });

    const data = await resp.json();

    console.log(data);

    setInp("");

    //Again GET request
    const urlGet = `/api/comments/${postId}`;

    const resp2 = await fetch(urlGet);

    const data2 = await resp2.json();

    // console.log(data);

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
    
    const uname = "paimon"; //change later
    const message = inp;

    const obj: IReplyBody = { uname, parenCommId: replyingTo._id, message };

    const url = `/api/comments/reply/`;

    setInp("");

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(obj),
    });

    const data = await resp.json();

    console.log(data);

    setInp("");
    // setReplyingTo(null);
    setReplyList({...replyList});
  }


  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    if(isReplying) {
        handleReply(e);
    } else {
        handleSubmit(e);
    }
  }


  return (
    <div
      className={`
        ${customCssClass + " "}
        bg-white pb-1
        w-full sm:w-100 pt-2 p-2
        flex flex-col m-auto
        -left-1 -right-1
        //border-2 //border-solid //border-black
        `}
    >
      <div
        className={`
            ${isReplying ? "block" : "hidden"}
            
            flex justify-between items-center
            px-2`}
      >
        <span>
        Replying to
        {" " + replyingTo?.uname}
        ...
        </span>
        <span 
        onClick={()=>{
          setReplyingTo(null);
          setIsReplying(false);
        }}
        
        className="
        active:text-primary
        lg:hover:text-primary lg:active:text-primary2
        ">
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
        bg-secondary2
        p-2 rounded-lg
        flex-1
        "
        ></input>
        <button
          type="submit"
          className={`
        bg-primary 
        active:bg-primary2 active:text-white
        lg:hover:bg-primary2 lg:active:bg-primary
        lg:hover:text-white lg:active:text-black
        p-3
        rounded-lg
        `}
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
