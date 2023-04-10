import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { type FC } from 'react'
import PasswordResetComponent from '~/components/auth/passwordResetComponent';
import Blob from '~/components/blob/blob';
import Loading from '~/components/loading/loading';

const ForgotPassword: FC = () => {
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
    <div>
      <Head>
        <title>Sociaux | Forgot Password</title>
      </Head>
      <Blob additionCss='left-20 md:left-28 lg:left-40 xl:left-52 2xl:left-72'/>
      <PasswordResetComponent />
      </div>
  )
}

export default ForgotPassword;