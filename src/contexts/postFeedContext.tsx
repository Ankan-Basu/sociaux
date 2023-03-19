import { createContext, FC, useState } from "react";
import ContextProviderProps from "./contextProps";

export const PostFeedContext = createContext<any>(null);

const PostFeedContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [currPost, setCurrPost] = useState(null);
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
