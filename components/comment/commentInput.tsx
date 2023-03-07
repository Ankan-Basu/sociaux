import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";

interface Props {
    customCssClass?: string
}

function CommentInput({ customCssClass }: Props) {
    const [inp, setInp] = useState<string>('');

    const router = useRouter();
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const {postId} = router.query;
        const uname = 'hu_tao'; //change later
        const message = inp;

        const obj = {uname, postId, message};

        const url = `/api/comments/${postId}`;

        setInp('');

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(obj)
        });

        const data = await resp.json();

        console.log(data);
    }

    return (
        <div 
        className={`
        ${customCssClass + ' '}
        bg-white
        p-2 pb-1
        w-full sm:w-100
        `}
        >
    <form 
    onSubmit={handleSubmit}
    className={`flex border-2 border-solid`}>
        
        
        <input
        type='text'
        placeholder='Write your comment here'
        value={inp}
        onChange={(e)=>{setInp(e.target.value)}}
        
        className='
        bg-secondary2
        p-2 rounded-lg
        flex-1
        '>
        </input>
        <button
        type='submit' 
        className={`
        bg-primary 
        active:bg-primary2 active:text-white
        lg:hover:bg-primary2 lg:active:bg-primary
        lg:hover:text-white lg:active:text-black
        p-3
        rounded-lg
        `}>
            <FiSend />
        </button>

        </form>
        </div>
  )
}

export default CommentInput;
