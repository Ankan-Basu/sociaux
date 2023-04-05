import React, { createContext, FC, useState } from "react";
import { IPostProps } from "~/components/posts/Post";
import ContextProviderProps from "./contextProps";

export type PostFeedContextType = {
  currPost: IPostProps | null,
  setCurrPost: React.Dispatch<React.SetStateAction<IPostProps | null>>,
  showExpanded?: boolean,
  setShowExpanded?: React.Dispatch<React.SetStateAction<boolean>>
}
export const PostFeedContext = createContext<any>(null);

const PostFeedContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [currPost, setCurrPost] = useState<IPostProps | null>(null);
  return (
    <PostFeedContext.Provider
      value={{
        currPost,
        setCurrPost,
        ...additionVals,
      }}
    >
      {children}
    </PostFeedContext.Provider>
  );
};

export default PostFeedContextProvider;
