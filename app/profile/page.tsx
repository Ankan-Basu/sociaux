import React from 'react'
import {FaPen} from 'react-icons/fa';

export default function Profile(){
  return (
    <div className='p-1 w-60 flex flex-col gap-3 border-2 border-solid border-red-300'>

    <div>
        <img src='ayaka.jpg' height='220px' width='220px' className='rounded-full'/>
        <div className='p-1 border-2 border-solid border-red-500 rounded-full inline-block'><FaPen /></div>
    </div>
    <div className='p-1 flex flex-col gap-1 border-2 border-solid border-green-500 rounded-lg'>
        <div>
        <div><h2 className='text-lg font-semibold'>Kamisato Ayaka</h2></div>
        <div><h2 className='font-medium'>@aether_simp</h2></div>
        </div>
        <div>
            <FriendButton />
        </div>
        <div>
            bio
        </div>
    </div>
    </div>
  )
}

function FriendButton() {
    return (
        <>
        <button className='p-1 rounded-full border-2 border-solid border-yellow-500'>
            Add Friend
        </button>
        </>
    )
}
