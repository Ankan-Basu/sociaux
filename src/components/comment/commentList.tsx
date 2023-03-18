import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react'
import { api } from '~/utils/api';
import Comment, { ICommentProps } from './comment'
import { CommentContext } from './commentScreen';

interface ICommentListProps {
    postId: string;
    refresh: Object;
    customCssClass?: string;
}

const CommentList: FC<ICommentListProps> = ({ postId, refresh, customCssClass }) => {
    const router = useRouter();
    console.log('Comment list component', postId);
    

    //change Object to ICommentProps later
    // const [commentList, setCommentList] = useState<Array<Object>>();

    const {commentList, setCommentList} = useContext(CommentContext);
   
    const {data, isLoading, isError, refetch} = api.comments.getComments.useQuery({postId: postId});

    if (data) {
        setCommentList(data);
    }
    
    if(isLoading) {
        return (
            <div>
                Loading
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
    //border-2 //border-solid //border-blue-500
    `}
    >

        {
            commentList &&
            //change this any
            commentList?.map((comment: any) => {
                return (
                    <Comment 
                    key={comment._id} 
                    uname={comment.uname} 
                    message={comment.message} 
                    likes={comment.likes}
                    _id={comment._id}/>
                )
            })
        }
    </div>
  )
}

export default CommentList