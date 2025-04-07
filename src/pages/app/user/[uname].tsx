import Profile from '~/components/profile/Profile';
import PersonalOptions from '~/components/PersonalOptions/PersonalOptions';
import PostFeed from '~/components/postFeed/postFeed';
import Plus from '~/components/Plus/Plus';
import { useSession } from 'next-auth/react';
import { useState, type FC } from 'react';
import PostModalContextProvider from '~/contexts/postModalContext';
import PostModal from '~/components/modal/postModal';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PostEditContextProvider from '~/contexts/postEditContext';

const UserId: FC = () => {

  // const [reload, setReload] = useState({reload: 1})
  const session = useSession();

  const router = useRouter();
  
  return (
    <div 
    className='flex flex-col lg:flex-row justify-center items-start'
    >
      <Head>
        <title>Sociaux</title>
      </Head>
      <Profile /> 
      {/* <PostEditContextProvider additionVals={{ setReload }}> */}
      <PostModalContextProvider>
      <PostFeed />
      <PersonalOptions />
      <Plus />
      {/* <PostModal /> */}
      </PostModalContextProvider>
      {/* </PostEditContextProvider> */}
    </div>
  )
}

export default UserId;

