import Link from 'next/link';
import React, { useEffect, useState } from 'react'

import { FiEdit3, FiTrash, FiX, FiThumbsUp, FiCornerUpRight, FiMessageSquare, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
// const expanded = true; //will come from props

interface IPostProps {
    expanded: boolean;
    uname: string;
    message: string;
    time: Date;
    privacy: number;
    comments?: Array<string>;
    likes?: Array<string>;
    _id: string;
}

export default function Post(
    {
        expanded,
        uname, 
        message, 
        time, 
        privacy, 
        comments, 
        likes, 
        _id
    }: IPostProps

) {

    const [liked, setLiked] = useState<boolean>(false);

    const reactorUname = 'hu_tao' //change later
    
    useEffect(() => {
        if (likes?.includes(reactorUname)) {
            setLiked(true);
        }
    }, [])

    const handleLike = async () => {
        // console.log(_id);

        const reqBody = {
            "uname": reactorUname,
            "postId": _id
        }

        const url = '/api/like/post';

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

    const handleUnlike = async () => {
        // console.log(_id);

        const reqBody = {
            "uname": reactorUname,
            "postId": _id
        }

        const url = '/api/like/post';

        const resp = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });

        if (resp.status === 200) {
            setLiked(false);
        }
        const data = await resp.json();

        console.log(data);
    }


    const toggleLike = () => {
        if (liked) {
            handleUnlike();
        } else {
            handleLike();
        }
    }


  return (
    // <Link href={`/post/${_id}`}>
    <div 
    className={`
    ${expanded?'w-full':''}
    w-80 mb-8 shadow-lg border-2 
    border-solid border-secondary 
    lg:w-100 p-2 pt-1 rounded-lg
    `}
    >
            <div className='text-xs flex justify-between'>
                
                <div className='flex'><DropDown /></div>
                
                <div className='flex gap-2 text-primary'>
                <span>
                <FiEdit3 />
                </span>
                <span>
                <FiTrash />
                </span>
                <span>
                <FiX />
                </span>
                </div>
                </div>
            <div className='flex flex-col py-1 pt-0'>
                <div>
                    <h3 className='font-medium text-lg'>
                        {/* Kamisato Ayaka */}
                        Name
                    </h3>
                </div>
                <div>
                    <h3 className='font-light text-sm'>
                        {/* @aether_simp */}
                        {uname || 'Loading ...'}
                    </h3>
                </div> 
                
              
            </div>
            <div className=''>
            {/* Post
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Repellendus doloremque sapiente asperiores molestiae. Quae repudiandae ab quia excepturi? 
            Nemo molestiae culpa iste magnam officia temporibus quisquam omnis dignissimos odio impedit. */}
            {message || 'Loading ...'}
            </div>
            <div className='border-solid border-2 border-yellow-500 flex justify-center gap-2 py-1'>
Optional Img/ Vid
            </div>
            <div className='text-primary flex justify-center gap-2 pt-1'>
               <span 
               onClick={toggleLike}
               className={`
               cursor-pointer
               py-1 flex-1 flex justify-center items-center gap-1 
               ${liked?'bg-primary text-white':'bg-white text-primary'}
               border-solid border-2 border-primary rounded-lg`}>
                <FiThumbsUp /> 
                
                {/* Display Text only in big screen */}
                <span 
                className='hidden lg:inline'>
                    Like
                    {likes?.length}
                    </span>
                
                </span>
               <span className='py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg'> 
               <FiMessageSquare /> 
               
               {/* Display Text only in big screen */}
               <span className='hidden lg:inline'>
                Comment
                {comments?.length}
                </span>
               </span>
               <span className='py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg'> 
               <FiCornerUpRight /> 
               
               {/* Display Text only in big screen */}
               <span className='hidden lg:inline'>Share</span>
               </span>
                
            </div>
        </div>
        // </Link>
  )
}


function DropDown() {
    const choiceArr = {}
    return (
        <div>
            <select>
                <option value="public">Public</option>
                <option value="friends">Friends</option>
                <option value="onlyMe">Only Me</option>
            </select>
        </div>
    )
}