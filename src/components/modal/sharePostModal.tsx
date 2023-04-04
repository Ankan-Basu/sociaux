import { TRPCClientError } from "@trpc/client";
import { useSession } from "next-auth/react";
import { FC, useContext, useEffect, useState } from "react";

import { FiTrash, FiCornerUpRight, FiX } from "react-icons/fi";
import { ErrorContext } from "~/contexts/errorContext";
import { api } from "~/utils/api";

interface PostBody {
  uname: string;
  privacy: number;
  message: string;
  shares?: number;
}

interface IShareModalProps {
  display: boolean;
  customCss?: string;
  setShowModal: Function;
  postId: string;
  mode?: string;
}

const SharePostModal: FC<IShareModalProps> = ({
  display,
  customCss,
  setShowModal,
  postId,
  mode = "mobile",
}) => {
  const [postMessage, setPostMessage] = useState<string>("");

  const session = useSession();

  const sharePostMutation = api.posts.sharePost.useMutation();

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext);

  const handleClose = () => {
    setPostMessage('')
    setShowModal(false);
  };

  const uname = session.data?.user?.uname;
  const privacy = 0;

  const handleShare = async () => {
    console.log(postMessage);

    if (!postId) {
      // console.log("BAD REQUEST");
      setErrorDisplay(true);
      setErrorMessage('BAD_REQUEST');
      setErrorType('simple');
      return;
    }

    if (!uname) {
      // console.log("error");
      setErrorDisplay(true);
      setErrorMessage('You need to login to perform this action');
      setErrorType('simple');
      return;
    }

    try {
      // const x = await postMutation.mutateAsync({
      //   uname,
      //   message: postMessage,
      //   privacy,
      //   img: img || ''
      // });
      // console.log(x);
      // setPostMessage("");
      const x = await sharePostMutation.mutateAsync({
        uname,
        message: postMessage,
        privacy,
        shareId: postId,
      });
      handleClose();
    } catch (err) {
      // console.log(err);
      setErrorDisplay(true);
      let msg = 'An unknown error occured'
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
        ${!display ? "hidden" : ""}
        ${customCss + " "}
        fixed top-0 left-0
        z-40 flex h-screen w-screen items-center
        justify-center bg-gray-500/50 backdrop-blur-lg
        `}
    >
      <div
        className={`
        //fixed //h-screen z-40
        m-auto
        w-screen rounded-lg bg-white p-2 pt-1 md:w-100 lg:h-auto lg:w-100`}
      >
        <div
          className={`
            ${session.status === "unauthenticated" ? "block" : "hidden"}
            `}
        >
          UNAUTHORISED
        </div>

        <div
          className={`
            ${session.status === "loading" ? "block" : "hidden"}
            `}
        >
          LOADING
        </div>

        <div
          className={`${
            session.status === "authenticated" ? "block" : "hidden"
          }`}
        >
          <div
            className={`
            flex justify-end 
            ${mode === "mobile" ? "mt-4" : "mt-1"} 
            `}
          >
            <span onClick={handleClose} className="cursor-pointer text-primary">
              <FiX />
            </span>
          </div>
          <div className="flex py-1 pt-0">
            Privacy:
            <DropDown />
          </div>
          <div className="">
            <label htmlFor="textarea" className="py-1">
              Share post:
            </label>

            <textarea
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
              id="textarea"
              name="textarea"
              rows={4}
              cols={50}
              className="w-full resize-none rounded-lg bg-secondary2 p-1 outline-none lg:w-99"
            ></textarea>
          </div>

          <div className="flex flex-col justify-center gap-1 pt-1">
            <span
              onClick={() => {
                setPostMessage("");
                setShowModal(false);
              }}
              className="flex-1"
            >
              <Button>
                <FiTrash />
                Discard
              </Button>
            </span>
            <span onClick={handleShare} className="flex-1">
              <Button type="normal">
                <FiCornerUpRight />
                Share
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function DropDown() {
  const choiceArr = {};
  return (
    <div>
      <select>
        <option value="public"> Public</option>
        <option value="friends">Friends</option>
        <option value="onlyMe"> Only Me</option>
      </select>
    </div>
  );
}

export interface IButtonProps {
  children: React.ReactNode;
  type?: string;
}

export const Button: FC<IButtonProps> = ({ children, type }) => {
  return (
    <button
      className={`rounded-md p-1 ${
        type === "normal" ? "bg-primary" : "bg-deactiv"
      } flex w-full items-center justify-center gap-2`}
    >
      {children}
    </button>
  );
};

export default SharePostModal;
