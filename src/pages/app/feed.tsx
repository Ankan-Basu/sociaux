import DefaultHeader from '~/components/defaultHeader/defaultHeader'
import PersonalOptions from '~/components/PersonalOptions/PersonalOptions'
import Plus from '~/components/Plus/Plus'
import { useSession } from 'next-auth/react'
import React, { useState, type FC } from 'react'
import NewsFeed from '~/components/postFeed/newsFeed'
import Loading from '~/components/loading/loading'
import PostModalContextProvider from '~/contexts/postModalContext'
import PostModal from '~/components/modal/postModal'
import Head from 'next/head'
import PostEditContextProvider from '~/contexts/postEditContext'

const Feed: FC = () => {

  const session = useSession();
  // console.log(session);

  // const [reload, setReload] = useState({reload: 1})

  if (session.status === 'loading') {
    return (
      <div 
      className='flex flex-col lg:flex-row justify-center items-center'
      >
      <div><Loading height={100} width={100} /></div>
      </div>
    )
  }

  
  return (
    <div 
    className='flex flex-col lg:flex-row justify-center items-start'
    >
      <Head>
        <title>Sociaux | News Feed</title>
      </Head>
      <DefaultHeader />
        {/* <PostEditContextProvider additionVals={{ setReload }}> */}
        <PostModalContextProvider>
        <NewsFeed />
        <PersonalOptions />
        <Plus />
        {/* <PostModal /> */}
        </PostModalContextProvider>
        {/* </PostEditContextProvider> */}
    </div>
  )
}

export default Feed