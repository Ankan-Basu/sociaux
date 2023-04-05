import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";


import {
  FiThumbsUp,
  FiCornerUpRight,
  FiMessageSquare,
  FiMoreHorizontal
} from "react-icons/fi";
import { PostEditContext, PostEditContextType } from "~/contexts/postEditContext";
import { PostFeedContext } from "~/contexts/postFeedContext";
import { api } from "~/utils/api";
import Dropdown from "../dropdown/dropdown";
import Modal from "../modal/Modal";
import SharePostModal from "../modal/sharePostModal";



export interface IPostProps {
  expanded: boolean;
  uname: string | undefined;
  message: string | undefined;
  time: Date | undefined;
  privacy: number | undefined;
  imageId: string | undefined;
  shareId: string | undefined;
  comments?: Array<string>;
  likes?: Array<string>;
  _id: string | undefined;
  isModalMode?: boolean;
  isSharedPost?: boolean;
}

const Post: FC<IPostProps> =({
  expanded,
  uname,
  message,
  time,
  privacy,
  imageId,
  shareId,
  comments,
  likes,
  _id,
  isModalMode = false,
  isSharedPost = false,
}) => {

  const [liked, setLiked] = useState<boolean>(false);

  const likeMutation = api.likes.likePost.useMutation();
  const unlikeMutation = api.likes.unlikePost.useMutation();
  const deleteMutation = api.posts.deletePost.useMutation();

  const imgQuery = api.posts.getPostImage.useQuery({imageId: `${imageId}`});

  const sharePostMutation = api.posts.sharePost.useMutation();

  const sharedPostQuery = api.posts.getOnePost.useQuery({postId: `${shareId}`});

  const {showEditModal,
    setShowEditModal,
    currEditPost,
    setCurrEditPost,
    setReload
  } = useContext(PostEditContext) as PostEditContextType;

  const session = useSession();

  const reactorUname = session.data?.user.uname;

  const [showShareModal, setShowShareModal] = useState<boolean>(false);


  const [sharedPost, setSharedPost] = useState<Object | undefined>(undefined);

  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (!reactorUname) {
      return;
    }
    if (likes?.includes(reactorUname)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [reactorUname]);



  const handleLike = async () => {
    if (session.status!=='authenticated' || !reactorUname) {
      console.log('UnAuthenticated');     
      return;
    }

    if (!_id) {
      //err
      return;
    }

    try {
      const x = await likeMutation.mutateAsync({postId: _id, uname: reactorUname})
      console.log(x);
      likes?.push(reactorUname);
      
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

    if (!_id) {
      //err
      return;
    }

    try {
      const x = await unlikeMutation.mutateAsync({postId: _id, uname: reactorUname})
      console.log(x);
      
        setLiked(false);
        // likes = likes?.filter((like) => {
        //   return like !== reactorUname;
        // })
        likes?.pop();
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

  let handleExpanded: (() => void) | undefined = undefined;
  // let handleEdit = undefined;

  try {
    // when opened in post feed has access to context
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
          shareId,
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
    // console.log(message);

    if (!uname || privacy === undefined || !_id || message === undefined) {
      //err
      
      return;
    }
    
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
    if (!_id) {
      //err
      return;
    }
    
    try {
      await deleteMutation.mutateAsync({postId: _id});
      if (!setReload) {
        return;
      }
      setReload({reload: 1});
    } catch(err) {
      console.log(err);
      
    }
  }

  if (!_id) {
    return (
      <div
      className={`
    ${expanded ? "w-full" : ""}
    w-80 mb-8 shadow-lg border-2 
    border-solid border-secondary 
    lg:w-100 p-2 pt-1 rounded-lg
    ${isSharedPost? "w-full lg:w-full mb-1": ""}
    bg-white
    `}
    >
      <div className="text-sm font-light italic">
      Post NOT found. <br />
      The post may have been deleted or it's privacy setting doesn't allow
      you to view it.
      </div>
      </div>
    )
  }


  return (
    <div
      className={`
    ${expanded ? "w-full" : ""}
    w-80 mb-8 shadow-lg border-2 
    border-solid border-secondary 
    lg:w-100 p-2 pt-1 rounded-lg
    ${isSharedPost? "w-full lg:w-full mb-0": ""}
    bg-white relative
    `}
    >
      <div className="text-xs flex justify-between">
        <div className="flex">
          Privacy: {privacy?'Friend':'Public'}
        </div>

        <div 
        className={`
        ${isSharedPost ? "hidden" : "flex"}
        ${session.data?.user.uname===uname? 'flex': 'hidden'}
        //flex //gap-2 //text-primary`}>
      
          <span 
          className='cursor-pointer text-base //p-1 rounded-full'
          onClick={() => setDisplayDropdown(currState => !currState)}
          >
            <FiMoreHorizontal />
          </span>
          <Dropdown additionCSS="top-6 right-0" display={displayDropdown}
          options={
           [
            {optionName: 'Edit', callback: handleEdit},
            {optionName: 'Delete', callback: handleDelete}
           ] 
          } 
          setDisplay={setDisplayDropdown}
          />
        </div>
      </div>
      <div className="flex flex-col py-1 pt-0">
        
        {/* <div>
          <h3 className="font-medium text-lg"> */}
            {/* Kamisato Ayaka */}
            {/* Name
          </h3>
        </div> */}
        <div>
          <h3 
          className="//font-light //text-sm font-medium text-lg">
          <Link href={`/user/${uname}`}>
            {/* @aether_simp */}
            {uname? `@${uname}` : "Loading ..."}
          </Link>
          </h3>
        </div>
        <div className="text-xs font-light mb-1">
          {dayjs(time).fromNow()}
        </div>
      </div>
      <div className="">
        {(message || message==='')?message:''}
      </div>
      <div>
        {
          shareId && sharedPostQuery.isFetched &&
          <Post expanded={true} 
          isSharedPost={true}
        uname={sharedPostQuery.data?.uname} 
        message={sharedPostQuery.data?.message} 
        privacy={sharedPostQuery.data?.privacy} 
        imageId={sharedPostQuery.data?.imageId}
        shareId={undefined}
        time={sharedPostQuery.data?.time}
        likes={sharedPostQuery.data?.likes}
        comments={sharedPostQuery.data?.comments}
        _id={sharedPostQuery.data?._id?.toString()}
        />
        }
      </div>
      {imageId && 
      <div className="border-solid border-2 border-yellow-500 flex justify-center gap-2 py-1">
       {
         imageId?
         <img src={imgQuery.data?.img} />
         :
      <></> 
      }       
      </div>
      }

      <div className={`text-sm font-light mt-2
      ${isSharedPost ? "hidden" : "block"}
      `}>
        
        {likes?likes.length?`${likes?.length} like(s)`:'':''}
        
        
        </div>
      <div
        className={`
            ${isModalMode ? "hidden" : "block"}
            ${isSharedPost ? "hidden" : "block"}
            //${expanded ? "hidden" : "block"}
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
            {/* {likes?.length} */}
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
            {/* {comments?.length} */}
          </span>
        </span>
        <span 
        onClick={() => setShowShareModal(true)}
        className="py-1 pointer
        flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg">
          <FiCornerUpRight />

          {/* Display Text only in big screen */}
          <span className="hidden lg:inline">Share</span>
        </span>
      </div>

      {/* don't allow reshare of shared post */}
      <SharePostModal postId={_id} mode='desktop' display={!shareId && showShareModal} setShowModal={setShowShareModal} />
    </div>
  );
}

export default Post;
