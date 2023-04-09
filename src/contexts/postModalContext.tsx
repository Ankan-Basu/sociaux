import { createContext, type FC, useState } from "react";
import type ContextProviderProps from "./contextProps";


export type PostModalContextType = {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  mode: 'mobile' | 'desktop',
  setMode: React.Dispatch<React.SetStateAction<'mobile' | 'desktop'>>
}

export const PostModalContext = createContext<PostModalContextType | null>(null);

const PostModalContextProvider: FC<ContextProviderProps> = ({
  children,
  additionVals = undefined,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [mode, setMode] = useState<'mobile' | 'desktop'>('desktop');

  return (
    <PostModalContext.Provider
      value={{
        showModal, setShowModal,
        mode, setMode,
        ...additionVals,
      }}
    >
      {children}
      
    </PostModalContext.Provider>
  );
};

export default PostModalContextProvider;
