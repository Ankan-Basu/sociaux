import DefaultHeader from '@/components/defaultHeader/defaultHeader'
import PersonalOptions from '@/components/PersonalOptions/PersonalOptions'
import Plus from '@/components/Plus/Plus'
import PostFeed from '@/components/postFeed/postFeed'
import Post from '@/components/posts/Post'
import Profile from '@/components/profile/Profile'
import React from 'react'

function Feed() {
  return (
    <div 
    className='flex flex-col lg:flex-row justify-center items-start'
    >
      {/* <Profile />  */}
      <DefaultHeader />
      <PostFeed > 
        <Post/>
        <Post />
        <Post />
        <Post />
        <Post />
        </PostFeed>
      <PersonalOptions />
      <Plus />
    </div>
  )
}

export default Feed