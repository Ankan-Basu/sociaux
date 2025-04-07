import React, { FC, useContext, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { PostFeedContext, PostFeedContextType } from "~/contexts/postFeedContext";
import CommentScreen from "../comment/commentScreen";
import Post from "./Post";

interface IPostScreenProps {
  display: boolean;
  postId?: string;
}

const PostScreen: FC<IPostScreenProps> = ({ display }) => {
  const { setShowExpanded, currPost, setCurrPost } =
    useContext(PostFeedContext) as PostFeedContextType;

  return (
    <div
      className={`
    ${display ? "block" : "hidden"}
    fixed
    z-30
    top-0 left-0 w-screen h-screen
    bg-gray-600/50 backdrop-blur-lg
    //overflow-hidden
    `}
    >
      <div
        className="
        bg-white/70
        bg-yellow-200//
        lg:bg-white h-screen //h-auto
        w-full sm:w-101
        m-auto sm:rounded-lg
        border-2 border-red border-green-500
        shadow-lg pt-2 p-2 overflow-auto
        "
      >
        <div
          className="
            flex justify-end
            mb-2 mr-2 bg-white
            "
        >
          <span
            onClick={() => {
              setCurrPost(null);
              if (!setShowExpanded) {
                return;
                //wont happen
              }
              setShowExpanded(false);
            }}
            className="
                active:text-primary2
                lg:hover:text-primary lg:active:text-primary2
                fixed top-1
                bg-secondary2 p-3 rounded-full border-2 border-solid border-primary
                z-60 //do it
                "
          >
            <FiX />
          </span>
        </div>

        <div className="mt-8">
          {currPost && (
            <Post
              expanded={true}
              uname={currPost.uname}
              message={currPost.message}
              time={currPost.time}
              privacy={currPost.privacy}
              imageId={currPost.imageId}
              shareId={currPost.shareId}
              comments={currPost.comments}
              likes={currPost.likes}
              _id={currPost._id}
              isModalMode={true}
            />
          )}
        </div>

        <div
        className=""
        >{currPost && <CommentScreen postId={currPost._id} />}</div>
      </div>
    </div>
  );
}

export default PostScreen;
