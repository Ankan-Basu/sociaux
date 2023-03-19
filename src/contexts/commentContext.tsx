import { createContext, FC, useState } from 'react'

export const CommentContext = createContext<any>(null);

interface ICommentContextProps {
    children: React.ReactNode;
    additionVals?: Object;
}

const CommentContextProvider: FC<ICommentContextProps> = ({children, additionVals=undefined}) => {
    const [commentList, setCommentList] = useState<Array<Object>>([]);

  return (
    <CommentContext.Provider value={{commentList, setCommentList}} >
        {children}
    </CommentContext.Provider>
  )
}

export default CommentContextProvider;