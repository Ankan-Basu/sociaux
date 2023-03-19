import React, { FC, useContext, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { PostFeedContext } from "~/contexts/postFeedContext";
import CommentScreen from "../comment/commentScreen";
import Post from "./Post";

interface IPostScreenProps {
  display: boolean;
  postId?: string;
}

const PostScreen: FC<IPostScreenProps> = ({ display }) => {
  const { setShowExpanded, currPost, setCurrPost } =
    useContext(PostFeedContext);

  console.log("screen", currPost);

  useEffect(() => {
    console.log("Post screen renders");
  }, [currPost]);

  useEffect(() => {
    console.log("Post screen mounts");
  }, []);

  return (
    <div
      className={`
    ${display ? "block" : "hidden"}
    fixed z-50
    top-0 left-0 w-screen h-screen
    bg-gray-600/50 backdrop-blur-lg
    `}
    >
      <div
        className="
        bg-white h-screen 
        w-full sm:w-101
        m-auto sm:rounded-lg
        shadow-lg pt-2 p-2 overflow-auto
        "
      >
        <div
          className="
            flex justify-end
            mb-2 mr-2
            "
        >
          <span
            onClick={() => {
              setCurrPost(null);
              setShowExpanded(false);
            }}
            className="
                active:text-primary2
                lg:hover:text-primary lg:active:text-primary2
                "
          >
            <FiX />
          </span>
        </div>

        <div>
          {currPost && (
            <Post
              expanded={true}
              uname={currPost.uname}
              message={currPost.message}
              time={currPost.time}
              privacy={currPost.privacy}
              comments={currPost.comments}
              likes={currPost.likes}
              _id={currPost._id}
              isModalMode={true}
            />
          )}
        </div>

        <div>{currPost && <CommentScreen postId={currPost._id} />}</div>
      </div>
    </div>
  );
}

export default PostScreen;
