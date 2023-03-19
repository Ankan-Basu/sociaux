import React, {createContext, FC, useState} from 'react'

export const PostEditContext = createContext<any>(null);

interface IPostEditContextProps {
    children: React.ReactNode;
    additionVals: Object;
}

const PostEditContextProvider: FC<IPostEditContextProps> = ({children, additionVals}) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currEditPost, setCurrEditPost] = useState(null);
  return (
    <PostEditContext.Provider
        value={{
          showEditModal,
          setShowEditModal,
          currEditPost,
          setCurrEditPost,
          ...additionVals
        }}
        >
        {children}
    </PostEditContext.Provider>
  )
}

export default PostEditContextProvider