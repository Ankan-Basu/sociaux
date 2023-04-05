import React, { createContext, FC, useState } from "react";
import ContextProviderProps from "./contextProps";

interface IReplyingTo {
  _id: string;
  uname: string;
}

export type ReplyingContextType = {
  isReplying: boolean,
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>
  replyingTo: IReplyingTo | null,
  setReplyingTo: React.Dispatch<React.SetStateAction<IReplyingTo | null>>,
  refreshReplies?: {val: number},
  setRefreshComments?: React.Dispatch<React.SetStateAction<{val: number}>>,
  setRefreshReplies?: React.Dispatch<React.SetStateAction<{val: number}>>,
}

export const ReplyingContext = createContext<ReplyingContextType | null>(null);


const ReplyingContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyingTo, setReplyingTo] = useState<IReplyingTo | null>(null);
  return (
    <ReplyingContext.Provider
      value={{
        isReplying,
        setIsReplying,
        replyingTo,
        setReplyingTo,
        ...additionVals,
      }}
    >
      {children}
    </ReplyingContext.Provider>
  );
};

export default ReplyingContextProvider;
