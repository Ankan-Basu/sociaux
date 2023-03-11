import React, { FC } from 'react'
import ReplyComment from './replyComment'

interface IReplyCommentListProps {
  parenCommId: string;
    display?: boolean;
}

const ReplyCommentList: FC<IReplyCommentListProps> = ({parenCommId, display=false}) => {

  console.log('Reply to', parenCommId);
  
  return (
    <div className={`
    ${display?'block':'hidden'}
    border-2 border-solid border-black
    flex flex-col gap-3 mt-4
    w-full
    `}>

        <ReplyComment />
        <ReplyComment />
    </div>
  )
}

export default ReplyCommentList