import Profile from '~/components/profile/Profile';
import PersonalOptions from '~/components/PersonalOptions/PersonalOptions';
import PostFeed from '~/components/postFeed/postFeed';
import Plus from '~/components/Plus/Plus';
import { useSession } from 'next-auth/react';
import { type FC } from 'react';
import PostModalContextProvider from '~/contexts/postModalContext';
import PostModal from '~/components/modal/postModal';
import Head from 'next/head';
import { useRouter } from 'next/router';

const UserId: FC = () => {

  const session = useSession();

  const router = useRouter();
  // console.log(session);
  
  return (
    <div 
    className='flex flex-col lg:flex-row justify-center items-start'
    >
      <Head>
        <title>Sociaux</title>
      </Head>
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

