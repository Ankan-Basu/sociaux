import { createContext, FC, useState } from "react";
import ContextProviderProps from "./contextProps";

export const ReplyingContext = createContext<any>(null);

interface IReplyingTo {
  _id: string;
  uname: string;
}

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
