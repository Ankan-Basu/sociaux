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
import { Button } from "../modal/Modal";
import { PostEditContext } from "../postFeed/postFeed";


const EditPost: FC = ({}) => {
  let mode = ""; //change later

  const editPostMutation = api.posts.modifyPost.useMutation();

  const { showEditModal, setShowEditModal, currEditPost, setCurrEditPost, reload, setReload } =
    useContext(PostEditContext);

  const [postMessage, setPostMessage] = useState(currEditPost?.message);

  useEffect(() => {
    console.log("Edit post mounts");
  }, []);
  useEffect(() => {
    console.log("use Effect", currEditPost);

    setPostMessage(currEditPost?.message);

    // return () => {
    //     setPostMessage('');
    //     setCurrEditPost(null);
    // }
  }, [currEditPost]);

  const handleClose = () => {
    console.log("Close");
    setPostMessage("");
    setCurrEditPost(null);
    setShowEditModal(false);
  };

  const handlePost = async () => {
    if (!currEditPost && !currEditPost._id) {
      console.log("error");
      return;
    }

    try {

        // or better get uname from useSession
        const x = await editPostMutation.mutateAsync({
            message: postMessage,
            postId: currEditPost._id,
            uname: currEditPost.uname,
            privacy: currEditPost.privacy,
        });

        setReload({ ...reload});
        handleClose();
    } catch (err) {
        console.log(err);
        
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
        //lg:w-100 z-60 rounded-lg border-2 bg-white p-2 pt-1
    `}
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
        {/* <FiPenTool /> Edit Post: */}
        <div className="flex py-1 pt-0">
          Privacy:
          {/* <DropDown /> */}
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
            className="w-full resize-none rounded-lg bg-secondary2 p-1 outline-none lg:w-99"
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

export default EditPost;
