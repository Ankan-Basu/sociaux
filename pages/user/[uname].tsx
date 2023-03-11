import Profile from '@/components/profile/Profile';
import PersonalOptions from '@/components/PersonalOptions/PersonalOptions';
import PostFeed from '@/components/postFeed/postFeed';
import Plus from '@/components/Plus/Plus';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

const UserId: FC = () => {

  const session = useSession();

  console.log(session);
  
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

export default UserId;

