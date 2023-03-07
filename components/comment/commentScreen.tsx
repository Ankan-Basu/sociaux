import React, { createContext, useState } from 'react'
import CommentInput from './commentInput'
import CommentList from './commentList'

export const CommentContext = createContext<any>('null');
function CommentScreen() {

    const [commentList, setCommentList] = useState<Array<Object>>([]);
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

        <CommentContext.Provider value={{commentList, setCommentList}} >
        <CommentList
        customCssClass='pb-14'
        />
        <CommentInput 
        customCssClass='
        fixed bottom-0 w-full
        // /border-2 /border-solid /border-black
        '
        />
        </CommentContext.Provider>


    </div>
  )
}

export default CommentScreen