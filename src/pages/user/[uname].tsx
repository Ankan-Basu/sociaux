import Profile from '@/src/components/profile/Profile';
import PersonalOptions from '@/src/components/PersonalOptions/PersonalOptions';
import PostFeed from '@/src/components/postFeed/postFeed';
import Plus from '@/src/components/Plus/Plus';
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

