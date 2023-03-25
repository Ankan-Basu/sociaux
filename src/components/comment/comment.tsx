import { useSession } from 'next-auth/react';
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import {FaEllipsisV, FaEllipsisH} from 'react-icons/fa';
import { EditCommentContext } from '~/contexts/editCommentContext';
import { ReplyingContext } from '~/contexts/replyingContext';
import { api } from '~/utils/api';
import ReplyCommentList from './replyCommentList';

export interface ICommentProps {
    uname: string;
    message: string;
    likes: Array<string>;
    replies?: boolean;
    time?: Date; //change later
    _id: string;
}


const Comment: FC<ICommentProps> = (
    {uname, message, likes=[], replies, time, _id}
) => {

    // console.log('Comment renders', _id);
    
    const deleteCommentMutation = api.comments.deleteComment.useMutation();
    const likeCommentMutation = api.likes.likeComment.useMutation();
    const unlikeCommentMutation = api.likes.unlikeComment.useMutation();

    const profileImgQuery = api.users.getProfileImage.useQuery({uname: uname});

    const [liked, setLiked] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState<boolean>(false);

    const [img, setImg] = useState<string>();

    const {setIsReplying, setReplyingTo, replyingTo} = useContext(ReplyingContext);

    const {setShowCommentEditModal, setCurrEditComment, setIsReplyComment, setRefreshComments, refreshComments} = useContext(EditCommentContext);

    const session = useSession();

    const reactorUname = session.data?.user.uname;
    
    useEffect(() => {
        console.log('comment', _id);
        // console.log(_id, 'liked', liked);
        
        if (!reactorUname) {
            return;
        } else if(likes?.includes(reactorUname)) {
            setLiked(true);
        }

        // console.log(_id, 'liked', liked);
    }, [reactorUname]);


    // TODO: refresh comment
    const handleLike = async () => {
        if (!reactorUname) {
            return;
        }
        
        try {
            const x = await likeCommentMutation.mutateAsync({commentId: _id, uname: reactorUname});
            setLiked(true);
            likes.push(reactorUname);
        } catch(err) {
            console.log(err);
        }
    }

    const handleUnLike = async () => {
        if (!reactorUname) {
            return;
        }

        try {
            const x = await unlikeCommentMutation.mutateAsync({commentId: _id, uname: reactorUname});
            setLiked(false);

                for (let i=0; i<likes?.length; i++) {
                    if (likes[i] === reactorUname) {
                        delete likes[i];
                    }
                }
            
        } catch(err) {
            console.log(err);
        }

    }

    const toggleLike = () => {
        // console.log(_id);
        if (liked) {
            handleUnLike();
        } else {
            handleLike();
        }
    }

    const toggleReply = () => {
        // setIsReplying((currState: boolean) => {
        //     return !currState
        // })

        if (replyingTo) {
            //disable if clicked from same parent component
            if (replyingTo._id === _id) {
                setReplyingTo(null);
                setIsReplying(false);
            }

            //switch to other parent comment if clicked from there
            else {
                setReplyingTo({_id, uname});
                setIsReplying(true);    
            }
        } else {
            setReplyingTo({_id, uname});
            setIsReplying(true);
        }
    }

    const handleEdit = () => {
        console.log(_id);
        setShowCommentEditModal((currState: boolean) => !currState);
        setCurrEditComment({
            _id, uname, message
        });
        setIsReplyComment(false);
    }

    const handleDelete = async () => {
        try {
            await deleteCommentMutation.mutateAsync({commentId: _id});
            setRefreshComments({...refreshComments});
        } catch(err) {
            console.log(err);
            
        }
    }

  return (
    <>
    <div className={`flex 
    //w-80 w-full p-1 rounded-lg
    ${replyingTo?._id===_id? 'bg-yellow-100':''}
    lg:w-98`}>
        <div className='w-16'>
        <div className='w-full'>
            <img src={profileImgQuery.data?.img} height='60rem' width='60rem' className='rounded-full'/>
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
                    <div className='flex gap-2'>
                        <span
                        onClick={handleEdit}
                        >
                        Edit
                        </span>
                        <span
                        onClick={handleDelete}
                        >
                            Delete
                        </span>
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
                
                <span 
                onClick={toggleReply}
                className='cursor-pointer'>
                    Reply</span>
                </div>
                <div>20 wks</div>
            </div>
            <div 
            className='
            ml-4 text-sm cursor-pointer
            '
            onClick={() => setShowReplies(currState => !currState)}
            >
                {
                    !showReplies?'Show replies':'Hide replies'
                }
                
                </div>
            <ReplyCommentList parenCommId={_id} display={showReplies} />
        </div>
    </div>
    </>
  )
}

export default Comment;
