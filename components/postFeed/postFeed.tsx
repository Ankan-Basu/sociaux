import React from 'react'

function PostFeed(
    {children} : {children: React.ReactNode}
) {
  return (
    <div 
    className='lg:w-101 m-auto rounded-lg p-2'
    >
        Posts: 
        {children}
    </div>
  )
}

export default PostFeed