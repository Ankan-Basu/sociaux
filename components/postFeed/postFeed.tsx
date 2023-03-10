import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react'
import Post from '../posts/Post';
import PostScreen from '../posts/postScreen';

export const PostFeedContext = createContext<any>(null);

function PostFeed() {
  
  const [posts, setPosts] = useState<Array<Object>>([]);
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [currPost, setCurrPost] = useState(null);

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

        <PostFeedContext.Provider value={{
          showExpanded, setShowExpanded,
          currPost, setCurrPost}}>
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
        <PostScreen display={showExpanded} />
        </PostFeedContext.Provider>
    </div>
  )
}

export default PostFeed