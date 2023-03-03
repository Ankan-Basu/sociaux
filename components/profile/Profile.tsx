import React from 'react'
import {FaPen} from 'react-icons/fa';
import { FiEdit2, FiEdit3 } from "react-icons/fi";

export default function Profile(){
  return (
    <div className='p-1 w-60 flex flex-col gap-3'>

    <div className='flex items-baseline'>
        <img src='ayaka.jpg' height='220px' width='220px' className='rounded-full shadow-lg'/>
        <div className='p-3 relative bottom-4 right-9 bg-secondary2 text-primary rounded-full inline-block shadow-lg'>
            <FiEdit3 />
            </div>
    </div>
    <div className='p-1 flex flex-col gap-1 rounded-lg shadow-lg'>
        <div className='p-1 rounded-lg'>
        <div><h2 className='text-lg font-semibold'>Kamisato Ayaka</h2></div>
        <div><h2 className='font-medium'>@aether_simp</h2></div>
        </div>
        <div className='mt-1'>
            <FriendButton />
        </div>
        <div>
            <div className='mt-1 p-1 flex items-center justify-between'>
                <h3 className='font-medium'>Bio:</h3>
             <FiEdit3/>    
            </div>
             
        <div className='bg-secondary2 p-1 h-28 rounded-lg'>
           
        </div>
        </div>
    </div>
    </div>
  )
}

function FriendButton() {
    return (
        <>
        <button className='p-1 px-2 bg-primary rounded-lg border-2 border-solid border-primary2'>
            Add Friend
        </button>
        </>
    )
}
