import DefaultHeader from '~/components/defaultHeader/defaultHeader'
import PersonalOptions from '~/components/PersonalOptions/PersonalOptions'
import Plus from '~/components/Plus/Plus'
import { useSession } from 'next-auth/react'
import React, { type FC } from 'react'
import NewsFeed from '~/components/postFeed/newsFeed'
import Loading from '~/components/loading/loading'

const Feed: FC = () => {

  const session = useSession();
  console.log(session);

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
      <DefaultHeader />
        <NewsFeed />
      <PersonalOptions />
      <Plus />
    </div>
  )
}

export default Feed