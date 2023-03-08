import { useRouter } from 'next/router'
import Profile from '@/components/profile/Profile';
import PersonalOptions from '@/components/PersonalOptions/PersonalOptions';
import PostFeed from '@/components/postFeed/postFeed';
import Plus from '@/components/Plus/Plus';
import PersonalOptionsMobile from '@/components/PersonalOptions/PersonalOptionsMobile';

export default function UserId() {

    const router = useRouter();
    const { uname}  = router.query

  return (
    <div 
    className='flex flex-col lg:flex-row justify-center items-start'
    >
      <Profile /> 
      <PostFeed ></PostFeed>
      <PersonalOptions />
      <Plus />
    </div>
  )
}

