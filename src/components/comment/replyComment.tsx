import { useSession } from "next-auth/react";
import { FC, useContext, useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { EditCommentContext } from "~/contexts/editCommentContext";
import { api } from "~/utils/api";
import Comment from "./comment";

interface IReplyCommentProps {
    _id: string;
    parenCommId: string;
    uname: string;
    message: string;
    likes: Array<string>;
    time?: Date;
}

const ReplyComment: FC<IReplyCommentProps> = ({_id, parenCommId, uname, message, likes, time}) => {
  const {
    setShowCommentEditModal,
        setCurrEditComment,
      setIsReplyComment,
      refreshReplies,
      setRefreshReplies} = useContext(EditCommentContext);

      const deleteReplyMutation = api.replyComments.deleteReplyComment.useMutation();
      const likeReplyMutation = api.likes.likeReplyComment.useMutation();
      const unlikeReplyMutation = api.likes.unlikeReplyComment.useMutation();

      const [liked, setLiked] = useState<boolean>(false);
    
      const session = useSession();

      const reactorUname = session.data?.user.uname;


      useEffect(() => {        
        if (!reactorUname) {
            return;
        } else if(likes?.includes(reactorUname)) {
            setLiked(true);
        }
    }, [reactorUname]);


    
    const handleEdit = () => {
        console.log(_id);
        setShowCommentEditModal(true);
        setCurrEditComment({
            _id, uname, message
        });
        setIsReplyComment(true);    
    }

    const handleDelete = async () => {
        try {
            await deleteReplyMutation.mutateAsync({parenCommId, replyCommId: _id});
            setRefreshReplies({...refreshReplies});
        } catch(err) {
            console.log(err);
            
        }
    }


    const handleUnlike = async (reactorUname: string) => {
        try {
            const x = await unlikeReplyMutation.mutateAsync({replyCommentId: _id, uname: reactorUname});
            setLiked(false);
        } catch(err) {
            console.log(err);
        }
    }

    const handleLike = async (reactorUname: string) => {
        try {
            const x = await likeReplyMutation.mutateAsync({replyCommentId: _id, uname: reactorUname});
            setLiked(true);
        } catch(err) {
            console.log(err);
        }
    }
  
    const toggleLike = () => {
        if (session.status !== 'authenticated') {
            console.log('unAuthorised');
            return;
        }

        // const reactorName = session.data.user.uname;
        if (!reactorUname) {
            console.log('unAuthoRised');
            return;
        }

        if (liked) {
            handleUnlike(reactorUname);
        } else {
            handleLike(reactorUname);
        }

    }

    return (
    <div className='flex 
    //w-80 w-full
    lg:w-98'>
        <div className='w-16'>
        <div className='w-full'>
            <img src='ayaka.jpg' height='60rem' width='60rem' className='rounded-full'/>
        </div>
        </div>
        <div className='flex-1'>
            <div className='bg-secondary rounded-lg rounded-tl-none'>
                <div className='flex justify-between p-1'>
                    <div className='flex gap-1 items-center'>
                    <span><h4 className='m-0 p-0 font-medium'>
                         {/* Kamisato Ayaka  */}
                         </h4></span>
                    <span><h4 className='text-sm font-light'>
                        {/* (@aether_simp) */}
                        {uname}
                        </h4></span>
                    </div>
                    <div className="flex gap-1">
                        <span onClick={handleEdit}>
                            Edit</span>
                        <span
                        onClick={handleDelete}
                        >Delete</span>
                        <span>
                        <FaEllipsisH />
                        </span>
                    </div>
                </div>
                <div className='p-2 pt-0'>
                {/* Lorem ipsum dolor sit, amet consectetur 
                adipisicing elit. Maiores animi in libero 
                ratione sed architecto sit, repudiandae eum porro, 
                dignissimos voluptate nihil 
                tempore eius illum! Totam unde deleniti eos voluptas!     */}
                {message}
                </div>                
            </div>
            <div className='px-2 text-sm flex justify-between'>
                <div>
                <span 
                onClick={toggleLike}
                className={`
                cursor-pointer mr-2
                ${liked?'text-primary':'text-black'}
                `}>Like</span>
                
                
                </div>
                <div>20 wks</div>
            </div>
            </div>
            </div>
  
  );
}

export default ReplyComment;
