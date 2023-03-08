import { useState, createContext } from "react";

export const Context = createContext<any>('null');

function CommentContext({children}: {children: React.ReactNode}) {
  const [commentList, setCommentList] = useState<Array<Object>>([]);
  
  return (
    <Context.Provider value={{commentList, setCommentList}}>
      {children}

    </Context.Provider>
  )
}

export default CommentContext