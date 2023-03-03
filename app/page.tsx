import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Profile from '@/components/profile/Profile'
import Post from '@/components/posts/Post'
import PersonalOptions from '@/components/PersonalOptions/PersonalOptions'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className='relative flex justify-center gap-5'>
      <div className='fixed left-6 w-60'>
          <Profile />

        </div>
      <div className='w-100'>
      Posts:
         <Post />
        { /*<Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>

      <div className='fixed right-6 w-60'>
          {/* <Profile /> */}
          
          <PersonalOptions />
        </div>
      
      </div>
    </main>
  )
}
