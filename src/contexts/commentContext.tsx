import { type HydratedDocument } from "mongoose";
import { createContext, type FC, useState } from "react";
import { type IComment } from "~/server/db/models/Comment";
import type ContextProviderProps from "./contextProps";

export type CommentContextType = {
  commentList: Array<HydratedDocument<IComment>> | undefined, 
  setCommentList: React.Dispatch<React.SetStateAction<Array<HydratedDocument<IComment>> | undefined>>
}
export const CommentContext = createContext<CommentContextType | null>(null);

const CommentContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [commentList, setCommentList] = useState<Array<HydratedDocument<IComment>> | undefined>([]);

  return (
    <CommentContext.Provider value={{ commentList, setCommentList, ...additionVals}}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
