import Profile from '~/components/profile/Profile';
import PersonalOptions from '~/components/PersonalOptions/PersonalOptions';
import PostFeed from '~/components/postFeed/postFeed';
import Plus from '~/components/Plus/Plus';
import { useSession } from 'next-auth/react';
import { type FC } from 'react';
import PostModalContextProvider from '~/contexts/postModalContext';
import PostModal from '~/components/modal/postModal';

const UserId: FC = () => {

  const session = useSession();

  console.log(session);
  
  return (
    <div 
    className='flex flex-col lg:flex-row justify-center items-start'
    >
      <Profile /> 
      <PostFeed />
      <PostModalContextProvider>
      <PersonalOptions />
      <Plus />
      <PostModal />
      </PostModalContextProvider>
    </div>
  )
}

export default UserId;

