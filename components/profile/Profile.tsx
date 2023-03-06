import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {FaPen} from 'react-icons/fa';
import { FiEdit2, FiEdit3 } from "react-icons/fi";
import { useRouter } from 'next/router';


export default function Profile(){

    const [fullName, setFullName] = useState<string>();
    const [userName, setUserName] = useState<string>();
  
    const router = useRouter();

    useEffect(() => {
        // console.log('Mounted', router.query.uname)
        if(typeof router.query.uname === 'string') {
            let uname: string = router.query.uname;
            fetchUserData(uname);







        }

    }, [router])  

    const fetchUserData = async (uname: string) => {
        const url = `/api/user/@${uname}`;

        const resp = await fetch(url);

        const data = await resp.json();

        // console.log(data);
        setFullName(data.name);
        setUserName(data.uname);
    }
  
    return (
    
    <div 
    className='p-1 w-screen lg:w-60 
    flex lg:flex-col items-center 
    lg:items-stretch gap-1 lg:gap-3
    lg:sticky lg:top-16
    '
    >

{/* <Link href='/user/ayaka'>
<button>Go</button>
</Link> */}
    <div 
    className='flex flex-col gap-3 lg:gap-0 relative items-center lg:items-baseline'>
        <img src='../ayaka.jpg' 
        className='h-36 w-36 lg:h-56 lg:w-56 rounded-full shadow-lg'/>
        <div 
        className='p-3 absolute bottom-12 right-0 lg:bottom-4 lg:right-2 bg-secondary2 text-primary rounded-full inline-block shadow-lg'
        >
            <FiEdit3 />
            </div>
    <div className='block lg:hidden'>
        <FriendButton />
    </div>
    </div>
    <div className='bg-white p-1 flex flex-1 lg:flex-none flex-col gap-1 rounded-lg shadow-lg'>
        <div className='p-1 rounded-lg flex flex-col'>
        <div><h2 className='text-lg font-semibold'>
            {/* Kamisato Ayaka */}
            {fullName || 'Loading...'}
            </h2></div>
        <div><h2 className='font-medium text-sm lg:text-base'>
            {/* @aether_simp */}
            {userName || 'Loading...'}
            </h2></div>
        </div>
        <div className='mt-1 hidden lg:block'>
            <FriendButton />
        </div>
        <div>
            <div className='mt-1 p-1 flex items-center justify-between text-sm lg:text-base'>
                <h3 className='font-medium'>Bio:</h3>
             
             <span>
             <FiEdit3/>    
             </span>
            </div>
             
        <div className='whitespace-pre-wrap overflow-hidden bg-secondary2 p-1 h-24 lg:h-28 rounded-lg text-sm lg:text-base'>
           
        </div>
        </div>
    </div>
    </div>
  )
}

function FriendButton() {
    return (
        <>
        <button className='p-1 lg:px-2 bg-primary rounded-lg border-2 border-solid border-primary2'>
            <span className='text-sm lg:text-base'>Add Friend</span>
        </button>
        </>
    )
}
