import LoginComponent from '~/components/auth/loginComponent'
import React, { FC } from 'react'
import Blob from '~/components/blob/blob'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import Loading from '~/components/loading/loading';




const Login: FC = () => {

  const session = useSession();
  const router = useRouter();


  if (session.status === "loading") {
    return (
      <div className='flex justify-center'>
    <div className='flex flex-col gap-2 justify-center items-center'>
      <div>Loading ...</div>
      <Loading height={50} width={50} />
      </div>
      </div>
      )
  }

  if (session.status === "authenticated") {
    router.push('/app/feed')
    .then(()=>{}).catch(()=>{});
    return (
      <div className='flex justify-center'>
    <div className='flex flex-col gap-2 justify-center items-center'>
      <div>You are logged in. Redirecting ...</div>
      <Loading height={50} width={50} />
      </div>
      </div>
      )
  }
  


  return (
    <div className=''>
      <Blob additionCss='left-20 md:left-28 lg:left-40 xl:left-52 2xl:left-72'/>
      
      <div className={`mt-4 lg:mt-14 flex flex-col justify-center gap-2 lg:flex-row`}>
      <div 
      className=' 
      flex-1 lg:order-1 
      text-4xl lg:text-5xl font-medium 
      flex item-center'>
      <span 
      className='flex items-center
     ml-6 sm:ml-20 md:ml-24
      '>
        <div>
        Welcome to<span className='text-primary2'>&nbsp;Sociaux</span>
        <span className='text-secondary2'>.</span>
        </div>
      </span>
      </div>
      <div className='flex-1 order-2'>
      <LoginComponent />
      </div>
      </div>
    </div>
  )
}

export default Login