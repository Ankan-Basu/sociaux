import React, { createContext, FC, useState } from "react";
import ContextProviderProps from "./contextProps";

interface CommentUnderEdit {
    _id: string;
    uname: string; 
    message: string;
}

export type EditCommentContextType = {
  showCommentEditModal: boolean,
  setShowCommentEditModal: React.Dispatch<React.SetStateAction<boolean>>,
  currEditComment: CommentUnderEdit | null,
  setCurrEditComment: React.Dispatch<React.SetStateAction<CommentUnderEdit | null>>,
  isReplyComment: boolean,
  setIsReplyComment: React.Dispatch<React.SetStateAction<boolean>>,
  refreshReplies?: {val: number},
  setRefreshReplies?: React.Dispatch<React.SetStateAction<{val: number}>>,
  refreshComments?: {val: number},
  setRefreshComments?: React.Dispatch<React.SetStateAction<{val: number}>>,
}
export const EditCommentContext = createContext<EditCommentContextType | null>(null);

const EditCommentContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [showCommentEditModal, setShowCommentEditModal] =
    useState<boolean>(false);
  const [isReplyComment, setIsReplyComment] = useState<boolean>(false);

  const [currEditComment, setCurrEditComment] = useState<CommentUnderEdit | null>(null);

  return (
    <EditCommentContext.Provider
      value={{
        showCommentEditModal,
        setShowCommentEditModal,
        currEditComment,
        setCurrEditComment,
        isReplyComment,
        setIsReplyComment,
        ...additionVals,
      }}
    >
      {children}
    </EditCommentContext.Provider>
  );
};

export default EditCommentContextProvider;
