import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FC, useContext, useEffect, useState } from 'react'
import { EditCommentContext, type EditCommentContextType} from '~/contexts/editCommentContext';
import { PostFeedContext, type PostFeedContextType } from '~/contexts/postFeedContext';
import { ReplyingContext, type ReplyingContextType } from '~/contexts/replyingContext';
import { api } from '~/utils/api';
import Dropdown from '../dropdown/dropdown';
import ReplyCommentList from './replyCommentList';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { ErrorContext, type ErrorContextType } from '~/contexts/errorContext';
import { TRPCClientError } from '@trpc/client';
import { FiMoreHorizontal } from 'react-icons/fi';
import Image from 'next/image';

dayjs.extend(relativeTime);


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
    const router = useRouter();
    
    const deleteCommentMutation = api.comments.deleteComment.useMutation();
    const likeCommentMutation = api.likes.likeComment.useMutation();
    const unlikeCommentMutation = api.likes.unlikeComment.useMutation();

    const profileImgQuery = api.users.getProfileImage.useQuery({uname: uname});

    const [liked, setLiked] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState<boolean>(false);

    // const [img, setImg] = useState<string>();

    const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);

    const {setIsReplying, setReplyingTo, replyingTo} = useContext(ReplyingContext) as ReplyingContextType;

    const {setShowCommentEditModal, setCurrEditComment, setIsReplyComment, setRefreshComments, refreshComments} = useContext(EditCommentContext) as EditCommentContextType;

    const {setShowExpanded} = useContext(PostFeedContext) as PostFeedContextType;

    const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

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
            setErrorDisplay(true);
            setErrorMessage('You need to login in to like');
            setErrorType('simple');
            return;
        }
        
        try {
            const x = await likeCommentMutation.mutateAsync({commentId: _id, uname: reactorUname});
            setLiked(true);
            likes.push(reactorUname);
        } catch(err) {
            // console.log(err);
            setErrorDisplay(true);
            if (err instanceof TRPCClientError) {
                setErrorMessage(err.data.code);
            } else {
                setErrorMessage('Unknown error occured')
            }
            setErrorType('simple')
        }
    }

    const handleUnLike = async () => {
        if (!reactorUname) {
            setErrorDisplay(true);
            setErrorMessage('You need to login in to unlike');
            setErrorType('simple');
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
            // console.log(err);
            setErrorDisplay(true);
            if (err instanceof TRPCClientError) {
                setErrorMessage(err.data.code);
            } else {
                setErrorMessage('Unknown error occured')
            }
            setErrorType('simple')
        }

    }

    const toggleLike = () => {
        // console.log(_id);
        if (liked) {
            handleUnLike()
            .then(()=>{}).catch(()=>{});
        } else {
            handleLike()
            .then(()=>{}).catch(()=>{});
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
        if (!reactorUname) {
            console.log('UNAUTH');
            return;
        }
        
        try {
            await deleteCommentMutation.mutateAsync({uname: reactorUname, commentId: _id});
            if (!setRefreshComments) {
                setErrorDisplay(true);
                setErrorMessage('An unexpected error occured');
                setErrorType('simple');
                return;
            }
            setRefreshComments({val: 1});
        } catch(err) {
            // console.log(err);
            setErrorDisplay(true);
            if (err instanceof TRPCClientError) {
                setErrorMessage(err.data.code);
            } else {
                setErrorMessage('Unknown error occured')
            }
            setErrorType('simple')
            
        }
    }

    const handleNavigate = () => {
        if (!setShowExpanded) {
            setErrorDisplay(true);
            setErrorMessage('An unexpected error occured');
            setErrorType('simple');
            return;
        }
        setShowExpanded(false);
        router.push(`/user/${uname}`)
        .then(()=>{}).catch(()=>{});
    }

  return (
    <>
    <div className={`flex 
    //w-80 w-full p-1 rounded-lg
    ${replyingTo?._id===_id? 'bg-yellow-100':''}
    //lg:w-98`}>
        <div className='w-16'>
        <div className='w-full'>
            <Image src={profileImgQuery.data?.img || ''} height='60' width='60' alt='photo' className='rounded-full'/>
        </div>
        </div>
        <div className='flex-1'>
            <div className='bg-secondary rounded-lg rounded-tl-none'>
                <div className='flex justify-between p-1'>
                    <div className='flex gap-1 items-center'>
                    <span><h4 className='m-0 p-0 font-medium'>
                         {/* Kamisato Ayaka  */}
                         </h4></span>
                    <span
                    onClick={handleNavigate}
                    className='cursor-pointer'
                    >
                        <h4 className='//text-sm //font-light font-medium'>
                        {/* (@aether_simp) */}
                        {`@${uname}`}
                        </h4>
                        
                        </span>
                    </div>
                    <div className={`
                    ${session.data?.user.uname===uname? 'flex': 'hidden'} 
                    gap-2 relative`}>
                        <span className='cursor-pointer'
                        onClick={() => setDisplayDropdown(currState => !currState)}
                        >
                        <FiMoreHorizontal />
                        </span>
                        <Dropdown 
                        display={displayDropdown}
                        options={[
                            {optionName: 'Edit', callback: handleEdit},
                            {optionName: 'Delete', callback: handleDelete}
                        ]}
                        additionCSS = 'top-4 right-0'
                        setDisplay={setDisplayDropdown}
                        />
                    </div>
                </div>
                <div className='p-2 pt-0'>
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
                <div className="text-xs">{dayjs(time).fromNow()}</div>
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
