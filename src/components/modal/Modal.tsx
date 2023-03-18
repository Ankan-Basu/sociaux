import { useSession } from 'next-auth/react';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
import React, { FC, useEffect, useState } from 'react'
// import { FaShare, FaLock, FaGlobe, FaEllipsisV, FaEllipsisH, FaTrash, FaRegTimesCircle, FaImage, FaVideo } from 'react-icons/fa';
import { FiTrash, FiArrowRight, FiCornerUpRight, FiX, FiImage, FiVideo } from "react-icons/fi";
import { api } from '~/utils/api';


interface PostBody {
    uname: string;
    privacy: number;
    message: string;
    shares?: number;
}

interface IModalProps {
    display: boolean;
        customCss?: string; 
        setShowModal: Function;
        mode?: string;
}

const Modal: FC<IModalProps> = ({display, customCss, setShowModal, mode='mobile'}) => {

    const [postMessage, setPostMessage] = useState<string>('');

    // console.log(mode);

    const session = useSession();

    const postMutation = api.posts.createPost.useMutation();


    const handleClose = () => {
        console.log('Close');

        setShowModal(false)
    }




    const uname = session.data?.user?.uname;
    const privacy = 0;

    const handlePost = async () => {
        console.log(postMessage);

        if (!uname) {
            console.log('error');
            return;
            
        }

        // const postBody: PostBody = 
        // {uname, message: postMessage, privacy};

        // const url = '/api/posts';

        // const resp = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(postBody)
        // });
        // setPostMessage('');

        // if (resp.status === 201) {
        //     const data = await resp.json();

        //     console.log(data);
        // } else {
        //     //TODO
        // }

        try {
            const x = await postMutation.mutateAsync({uname, message: postMessage, privacy})
            console.log(x);
            setPostMessage('')
            
        } catch(err) {
            console.log(err);
            
        }

    }


    return (
        <div 
        className={`
        ${!display?'hidden':''}
        ${customCss + ' '}
        fixed bg-white z-40
        h-screen w-screen lg:h-auto lg:w-100 p-2 pt-1 rounded-lg`}
        >
            <div className={`
            flex justify-end 
            ${mode==='mobile'?'mt-4':'mt-1'} 
            `}>
                <span 
                onClick={handleClose}
                className='cursor-pointer text-primary'>
                <FiX />
                </span>
                </div>
            <div className='flex py-1 pt-0'>
                Privacy:
               <DropDown />
            </div>
            <div className=''>
            <label htmlFor="textarea" className='py-1'>Write post here:</label>


                <textarea 
                value={postMessage}
                onChange={(e)=> setPostMessage(e.target.value)}
                id="textarea" name="textarea" rows={4} cols={50} 
                className='bg-secondary2 w-full lg:w-99 rounded-lg outline-none p-1 resize-none'
                >
                </textarea>
            </div>
            <div className='flex justify-center gap-2 py-1'>
                <button className='bg-deactiv p-2 flex-1 flex justify-center rounded-md'>
                    <FiImage /></button>
                <button className='bg-deactiv p-2 flex-1 flex justify-center rounded-md'>
                    <FiVideo /></button>
            </div>
            <div className='flex justify-center flex-col gap-1 pt-1'>
                <span 
                className='flex-1'>
                <Button>
                    <FiTrash />Discard
                </Button>
                </span>
                <span 
                onClick={handlePost}
                className='flex-1'>
                <Button type='normal'>
                    <FiCornerUpRight />Post</Button>
                </span>
                
            </div>
        </div>
    )
}

function DropDown() {
    const choiceArr = {}
    return (
        <div>
            <select>
                <option value="public"> Public</option>
                <option value="friends">Friends</option>
                <option value="onlyMe"> Only Me</option>
            </select>
        </div>
    )
}

interface IButtonProps {
    children: React.ReactNode; 
    type?: string;
}

const Button: FC<IButtonProps> = ({children, type}) => {
    return (
        <button className={`p-1 rounded-md ${type==='normal'?'bg-primary':'bg-deactiv'} flex w-full justify-center items-center gap-2`}>
            {children}
        </button>
    )
}

export default Modal;