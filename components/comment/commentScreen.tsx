import React, { createContext, useState } from 'react'
import CommentInput from './commentInput'
import CommentList from './commentList'

export const CommentContext = createContext<any>('null');
export const ReplyingContext = createContext<any>(null);


interface IReplyingTo {
  _id: string; 
  uname: string
}

function CommentScreen() {

  const [commentList, setCommentList] = useState<Array<Object>>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyingTo, setReplyingTo] = useState<IReplyingTo | null>(null);

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
        <ReplyingContext.Provider value={{
          isReplying, setIsReplying, 
          replyingTo, setReplyingTo}}>
        <CommentList
        customCssClass='pb-14'
        />
        <CommentInput 
        customCssClass='
        fixed bottom-0 w-full
        // /border-2 /border-solid /border-black
        '
        />
        </ReplyingContext.Provider>
        </CommentContext.Provider>


    </div>
  )
}

export default CommentScreen