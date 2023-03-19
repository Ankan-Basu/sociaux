import { createContext, FC, useState } from "react";

export const PostFeedContext = createContext<any>(null);

interface IPostFeedContextProps {
  children: React.ReactNode;
  additionVals?: Object;
}

const PostFeedContextProvider: FC<IPostFeedContextProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [currPost, setCurrPost] = useState(null);
  return (
    <PostFeedContext.Provider
      value={{
        currPost,
        setCurrPost,
        ...additionVals
      }}
    >
      {children}
    </PostFeedContext.Provider>
  );
};

export default PostFeedContextProvider;
