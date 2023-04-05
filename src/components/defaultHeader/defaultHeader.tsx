import Image from 'next/image'
import React, { type FC } from 'react'

const DefaultHeader: FC = () => {
  return (
    <div 
    className='p-1 w-screen lg:w-60 
    flex lg:flex-col items-center 
    lg:items-stretch gap-1 lg:gap-3
    lg:sticky lg:top-16
    '
    >

    <div 
    className='flex flex-col gap-3 lg:gap-0 relative items-center lg:items-baseline'>
        <Image src='./logo.jpg' alt='logo'
        className='h-24 w-24 lg:h-56 lg:w-56 rounded-full shadow-lg'/>
       
    <div className='block lg:hidden'>
        {/* <FriendButton /> */}
    </div>
    </div>
    <div className='bg-white p-1 flex flex-1 lg:flex-none flex-col gap-1 rounded-lg shadow-lg'>
        <div className='p-1 rounded-lg flex flex-col'>
        <div><h1 className='text-3xl font-semibold'>App Name</h1></div>
        <div><h2 className='font-medium text-lg'>News Feed</h2></div>
        </div>
       
    </div>
    </div>
  )
}

export default DefaultHeader