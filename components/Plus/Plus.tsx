import React from 'react'
import { FiPlus } from 'react-icons/fi';

export default function Plus() {
  return (
    <div 
    className='z-10 fixed bottom-6 right-6 shadow-2xl h-14 w-14 flex lg:hidden justify-center items-center bg-primary rounded-full'
    >
        <span className='text-3xl text-white p-1'>
            <FiPlus />
        </span>
    </div>
  )
}
