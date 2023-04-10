import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, useContext, useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { EditCommentContext, type EditCommentContextType } from "~/contexts/editCommentContext";
import { PostFeedContext, type PostFeedContextType } from "~/contexts/postFeedContext";
import { api } from "~/utils/api";
import Dropdown from "../dropdown/dropdown";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { ErrorContext, type ErrorContextType } from "~/contexts/errorContext";
import { TRPCClientError } from "@trpc/client";
import Image from "next/image";

dayjs.extend(relativeTime);


interface IReplyCommentProps {
    _id: string;
    parenCommId: string;
    uname: string;
    message: string;
    likes: Array<string>;
    time?: Date;
}

const ReplyComment: FC<IReplyCommentProps> = ({_id, parenCommId, uname, message, likes, time}) => {

    const router = useRouter();
  const {
    setShowCommentEditModal,
        setCurrEditComment,
      setIsReplyComment,
      setRefreshReplies} = useContext(EditCommentContext) as EditCommentContextType;

      const {setShowExpanded} = useContext(PostFeedContext) as PostFeedContextType;

      const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

      const deleteReplyMutation = api.replyComments.deleteReplyComment.useMutation();
      const likeReplyMutation = api.likes.likeReplyComment.useMutation();
      const unlikeReplyMutation = api.likes.unlikeReplyComment.useMutation();

      const profileImgQuery = api.users.getProfileImage.useQuery({uname: uname});

      const [liked, setLiked] = useState<boolean>(false);

      const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
    
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
        if (!reactorUname) {
            console.log('Unauth');
            return;
        }
        try {
            await deleteReplyMutation.mutateAsync({uname: reactorUname, parenCommId, replyCommId: _id});
            
            if (!setRefreshReplies) {
                setErrorDisplay(true);
                setErrorMessage('An unexpexted error occured');
                setErrorType('simple');
                return;
            }
            
            setRefreshReplies({ val: 1 });
        } catch(err) {
            // console.log(err);
            showServerError(err);
        }
    }


    const handleUnlike = async (reactorUname: string) => {
        try {
            await unlikeReplyMutation.mutateAsync({replyCommentId: _id, uname: reactorUname});
            setLiked(false);
        } catch(err) {
            // console.log(err);
            showServerError(err);
        }
    }

    const handleLike = async (reactorUname: string) => {
        try {
            await likeReplyMutation.mutateAsync({replyCommentId: _id, uname: reactorUname});
            setLiked(true);
        } catch(err) {
            // console.log(err);
            showServerError(err);
        }
    }
  
    const toggleLike = () => {
        if (session.status !== 'authenticated') {
            // console.log('unAuthorised');
            setErrorDisplay(true);
            setErrorMessage('You need to login to like');
            setErrorType('simple');
            return;
        }

        // const reactorName = session.data.user.uname;
        if (!reactorUname) {
            // console.log('unAuthoRised');
            setErrorDisplay(true);
            setErrorMessage('UNAUTHORISED');
            setErrorType('logout');
            return;
        }

        if (liked) {
            handleUnlike(reactorUname)
            .then(()=>{}).catch(()=>{});
        } else {
            handleLike(reactorUname)
            .then(()=>{}).catch(()=>{});
        }

    }

    const handleNavigate = () => {
        if (!setShowExpanded) {
            setErrorDisplay(true);
            setErrorMessage('An unexpexted error occured');
            setErrorType('simple');
            return;
        }
        setShowExpanded(false);
        router.push(`/app/user/${uname}`)
        .then(()=>{}).catch(()=>{});
    }

    const showServerError = (err) => {
        setErrorDisplay(true);
        let msg = 'An unknown error occured'
        if (err instanceof TRPCClientError) {
            msg = err.data.code;
            // console.log(msg);
            
        }
        setErrorMessage(msg);
        setErrorType('simple');
    }

    return (
    <div className='flex 
    //w-80 w-full
    lg:w-98'>
        <div className='w-16'>
        <div className='w-full'>
            <Image src={profileImgQuery.data?.img || '/avtar.jpg'} height='60' width='60' alt='photo' className='rounded-full'/>
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
                    ><h4 className='font-medium'>
                        {/* (@aether_simp) */}
                        {`@${uname}`}
                        </h4></span>
                    </div>
                    <div className={`
                    ${session.data?.user.uname===uname? 'flex': 'hidden'} 
                     relative
                    flex gap-1`}>
                        <span className='cursor-pointer'
                        onClick={() => setDisplayDropdown(currState => !currState)}>
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
                
                
                </div>
                <div className="text-xs">{dayjs(time).fromNow()}</div>
            </div>
            </div>
            </div>
  
  );
}

export default ReplyComment;
