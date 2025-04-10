import { TRPCClientError } from "@trpc/client";
import { useSession } from "next-auth/react";
import{ useContext, useEffect, useState } from "react";
import type {FC} from 'react';
import {
  FiCornerUpRight,
  FiImage,
  FiTrash,
  FiX,
} from "react-icons/fi";
import { ErrorContext, type ErrorContextType } from "~/contexts/errorContext";
import { PostEditContext, type PostEditContextType } from "~/contexts/postEditContext";
import { api } from "~/utils/api";
import Dropdown from "../dropdown/dropdown";
import { Button } from "../modal/Modal";


const EditPost: FC = ({}) => {
  const mode = ""; //change later

  const editPostMutation = api.posts.modifyPost.useMutation();

  const { showEditModal, setShowEditModal, currEditPost, setCurrEditPost, reload, setReload } =
    useContext(PostEditContext) as PostEditContextType;

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

  const [postMessage, setPostMessage] = useState(currEditPost?.message);

  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

  const [privacy, setPrivacy] = useState<number>(currEditPost?.privacy || 0)

  const session = useSession();


  useEffect(() => {
    if (!currEditPost) {
      //err
      return;
    }

    setPostMessage(currEditPost?.message);

    setPrivacy(currEditPost?.privacy)

    // return () => {
    //     setPostMessage('');
    //     setCurrEditPost(null);
    // }
  }, [currEditPost]);

  const handleClose = () => {
    setPostMessage("");
    setCurrEditPost(null);
    setShowEditModal(false);
  };

  const handlePost = async () => {
    if (session.status === 'unauthenticated') {
      setErrorDisplay(true);
      setErrorMessage('You need to login to edit');
      setErrorType('simple');
    }

    if (!currEditPost) {
      //unkn
      setErrorDisplay(true);
      setErrorMessage('An unexpected error occured');
      setErrorType('redirect');
      setShowEditModal(false);
      return;
    }

    if (!(currEditPost._id)) {
      setErrorDisplay(true);
      setErrorMessage('BAD_REQUEST');
      setErrorType('simple');
      setShowEditModal(false);
      return;
    }

    try {

        const uname = session.data?.user.uname;

        if (!uname) {
          setErrorDisplay(true);
          setErrorMessage('You need to login to edit');
          setErrorType('simple');
          return;
        }

        const x = await editPostMutation.mutateAsync({
            message: postMessage || '',
            postId: currEditPost._id,
            uname: uname,
            privacy: privacy,
        });

        if (!setReload) {
          return;
        }
        setReload({reload: 1});
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
    ${!showEditModal ? "hidden" : "flex"}
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
          <span onClick={handleClose} className="cursor-pointer text-primary">
            <FiX />
          </span>
        </div>
        {/* <FiPenTool /> Edit Post: */}
        <div className="flex py-1 pt-0 relative gap-1"
        >
          <span className="font-medium">Privacy: </span>
          <span
          className="cursor-pointer"
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
          {/* <label htmlFor="textarea" className='py-1'>Edit post:</label> */}

          <textarea
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
            id="textarea"
            name="textarea"
            rows={4}
            cols={50}
            className="w-full resize-none rounded-lg bg-secondary2 p-1 outline-primary2 lg:w-99"
          ></textarea>
        </div>
        <div className="flex justify-center gap-2 py-1">
          <button className="flex flex-1 justify-center rounded-md bg-deactiv p-2">
            <FiImage />
          </button>
          {/* <button className='bg-deactiv p-2 flex-1 flex justify-center rounded-md'>
                    <FiVideo /></button> */}
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
            .then(()=>{}).catch(()=>{})
            }} 
            className="flex-1"
            >
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

export default EditPost;
