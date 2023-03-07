import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Comment, { ICommentProps } from './Comment'

function CommentList() {
    const router = useRouter();
    const {postId} = router.query;

    //change Object to ICommentProps later
    const [commentList, setCommentList] = useState<Array<Object>>();

    useEffect(() => {
        getComments();
    }, [postId]);

    const getComments = async () => {
        const url = `/api/comments/${postId}`;

        const resp = await fetch(url);

        const data = await resp.json();

        // console.log(data);

        setCommentList(data);
    }
    
  return (
    <div
    className='
    p-2
    flex flex-col gap-4
    '
    >

        {
            commentList &&
            //change this any
            commentList.map((comment: any) => {
                return (
                    <Comment key={comment._id} uname={comment.uname} message={comment.message} />
                )
            })
        }
    </div>
  )
}

export default CommentList