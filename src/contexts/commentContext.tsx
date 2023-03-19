import { createContext, FC, useState } from "react";
import ContextProviderProps from "./contextProps";

export const CommentContext = createContext<any>(null);

const CommentContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [commentList, setCommentList] = useState<Array<Object>>([]);

  return (
    <CommentContext.Provider value={{ commentList, setCommentList }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
