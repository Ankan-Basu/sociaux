import { TRPCClientError } from "@trpc/client";
import { HydratedDocument } from "mongoose";
import { type FC, useContext, useEffect, useState } from "react";
import { ErrorContext, ErrorContextType } from "~/contexts/errorContext";
import { ReplyingContext, ReplyingContextType } from "~/contexts/replyingContext";
import { IReplyComment } from "~/server/db/models/ReplyComment";
import { api } from "~/utils/api";
import Loading from "../loading/loading";
import ReplyComment from "./replyComment";

interface IReplyCommentListProps {
  parenCommId: string;
  display?: boolean;
}

const ReplyCommentList: FC<IReplyCommentListProps> = ({
  parenCommId,
  display = false,
}) => {
  const [replies, setReplies] = useState<Array<HydratedDocument<IReplyComment>>>([]);
  const { refreshReplies } = useContext(ReplyingContext) as ReplyingContextType;

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

  const { data, refetch, isLoading, isFetching } = api.replyComments.getComments.useQuery({
    parenCommId,
  });

  
  

  useEffect(() => {
    // runs when 'display' prop changes
    if (display) {
      //do api call
      // data = await refetch();
      getReplyComments().then(()=>{}).catch(()=>{});
    } else {
      // setReplies([]);
    }

    // prevent flickering
    // return () => {
    //   setReplies([]);
    // }
  }, [display, refreshReplies]);

  const getReplyComments = async () => {
 
    try {

      const data2 = await refetch();
      
      if (data2) {
        setReplies(data2.data!);
      }
    } catch(err) {
      setErrorDisplay(true);
      let msg = 'An unknown error occured';
      if (err instanceof TRPCClientError) {
        msg = err.data.code;
      }
      setErrorMessage(msg);
      setErrorType('simple');
    }
  };

  if (isLoading) {
    return (
      <div className={`${display ? "block" : "hidden"}`}>
      <Loading width={50} height={50}/>
      </div>
    )
  }

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


      {replies?.length>0?
        replies.map((reply: HydratedDocument<IReplyComment>) => {
          return (
            <ReplyComment
              key={reply._id.toString()}
              parenCommId={parenCommId}
              _id={reply._id.toString()}
              uname={reply.uname}
              message={reply.message}
              likes={reply.likes || []}
              time={reply.time}
            />
          );
        })
      :
      <></>
      }
    </div>
  );
};

export default ReplyCommentList;
