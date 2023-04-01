import { useSession } from "next-auth/react";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import React, { FC, useEffect, useState } from "react";
// import { FaShare, FaLock, FaGlobe, FaEllipsisV, FaEllipsisH, FaTrash, FaRegTimesCircle, FaImage, FaVideo } from 'react-icons/fa';
import {
  FiTrash,
  FiArrowRight,
  FiCornerUpRight,
  FiX,
  FiImage,
  FiVideo,
} from "react-icons/fi";
import { api } from "~/utils/api";
import Dropdown from "../dropdown/dropdown";

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

const Modal: FC<IModalProps> = ({
  display,
  customCss,
  setShowModal,
  mode = "mobile",
}) => {
  const [postMessage, setPostMessage] = useState<string>("");
  const [privacy, setPrivacy] = useState<number>(0);

  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

  // console.log(mode);

  const session = useSession();

  const postMutation = api.posts.createPost.useMutation();
  const [img, setImg] = useState<string>();

  const handleClose = () => {
    console.log("Close");

    setShowModal(false);
  };



  const uname = session.data?.user?.uname;
  // const privacy = 0;


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
        fixed z-40 h-screen
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
            ${mode === "mobile" ? "mt-16" : "mt-1"} 
            `}
        >
          <span onClick={handleClose} className="cursor-pointer text-primary">
            <FiX />
          </span>
        </div>
        <div className="flex py-1 pt-0 relative gap-1"
        >
          <span className="font-medium">Privacy: </span>
          <span
          className="border-2 border-solid border-black cursor-pointer"
          onClick={() => {setDisplayDropdown(currState => !currState)}}
          >
            {privacy?'Friends':'Public'}
          </span>
          <Dropdown display={displayDropdown} 
          options={
            [
              {optionName: 'Public', callback: () => {setPrivacy(0)}},
              {optionName: 'Friends', callback: () => {setPrivacy(1)}}
            ]
          }
          additionCSS='top-6 left-14'
          setDisplay={setDisplayDropdown}
          />
        </div>
        <div className="">
          <label htmlFor="textarea" className="py-1 font-medium">
            Write post here:
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
        <input type={'file'} accept='image/*' onChange={handleImg} />
        {img?
        <img src={img} height={100} width={100} alt='img' />
        :<></>}
        <div className="flex justify-center gap-2 py-1">
          <button
          type='button' 
          className="flex flex-1 justify-center items-center gap-2 rounded-md bg-deactiv p-2">
            <FiImage /> Image
          </button>
          
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
              Post
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};



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

export default Modal;
