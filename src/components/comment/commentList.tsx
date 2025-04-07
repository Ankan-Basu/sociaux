import { HydratedDocument } from 'mongoose';
import { useRouter } from 'next/router';
import { type FC, useContext, useEffect } from 'react'
import { CommentContext, type CommentContextType } from '~/contexts/commentContext';
import { api } from '~/utils/api';
import Loading from '../loading/loading';
import Comment, { ICommentProps } from './comment'
import {IComment} from '~/server/db/models/Comment';

interface ICommentListProps {
    postId: string;
    refresh: Object;
    customCssClass?: string;
}

const CommentList: FC<ICommentListProps> = ({ postId, refresh, customCssClass }) => {
    const router = useRouter();    

    //change Object to ICommentProps later
    // const [commentList, setCommentList] = useState<Array<Object>>();

    const {commentList, setCommentList} = useContext(CommentContext) as CommentContextType;
   
    const {data, isLoading, isFetching, isError, refetch} = api.comments.getComments.useQuery({postId: postId});

    if (data) {
        setCommentList(data);
    }

    useEffect(() => {
        refetch();
    }, [refresh])
    
    if(isLoading) {
        return (
            <div className='flex justify-center mt-2'>
                <Loading height={50} width={50} />
            </div>
        );
    }

    else if (isError) {
        return (
            <div>
                Error
            </div>
        )
    }
    
  return (
    <div
    className={`
    ${customCssClass + ' '}
    p-2 
    flex flex-col gap-4
    overflow-auto
    `}
    >

        {
            commentList &&
            commentList?.length>0?
            //change this any
            commentList?.map((comment: HydratedDocument<IComment>) => {
                return (
                    <Comment 
                    key={comment._id.toString()} 
                    uname={comment.uname} 
                    message={comment.message} 
                    likes={comment.likes}
                    time={comment.time}
                    _id={comment._id.toString()}/>
                )
            })
            : <div className='mx-auto'>No Comments Found</div>
        
        }
    </div>
  )
}

export default CommentList