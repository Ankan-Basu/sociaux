import { useState } from 'react'
import { useRouter } from 'next/router'
import Profile from '@/components/profile/Profile';
import PersonalOptions from '@/components/PersonalOptions/PersonalOptions';
import PostFeed from '@/components/postFeed/postFeed';
import Post from '@/components/posts/Post';
import Plus from '@/components/Plus/Plus';
import PersonalOptionsMobile from '@/components/PersonalOptions/PersonalOptionsMobile';

export default function UserId() {

    const router = useRouter();
    const { userId}  = router.query

    const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div 
    className='flex flex-col lg:flex-row justify-center items-start'
    >
      <Profile /> 
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

