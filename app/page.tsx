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
      <div className='relative flex justify-center gap-3 border-2 border-solid border-red-400'>
      <div className='relative top-2 left-0 w-60 border-2 border-solid border-black'>
          {/* <Profile /> */}
Profile
        </div>
      <div className='w-100 h-screen border-2 border-solid border-green-500'>
      Content
        {/* <Post /> */}
      </div>

      <div className='fixed right-0 w-60 border-2 border-solid border-black'>
          {/* <Profile /> */}
          Post
          <PersonalOptions />
        </div>
      
      </div>
    </main>
  )
}
