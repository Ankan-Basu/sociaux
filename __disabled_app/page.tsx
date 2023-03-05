"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Profile from '@/components/profile/Profile'
import Post from '@/components/posts/Post'
import PersonalOptions from '@/components/PersonalOptions/PersonalOptions'
import { useState } from 'react';
import Modal from '@/components/modal/Modal'
import Plus from '@/components/Plus/Plus'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <main>
      <div className='relative flex flex-col lg:flex-row justify-center gap-5'>
      {/* <div className='fixed left-6 w-60'> */}
          <Profile />

        {/* </div> */}
      <div className='lg:w-100'>
      Posts:
         <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> 
        </div>

{/* <input type="file" onChange={handleChange} />
            <img src={file} />
  </div> */}

      {/* <div className='fixed right-6 w-60'>          
          <PersonalOptions /> 
         </div> 
       */}
       <Plus />
      </div>
       {/* <Modal /> */}
       {/* <PersonalOptions /> */}
    </main>
  )
}