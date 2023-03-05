import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { FiAtSign, FiUserCheck, FiEyeOff, FiEye, FiLogIn } from "react-icons/fi";
import Post from '../posts/Post';
import InputDataType from '../util/InputDataType';
import inputValidator from '../util/inputValidator';
import ValidatedOutput from '../util/ValidatedOutput';

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

function SignupComponent() {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [uname, setUname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cPassword, setCPassword] = useState<string>('');
  
  const [passwordMisMatch, setPasswordMisMatch] = useState<boolean>(false);

  const[emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const[unameInvalid, setUnameInvalid] = useState<boolean>(false);
  const[passwordInvalid, setPasswordInvalid] = useState<boolean>(false);


  const router = useRouter();

  
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const obj: InputDataType = {
      email: email,
      uname: uname,
      password: password
    }

    const resObj: ValidatedOutput = inputValidator(obj);

    console.log(resObj);
  //  Object.values(resObj).every(item => item === true);

    if (password !== cPassword) {
      setPasswordMisMatch(true);
      return;
    }

    const obj2 = {name, uname:'', email:'', password:''}
    
    if (!resObj.password) {
      setPasswordInvalid(true);
      return;
    } else {
      obj2.password = password
    }

    if (!resObj.email) {
      setEmailInvalid(true);
      return;
    } else {
      obj2.email = email;
    }

    if (!resObj.uname) {
      setUnameInvalid(true);
      return;
    } else {
      obj2.uname = uname;
    }

    // console.log(obj2);

    const url = '/api/signup';
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj2)
    });

    const data = await resp.json();

    console.log(data);

    if (resp.status === 201) {
      //do login and redirect

      const status:any = await signIn('credentials', {
        redirect: false,
        email: obj2.email,
        password: obj2.password,
        callbackUrl:'/user/1'
      })

      if (status.ok) {
        router.push('/user/1')
      }
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
        <FiUserCheck />
        Sign Up: 
      </h2>
      <form
      className='flex flex-col gap-4 mt-4 relative'
      onSubmit={handleLoginSubmit}
      >
        <input
        className={`
        p-1 bg-secondary2
        w-full rounded-lg
        border-2 border-solid
        `}
        placeholder='Full Name'
        type='text'
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value)
        }}
        >
        </input>

        <input
        className={`
        p-1 bg-secondary2
        w-full rounded-lg
        border-2 border-solid
        `}
        placeholder='Email'
        type='text'
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}
        >
        </input>

        <input
        className={`
        p-1 bg-secondary2
        w-full rounded-lg
        border-2 border-solid
        `}
        placeholder='Username'
        type='text'
        value={uname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUname(e.target.value)
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
        placeholder='Password'
        type={`${showPassword?'text':'password'}`}
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value)
        }}
        >
        </input>

    {/*  --- Eye icon --- */}
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
{/*  --- Eye icon --- */}
</div>   

<div className='relative'>
        <input
        className={`
        p-1 bg-secondary2
        w-full rounded-lg
        border-2 border-solid
        `}
        placeholder='Confirm Password'
        type={`${showCPassword?'text':'password'}`}
        value={cPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setCPassword(e.target.value)
        }}
        >
        </input>

        {/*  --- Eye icon --- */}
        <div
        className={`
        ${showCPassword?'block':'hidden'}
        text-lg p-2
        absolute top-0 right-0
        cursor-pointer
        active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary
        `}
        onClick={() => setShowCPassword((currState) => !currState)}
        >
          <FiEyeOff />
        </div>
        
        <div
        className={`
        ${!showCPassword?'block':'hidden'}
        text-lg p-2
        absolute top-0 right-0
        cursor-pointer
        active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary
        `}
        onClick={() => setShowCPassword((currState) => !currState)}
        >
          <FiEye />
        </div>
{/*  --- Eye icon --- */}
</div>
        
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
          Sign Up
        </button>
      
      <div>
        Already have an account? 
        <Link href='/login'>
        <span 
        className='
        ml-1
        text-primary active:text-primary2
        lg:hover:text-primary2 lg:active:text-primary'>
        Login.
        </span>
        </Link>
      </div>


      </form>

    </div>
  )
}

export default SignupComponent