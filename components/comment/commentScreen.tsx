import React from 'react'
import CommentInput from './commentInput'
import CommentList from './commentList'

function CommentScreen() {
  return (
    <div 
    className='
    
    '
    >
        <div
        className='p-2 pt-0'
        >
        <h3 className='text-lg font-medium'>
        Comments:
        </h3>
        </div>
        <CommentList
        customCssClass='pb-14'
        />
        <CommentInput 
        customCssClass='
        fixed bottom-0 w-full 
        border-2 border-solid border-black
        '
        />


    </div>
  )
}

export default CommentScreen