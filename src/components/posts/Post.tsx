import { TRPCError } from "@trpc/server";
import { useSession } from "next-auth/react";
import { FC, useContext, useEffect, useState } from "react";

import {
  FiEdit3,
  FiTrash,
  FiX,
  FiThumbsUp,
  FiCornerUpRight,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { PostEditContext } from "~/contexts/postEditContext";
import { PostFeedContext } from "~/contexts/postFeedContext";
import { api } from "~/utils/api";



interface IPostProps {
  expanded: boolean;
  uname: string;
  message: string;
  time: Date;
  privacy: number;
  imageId: string;
  comments?: Array<string>;
  likes?: Array<string>;
  _id: string;
  isModalMode?: boolean;
}

const Post: FC<IPostProps> =({
  expanded,
  uname,
  message,
  time,
  privacy,
  imageId,
  comments,
  likes,
  _id,
  isModalMode = false,
}) => {

  const [liked, setLiked] = useState<boolean>(false);

  const likeMutation = api.likes.likePost.useMutation();
  const unlikeMutation = api.likes.unlikePost.useMutation();
  const deleteMutation = api.posts.deletePost.useMutation();

  const imgQuery = api.posts.getPostImage.useQuery({imageId: `${imageId}`});

  const {showEditModal,
    setShowEditModal,
    currEditPost,
    setCurrEditPost,
    reload, setReload
  } = useContext(PostEditContext);

  const session = useSession();

  const reactorUname = session.data?.user.uname;

  useEffect(() => {
    // console.log("post renders");

    if (!reactorUname) {
      return;
    }

    if (likes?.includes(reactorUname)) {
      // console.log("post renders includes");

      setLiked(true);
    } else {
      // console.log("post renders includes NOT");

      setLiked(false);
    }
  }, [reactorUname]);



  useEffect(() => {
    console.log(`Post Id: ${_id}\nMessage: ${message}\nImage Id: ${imageId}`);
    
  }, [])


  const handleLike = async () => {
    if (session.status!=='authenticated' || !reactorUname) {
      console.log('UnAuthenticated');     
      return;
    }

    try {
      const x = await likeMutation.mutateAsync({postId: _id, uname: reactorUname})
      console.log(x);
      
        setLiked(true);
    } catch (err: any) {
      console.log(err.message);
    } 
  };

  const handleUnlike = async () => {
    if (session.status!=='authenticated' || !reactorUname) {
      console.log('UnAuthenticated');     
      return;
    }

    try {
      const x = await unlikeMutation.mutateAsync({postId: _id, uname: reactorUname})
      console.log(x);
      
        setLiked(false);
    } catch (e: any) {
      console.log(e);      
    }
  };

  const toggleLike = () => {
    if (liked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  let handleExpanded = undefined;
  // let handleEdit = undefined;

  try {
    // when opened in modal has access to context
    const { showExpanded, setShowExpanded, setCurrPost } =
      useContext(PostFeedContext);

      

      //shows the comments
    handleExpanded = () => {
      if (!showExpanded) {
        setShowExpanded(true);
        setCurrPost({
          expanded,
          uname,
          message,
          time,
          imageId,
          privacy,
          comments,
          likes,
          _id,
        });
      } else {
        console.log("peepeepoopoo");
      }
    };
  } catch (err) {
    //when opened in page. no need to get context
  }

  const handleEdit = () => {
    setShowEditModal(true);
    console.log(message);
    
    setCurrEditPost({
      uname,
      message,
      //time,
      privacy,
      //comments,
      //likes,
       _id,
    })
  }

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({postId: _id});
      setReload({...reload});
    } catch(err) {
      console.log(err);
      
    }
  }

  return (
    <div
      className={`
    ${expanded ? "w-full" : ""}
    w-80 mb-8 shadow-lg border-2 
    border-solid border-secondary 
    lg:w-100 p-2 pt-1 rounded-lg
    bg-white
    `}
    >
      <div className="text-xs flex justify-between">
        <div className="flex">
          <DropDown />
        </div>

        <div 
        className="flex gap-2 text-primary">
          <span
          onClick={handleEdit}
          >
            <FiEdit3 />
          </span>
          <span
          onClick={handleDelete}
          >
            <FiTrash />
          </span>
          <span>
            <FiX />
          </span>
        </div>
      </div>
      <div className="flex flex-col py-1 pt-0">
        <div>
          <h3 className="font-medium text-lg">
            {/* Kamisato Ayaka */}
            Name
          </h3>
        </div>
        <div>
          <h3 className="font-light text-sm">
            {/* @aether_simp */}
            {uname || "Loading ..."}
          </h3>
        </div>
      </div>
      <div className="">
        {/* Post
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Repellendus doloremque sapiente asperiores molestiae. Quae repudiandae ab quia excepturi? 
            Nemo molestiae culpa iste magnam officia temporibus quisquam omnis dignissimos odio impedit. */}
        {message || "Loading ..."}
      </div>
      <div className="border-solid border-2 border-yellow-500 flex justify-center gap-2 py-1">
       {
        imageId?
        <img src={imgQuery.data?.img} />
      :
      <></> 
      }       
      </div>

      <div
        className={`
            ${isModalMode ? "hidden" : "block"}
            text-primary 
            flex justify-center gap-2 pt-1
            `}
      >
        <span
          onClick={toggleLike}
          className={`
               cursor-pointer
               py-1 flex-1 flex justify-center items-center gap-1 
               ${liked ? "bg-primary text-white" : "bg-white text-primary"}
               border-solid border-2 border-primary rounded-lg`}
        >
          <FiThumbsUp />

          {/* Display Text only in big screen */}
          <span className="hidden lg:inline">
            Like
            {likes?.length}
          </span>
        </span>
        <span
          onClick={handleExpanded ? handleExpanded : () => {}}
          className="py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg"
        >
          <FiMessageSquare />

          {/* Display Text only in big screen */}
          <span className="hidden lg:inline">
            Comment
            {comments?.length}
          </span>
        </span>
        <span className="py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg">
          <FiCornerUpRight />

          {/* Display Text only in big screen */}
          <span className="hidden lg:inline">Share</span>
        </span>
      </div>
    </div>
  );
}

const DropDown: FC = () => {
  const choiceArr = {};
  return (
    <div>
      <select>
        <option value="public">Public</option>
        <option value="friends">Friends</option>
        <option value="onlyMe">Only Me</option>
      </select>
    </div>
  );
}

export default Post;
