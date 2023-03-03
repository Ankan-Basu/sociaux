import React from 'react'
import {FaPen} from 'react-icons/fa';

export default function Profile(){
  return (
    <div className='p-1 w-60 flex flex-col gap-3 border-2 border-solid border-red-300'>

    <div className='flex items-baseline'>
        <img src='ayaka.jpg' height='220px' width='220px' className='rounded-full border-2 border-solid border-red-400'/>
        <div className='p-3 relative bottom-4 right-9 border-2 border-solid border-red-500 rounded-full inline-block'><FaPen /></div>
    </div>
    <div className='p- flex flex-col gap-1 border-2 border-solid border-green-500 rounded-lg'>
        <div className='p-1 border-2 border-solid border-pink-500 rounded-lg'>
        <div><h2 className='text-lg font-semibold'>Kamisato Ayaka</h2></div>
        <div><h2 className='font-medium'>@aether_simp</h2></div>
        </div>
        <div className='mt-1'>
            <FriendButton />
        </div>
        <div>
            <div className='mt-1 p-1 flex items-center justify-between'>
                Bio:
             <FaPen />    
            </div>
             
        <div className='p-1 h-28 border-2 border-solid border-blue-200 rounded-lg'>
            First I become sword fighter <br />
            Then I do the Travell...
        </div>
        </div>
    </div>
    </div>
  )
}

function FriendButton() {
    return (
        <>
        <button className='p-1 px-2 rounded-lg border-2 border-solid border-yellow-500'>
            Add Friend
        </button>
        </>
    )
}
