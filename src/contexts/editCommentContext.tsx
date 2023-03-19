import { createContext, FC, useState } from "react";
import ContextProviderProps from "./contextProps";

export const EditCommentContext = createContext<any>(null);

const EditCommentContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [showCommentEditModal, setShowCommentEditModal] =
    useState<boolean>(false);
  const [isReplyComment, setIsReplyComment] = useState<boolean>(false);

  const [currEditComment, setCurrEditComment] = useState(null);

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
