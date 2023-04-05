import Link from 'next/link'
import { type ChangeEvent, type FC, useState } from 'react'
import { FiEyeOff, FiEye, FiLogIn } from "react-icons/fi";
import type InputDataType from '../util/InputDataType';
import inputValidator from '../util/inputValidator';
import type ValidatedOutput from '../util/ValidatedOutput';

import { useSession, signIn, type SignInResponse } from "next-auth/react"
import { useRouter } from 'next/router';

const LoginComponent: FC = () => {

  const session = useSession();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [unameEmail, setUnameEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const[inpInvalid, setInpInvalid] = useState<boolean>(false);
  const[passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [unauth, setUnauth] = useState<boolean>(false);


  if (session.status === "loading") {
    return <div className='m-auto'>Loading...</div>
  }

  if (session.status === "authenticated") {
    router.push('/feed')
    .then(()=>{}).catch(()=>{});
    return <div className='m-auto'>You are logged in. Redirecting ...</div>
  }
  

  


  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const obj: InputDataType = {
      email: unameEmail,
      uname: unameEmail,
      password: password
    }

    const resObj: ValidatedOutput = inputValidator(obj);
    console.log(resObj);

    if (!resObj.uname && !resObj.email) {
      setInpInvalid(true);
      return
    }
    if (!resObj.password) {
      setPasswordInvalid(true);
      return;
    }

    const obj2 = {uname:'', email:'', password}
    if (resObj.uname) {
      obj2.uname = unameEmail;
    } if (resObj.email) {
      obj2.email = unameEmail;
    }

    // console.log(obj2);

    const status: SignInResponse | undefined = await signIn('credentials', {
      redirect: false,
      email: obj2.email,
      uname: '',
      password: obj2.password,
      callbackUrl:'/feed'
    })

    // console.log(status);
    // if (status?.ok) {
    //   router.push('/user/1')
    // }

    if (!status?.ok) {
      // console.log('Err');
      setUnauth(true);
    }
    
  }

  return (
    <div className='
    w-5/6 max-w-md m-auto p-3 rounded-lg shadow-lg
    border-2 border-solid'>
      <h2
      className='
      text-3xl font-medium
      flex gap-1
      '
      >
        <FiLogIn />
        Login: 
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
        border-2 border-solid
        `}
        placeholder='username or email'
        type='text'
        value={unameEmail}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUnameEmail(e.target.value);
          setInpInvalid(false);
          setPasswordInvalid(false);
          setUnauth(false);
        }}
        >
        </input>

<div className='relative'>
        <input
        className={`
        p-1 bg-secondary2
        w-full rounded-lg
        border-2 border-solid
        `}
        placeholder='password'
        type={`${showPassword?'text':'password'}`}
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
          setInpInvalid(false);
          setPasswordInvalid(false);
          setUnauth(false);
        }}
        >
        </input>

        <div
        className={`
        ${showPassword?'block':'hidden'}
        text-lg p-2
        absolute top-0 right-0
        cursor-pointer
        active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary
        `}
        onClick={() => setShowPassword((currState) => !currState)}
        >
          <FiEyeOff />
        </div>
        
        <div
        className={`
        ${!showPassword?'block':'hidden'}
        text-lg p-2
        absolute top-0 right-0
        cursor-pointer
        active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary
        `}
        onClick={() => setShowPassword((currState) => !currState)}
        >
          <FiEye />
        </div>
        </div>

        <div 
        className={`
        ${(unauth || passwordInvalid || inpInvalid)?'block':'hidden'}
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
          Login
        </button>
      
      <div
      className='
      text-primary active:text-primary2
      lg:hover:text-primary2 lg:active:text-primary'>
        Forgot Password?
      </div>
      <div>
        Don&apos;t have an account? 
        <Link href='/signup'>
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

export default LoginComponent