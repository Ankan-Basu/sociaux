import DefaultHeader from '~/components/defaultHeader/defaultHeader'
import PersonalOptions from '~/components/PersonalOptions/PersonalOptions'
import Plus from '~/components/Plus/Plus'
import PostFeed from '~/components/postFeed/postFeed'
import Post from '~/components/posts/Post'
import Profile from '~/components/profile/Profile'
import { useSession } from 'next-auth/react'
import React, { FC } from 'react'
import Link from 'next/link'
import NewsFeed from '~/components/postFeed/newsFeed'

const Feed: FC = () => {

  const session = useSession();
  console.log(session);

  if (session.status === 'loading') {
    return (
      <div>Loading</div>
    )
  }

  // if (session.status === 'unauthenticated') {
  //   return (
  //     <div>Forbidden</div>
  //   )
  // }
  
  return (
    <div 
    className='flex flex-col lg:flex-row justify-center items-start'
    >
      {/* <Profile />  */}
      <DefaultHeader />
      {/* <PostFeed > 
        <Post/>
        <Post />
        <Post />
        <Post />
        <Post />
        </PostFeed> */}
        <NewsFeed />

        {/* {session.data?.user?.uname} */}

        {/* <Link href={`/user/abc`}>User Page</Link> */}
      <PersonalOptions />
      <Plus />
    </div>
  )
}

export default Feed