import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";

interface Props {
    customCssClass?: string
}

function CommentInput({ customCssClass }: Props) {
    const [inp, setInp] = useState<string>();

    const router = useRouter();
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const {postId} = router.query;
        const uname = 'hu_tao'; //change later
        const message = inp;

        const obj = {uname, postId, message};

        const url = `/api/comments/${postId}`;

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
    <form 
    onSubmit={handleSubmit}
    className={`${customCssClass + ' '} flex`}>
        
        
        <input
        type='text'
        placeholder='Write your comment here'
        value={inp}
        onChange={(e)=>{setInp(e.target.value)}}
        
        className='
        bg-secondary2
        p-2 rounded-lg
        '>
        </input>
        <button
        type='submit' 
        className={`
        bg-primary 
        active:bg-primary2 active:text-white
        lg:hover:bg-primary2 lg:active:bg-primary
        lg:hover:text-white lg:active:text-black
        p-2 border-2 border-solid
        rounded-lg
        `}>
            <FiSend />
        </button>

        </form>
  )
}

export default CommentInput;
