import React, { Children, createContext, ReactNode, useState } from 'react'

const PostFeedContext = createContext<any>(null);

interface IPostFeedContextProviderProps {
    children: ReactNode;
}

function PostFeedContextProvider({children}: IPostFeedContextProviderProps) {

    const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [currPost, setCurrPost] = useState(null);

  return (
    <PostFeedContext.Provider value={{
        showExpanded, setShowExpanded,
        currPost, setCurrPost}}>
            {children}
        </PostFeedContext.Provider>
  )
}

export default PostFeedContextProvider;