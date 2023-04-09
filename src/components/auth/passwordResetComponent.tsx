import Link from 'next/link'
import { type ChangeEvent, type FC, useState } from 'react'
import { FiLock, FiEyeOff, FiEye, FiLogIn } from "react-icons/fi";
import type InputDataType from '../util/InputDataType';
import inputValidator from '../util/inputValidator';
import type ValidatedOutput from '../util/ValidatedOutput';

import { useSession, signIn, type SignInResponse } from "next-auth/react"
import { useRouter } from 'next/router';
import Loading from '../loading/loading';
import { api } from '~/utils/api';

const PasswordResetComponent: FC = () => {

  const session = useSession();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [unameEmail, setUnameEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [otp, setOtp] = useState<string>('');
  const [otpReceived, setOtpReceived] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);

  const [currErr, setCUrrErr] = useState<string>('');


  const emailVerifier = api.passwordReset.verifyMail.useMutation();
  const otpVerifier = api.passwordReset.verifyOtp.useMutation();
  const passwordMutation = api.passwordReset.changePassword.useMutation();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!otpReceived) {
      // verify email and send otp
      try {
        const x = await emailVerifier.mutateAsync({email: unameEmail});
        // console.log('EMAIL veri', x);
        if (x) {
          setOtpReceived(true);
        } else {
          setCUrrErr('No account is linked with this email');
        }
      } catch(err) {

      }
    } else {
      if (!otpVerified) {
        // verify otp and grant change password right
        try {

          const x = await otpVerifier.mutateAsync({email: unameEmail, otp: otp});
          if (x) {
            setOtpVerified(true);
          } else {
            setCUrrErr('Wrong OTP or OTP expired');
          }
        } catch(err) {

        }
      } else {
        //change password
        try {
          const x = passwordMutation.mutateAsync({email: unameEmail, password: password})
        } catch(err) {

        }

      }
    }
    
  }




  return (
    <div className='
    w-5/6 max-w-md m-auto p-3 rounded-lg shadow-2xl
    bg-white/70'>
      
      
      <h2
      className='
      text-3xl font-medium
      flex gap-1
      '
      >
        <FiLock />
        Reset Password: 
      </h2>
      <form
      className='flex flex-col gap-4 mt-4 relative'
      onSubmit={(e) => {
        handleLoginSubmit(e)
        .then(()=>{}).catch(()=>{});
      }
    }
      >
        <input
        className={`
        p-1 bg-secondary2
        w-full rounded-lg
         outline-primary2 
        `}
        placeholder='email'
        type='text'
        value={unameEmail}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (!otpReceived) {
            setUnameEmail(e.target.value);
          }
        }}
        />
        


        <input
        className={`
        ${otpReceived?'block':'hidden'}
        p-1 bg-secondary2
        w-full rounded-lg
         outline-primary2 
        `}
        placeholder='OTP'
        type='text'
        value={otp}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setOtp(e.target.value);
        }}
        />
        

        <div 
        className={`
        text-red-500
        `}
        >Invalid Email/Uname or Password</div>

        <button 
        className='
        bg-primary
        p-1 rounded-lg
        border-2 border-solid border-primary2
        cursor-pointer
        flex justify-center items-center
        active:bg-primary2 active:text-white
        lg:hover:bg-primary2 lg:active:bg-primary
        lg:hover:text-white lg:active:text-black
        '
        type='submit'>
          Submit
        </button>
      
      <div
      className='
      /text-primary /active:text-primary2
      h-1/2lg:hover:text-primary2 /lg:active:text-primary'>
        Remembered Password? 
        <Link href='/app/login'>
        <span 
        className='
        ml-1
        text-primary active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary'>
        Submit.
        </span>
        </Link>
      </div>

      <div>
        Don&apos;t have an account? 
        <Link href='/app/signup'>
        <span 
        className='
        ml-1
        text-primary active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary'>
        Sign Up.
        </span>
        </Link>
      </div>


      </form>

    </div>
  )
}

export default PasswordResetComponent