import React, { createContext, useContext, useEffect, useState } from 'react'
import {FaEllipsisV, FaEllipsisH} from 'react-icons/fa';
import { ReplyingContext } from './commentScreen';
import ReplyComment from './replyComment';
import ReplyCommentList from './replyCommentList';

export interface ICommentProps {
    uname: string;
    message: string;
    likes?: Array<string>;
    replies?: boolean;
    time?: Date; //change later
    _id: string;
}


export default function Comment(
    {uname, message, likes, replies, time, _id} : ICommentProps
){

    const [liked, setLiked] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState<boolean>(false);

    const {setIsReplying, setReplyingTo, replyingTo} = useContext(ReplyingContext);


    const reactorUname = 'hu_tao'; //change later
    useEffect(() => {
        console.log('comment', _id);
        console.log(_id, 'liked', liked);
        
        
        if(likes?.includes(reactorUname)) {
            setLiked(true);
        }

        console.log(_id, 'liked', liked);
    }, []);

    const handleLike = async () => {
        const reqBody = {
            "uname": reactorUname,
            "commentId": _id
        }

        const url = '/api/like/comment/';

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });

        if (resp.status === 201) {
            setLiked(true);
        }
        const data = await resp.json();

        console.log(data);

    }

    const handleUnLike = async () => {
        const reqBody = {
            "uname": reactorUname,
            "commentId": _id
        }

        const url = '/api/like/comment/';

        const resp = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });

        if (resp.status === 201) {
            setLiked(false);
        }
        const data = await resp.json();

        console.log(data);

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

  return (
    <>
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
                    <div>
                        <FaEllipsisH />
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
            <ReplyCommentList display={showReplies} />
        </div>
    </div>
    </>
  )
}
