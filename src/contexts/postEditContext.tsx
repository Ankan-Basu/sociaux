import { createContext, type FC, useState } from "react";
import type ContextProviderProps from "./contextProps";

interface PostUnderEdit {
  uname: string;
  message: string; 
  privacy: number;
   _id: string;
}

export type PostEditContextType = {
  showEditModal: boolean,
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
  currEditPost: PostUnderEdit | null
  setCurrEditPost: React.Dispatch<React.SetStateAction<PostUnderEdit | null>>,
  reload?: {reload: number},
  setReload?: React.Dispatch<React.SetStateAction<{reload: number}>>
}


export const PostEditContext = createContext<PostEditContextType | null>(null);

const PostEditContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currEditPost, setCurrEditPost] = useState<PostUnderEdit | null>(null);
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
