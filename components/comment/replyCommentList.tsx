import React from 'react'
import ReplyComment from './replyComment'

interface IReplyCommentListProps {
    display?: boolean;
}

function ReplyCommentList(
    {display=false}: IReplyCommentListProps
) {
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