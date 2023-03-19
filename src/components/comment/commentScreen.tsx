import { createContext, FC, useState } from 'react'
import CommentContextProvider from '~/contexts/commentContext';
import ReplyingContextProvider from '~/contexts/replyingContext';
import EditComment from '../edit/editComment';
import CommentInput from './commentInput'
import CommentList from './commentList'

export const EditCommentContext = createContext<any>(null);




interface ICommentScreenProps {
  postId: string;
}

const CommentScreen: FC<ICommentScreenProps> = ({postId}) => {

  
  const [refreshReplies, setRefreshReplies] = useState<Object>({val: 1});

  const [showCommentEditModal, setShowCommentEditModal] = useState<boolean>(false);
  const [isReplyComment, setIsReplyComment] = useState<boolean>(false);

  const [currEditComment, setCurrEditComment] = useState(null);

  const [refreshComments, setRefreshComments] = useState({val: 1})

  console.log('comment screen here', postId);
  
  return (
    <div 
    className=''>
        <div
        className='p-2 pt-0'
        >
        <h3 className='text-lg font-medium'>
        Comments:
        </h3>
        </div>

        <CommentContextProvider>
            <ReplyingContextProvider additionVals={{refreshReplies, setRefreshComments, setRefreshReplies}}>
            
            <EditCommentContext.Provider
            value={{
              showCommentEditModal,
          setShowCommentEditModal,
              currEditComment, setCurrEditComment,
            isReplyComment, setIsReplyComment, refreshReplies, setRefreshReplies, setRefreshComments
            }}
            >


        <CommentList
        postId={postId}
        refresh={refreshComments}
        customCssClass='pb-14'
        />
        <CommentInput 
        postId={postId}
        customCssClass='
        fixed bottom-0
        // /border-2 /border-solid /border-black
        '
        />
        <EditComment />
        </EditCommentContext.Provider>
        </ReplyingContextProvider>
        </CommentContextProvider>


    </div>
  )
}

export default CommentScreen