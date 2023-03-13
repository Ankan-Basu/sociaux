// import PostFeedContextProvider, { PostFeedContext } from '@/contexts/postFeedContext';
import { useRouter } from 'next/router';
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import Post from '../posts/Post';
import PostScreen from '../posts/postScreen';

export const PostFeedContext = createContext<any>(null);

const PostFeed: FC = () => {
  
  const [posts, setPosts] = useState<Array<Object>>([]);
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [currPost, setCurrPost] = useState(null);

  // const {showExpanded} = useContext(PostFeedContext)

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
          {/* <PostFeedContextProvider> */}
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
        {/* </PostFeedContextProvider> */}
        </PostFeedContext.Provider>
    </div>
  )
}

export default PostFeed