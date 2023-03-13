import React, { createContext, FC, useState } from 'react'
import CommentInput from './commentInput'
import CommentList from './commentList'

export const CommentContext = createContext<any>('null');
export const ReplyingContext = createContext<any>(null);


interface IReplyingTo {
  _id: string; 
  uname: string
}

interface ICommentScreenProps {
  postId: string;
}

const CommentScreen: FC<ICommentScreenProps> = ({postId}) => {

  const [commentList, setCommentList] = useState<Array<Object>>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyingTo, setReplyingTo] = useState<IReplyingTo | null>(null);
  const [replyList, setReplyList] = useState<Object>({val: 1});

  console.log('comment screen here', postId);
  
  return (
    <div 
    className=''>
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
          replyingTo, setReplyingTo,
          replyList, setReplyList}}>
        <CommentList
        postId={postId}
        customCssClass='pb-14'
        />
        <CommentInput 
        postId={postId}
        customCssClass='
        fixed bottom-0
        // /border-2 /border-solid /border-black
        '
        />
        </ReplyingContext.Provider>
        </CommentContext.Provider>


    </div>
  )
}

export default CommentScreen