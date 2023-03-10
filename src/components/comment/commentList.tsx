import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react'
import Comment, { ICommentProps } from './comment'
import { CommentContext } from './commentScreen';

interface ICommentListProps {
    postId: string;
    customCssClass?: string;
}

const CommentList: FC<ICommentListProps> = ({ postId, customCssClass }) => {
    const router = useRouter();
    // const {postId} = router.query;
    console.log('Comment list component', postId);
    

    //change Object to ICommentProps later
    // const [commentList, setCommentList] = useState<Array<Object>>();

    const {commentList, setCommentList} = useContext(CommentContext);
   
    useEffect(() => {
        console.log('Comment list useEffect. postId:', postId);
        
        getComments();
    }, []);

    const getComments = async () => {
        const url = `/api/comments/${postId}`;

        const resp = await fetch(url);

        const data = await resp.json();

        console.log(data);

        setCommentList(data);
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
            commentList.map((comment: any) => {
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