import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { FiAtSign, FiEyeOff, FiEye, FiLogIn } from "react-icons/fi";
import Post from '../posts/Post';
import InputDataType from '../util/InputDataType';
import inputValidator from '../util/inputValidator';
import ValidatedOutput from '../util/ValidatedOutput';

function LoginComponent() {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [unameEmail, setUnameEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const[inpInvalid, setInpInvalid] = useState<boolean>(false);
  const[passwordInvalid, setPasswordInvalid] = useState<boolean>(false);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const obj: InputDataType = {
      email: unameEmail,
      uname: unameEmail,
      password: password
    }

    const resObj: ValidatedOutput = inputValidator(obj);

    if (!resObj.uname && !resObj.email) {
      setInpInvalid(true);
      return
    }
    if (!resObj.password) {
      setPasswordInvalid(true);
      true;
    }

    const obj2 = {uname:'', email:'', password}
    if (resObj.uname) {
      obj2.uname = unameEmail;
    } if (resObj.email) {
      obj2.email = unameEmail;
    }

    console.log(obj2);
  }

  return (
    <div className='
    w-5/6 m-auto p-2
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
      onSubmit={handleLoginSubmit}
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
          setUnameEmail(e.target.value)
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
          setPassword(e.target.value)
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
      
      <div>
        Don't have an account? 
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