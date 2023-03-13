import React, { FC, useContext, useEffect, useState } from 'react'
import { ReplyingContext } from './commentScreen';
import ReplyComment from './replyComment'

interface IReplyCommentListProps {
  parenCommId: string;
    display?: boolean;
}

const ReplyCommentList: FC<IReplyCommentListProps> = ({parenCommId, display=false}) => {

  // console.log('Reply to', parenCommId);

  const [replies, setReplies] = useState<Array<Object>>([]);
  const {replyList} = useContext(ReplyingContext);
  useEffect(() => {
    console.log('reply comment list');
    // runs when 'display' prop changes

    if (display) {
      //do api call
      getReplyComments();
    } else {
      setReplies([]);
    }

    return () => {
      setReplies([]);
    }
  }, [display, replyList]);


  const getReplyComments = async () => {
    const url = `/api/comments/reply/${parenCommId}`;

    const resp = await fetch(url);

    if (resp.status === 200) {
      const data = await resp.json();
      console.log(data);
      setReplies(data);
      
    } else {
      //handle
      console.log('err fetching');
      
    }
  }
  return (
    <div className={`
    ${display?'block':'hidden'}
    //border-2 border-solid border-black
    flex flex-col gap-3 mt-4
    w-full
    `}>

      {
        replies && 

        replies.map((reply) => {
          return (
            <ReplyComment 
            key={reply._id}
        _id={reply._id}
        uname={reply.uname}
        message={reply.message}
        likes={reply.likes}
        time={reply.time}
        />
          );
        })
        
      }        
    </div>
  )
}

export default ReplyCommentList