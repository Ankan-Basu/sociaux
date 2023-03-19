import React, { createContext, FC, useState } from "react";
import ContextProviderProps from "./contextProps";

export const PostEditContext = createContext<any>(null);

const PostEditContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currEditPost, setCurrEditPost] = useState(null);
  return (
    <PostEditContext.Provider
      value={{
        showEditModal,
        setShowEditModal,
        currEditPost,
        setCurrEditPost,
        ...additionVals,
      }}
    >
      {children}
    </PostEditContext.Provider>
  );
};

export default PostEditContextProvider;
