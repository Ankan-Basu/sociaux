import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Post from '../posts/Post';
import PostScreen from '../posts/postScreen';

function PostFeed() {
  
  const [posts, setPosts] = useState<Array<Object>>([]);
  const router = useRouter();

  useEffect(() => {
    getPosts();
  }, [router]);


  const getPosts = async () => {  
    const {uname} = router.query;
    console.log(uname);

    const url = `/api/posts/${uname}`;

    const resp = await fetch(url);

    const data = await resp.json();

    console.log(data);

    setPosts(data);
  }
  
  return (
    <div 
    className='lg:w-101 m-auto rounded-lg p-2'
    >
        Posts: 

        <>
        {
        posts.map((post: any) => {
            return (
              <Post
              key={post._id}
              expanded={false}
              uname={post.uname}
              message={post.message}
              privacy={post.privacy}
              time={post.time}
              likes={post.likes}
              comments={post.comments}
              _id={post._id}
              />
              )
            })
        }
        <PostScreen />
        </>
    </div>
  )
}

export default PostFeed