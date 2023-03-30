import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

import {
  FiTrash,
  FiArrowRight,
  FiCornerUpRight,
  FiX,
  FiImage,
  FiVideo,
} from "react-icons/fi";
import { api } from "~/utils/api";

interface PostBody {
  uname: string;
  privacy: number;
  message: string;
  shares?: number;
}

interface IModalProps {
  display: boolean;
  customCss?: string;
  setShowModal: Function;
  mode?: string;
}

const SharePostModal: FC<IModalProps> = ({
  display,
  customCss,
  setShowModal,
  mode = "mobile",
}) => {
  const [postMessage, setPostMessage] = useState<string>("");

  // console.log(mode);

  const session = useSession();

  const postMutation = api.posts.createPost.useMutation();
  const [img, setImg] = useState<string>();

  const handleClose = () => {
    console.log("Close");

    setShowModal(false);
  };



  const uname = session.data?.user?.uname;
  const privacy = 0;


  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.files);
    const file = e.target.files?e.target.files[0]:null;

    const reader = new FileReader();

    if (!file) {
      return;
    }
    reader.readAsDataURL(file);

    reader.onload = () => {
      // console.log(reader.result);
      if (!reader.result) {
        return;
      }
      const imgStr = reader.result as string
      setImg(imgStr)
  
    }
    reader.onerror = (err) => {
      console.log(err);
    }
}


  const handlePost = async () => {
    console.log(postMessage);

    if (!uname) {
      console.log("error");
      return;
    }

    try {
      const x = await postMutation.mutateAsync({
        uname,
        message: postMessage,
        privacy,
        img: img || ''
      });
      console.log(x);
      setPostMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
    className={`
        ${!display ? "hidden" : ""}
        ${customCss + " "}
        fixed bg-gray-500/50 backdrop-blur-lg
        top-0 left-0 h-screen w-screen z-40
        flex items-center justify-center
        `}
    >
    <div
      className={`
        //fixed z-40 //h-screen
        m-auto
        w-screen rounded-lg bg-white p-2 pt-1 lg:h-auto lg:w-100`}
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
        className={`${session.status === "authenticated" ? "block" : "hidden"}`}
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
          <span className="flex-1">
            <Button>
              <FiTrash />
              Discard
            </Button>
          </span>
          <span onClick={handlePost} className="flex-1">
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
