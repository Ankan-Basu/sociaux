import React, { FC, useContext, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { ReplyingContext } from "./commentScreen";
import ReplyComment from "./replyComment";

interface IReplyCommentListProps {
  parenCommId: string;
  display?: boolean;
}

const ReplyCommentList: FC<IReplyCommentListProps> = ({
  parenCommId,
  display = false,
}) => {
  // console.log('Reply to', parenCommId);

  const [replies, setReplies] = useState<Array<Object>>([]);
  const { replyList } = useContext(ReplyingContext);

  let { data, refetch } = api.replyComments.getComments.useQuery({
    parenCommId,
  });

  

  useEffect(() => {
    console.log('reply comment list');
    // runs when 'display' prop changes
    if (display) {
      //do api call
      // data = await refetch();
      getReplyComments();
    } else {
      // setReplies([]);
    }

    // prevent flickering
    // return () => {
    //   setReplies([]);
    // }
  }, [display, replyList]);

  const getReplyComments = async () => {
 
    let data2 = await refetch();
    console.log('REPLY', data2);
    
    if (data2) {
      setReplies(data2.data!);
    }
  };

  if (data?.length === 0) {
    return (
      <div
      className={`
    ${display ? "block" : "hidden"}
     mt-4 flex
    w-full flex-col gap-3
    `}
    >
        <span className="
        text-sm ml-4 -mt-2
        ">No replies</span>
      </div>
    );
  }
  return (
    <div
      className={`
    ${display ? "block" : "hidden"}
     mt-4 flex
    w-full flex-col gap-3
    `}
    >
      {replies &&
        replies?.map((reply: any) => {
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
        })}
    </div>
  );
};

export default ReplyCommentList;
