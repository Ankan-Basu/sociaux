import { createContext, ReactNode, useState } from 'react';

export const CommentContext = createContext<any>('null');


interface ICommentContextProviderProps {
  children: ReactNode;
}
function CommentContextProvider({children}: ICommentContextProviderProps) {

  const [commentList, setCommentList] = useState<Array<Object>>([]);

  return (
    <CommentContext.Provider value={{commentList, setCommentList}}>
      {children}
    </CommentContext.Provider>
  )
}

export default CommentContextProvider