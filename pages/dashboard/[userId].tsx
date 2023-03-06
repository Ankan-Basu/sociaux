import React from 'react'
import { useRouter } from 'next/router'
import { FiEdit2, FiEdit3, FiX, FiTrash } from "react-icons/fi";

const details = {
  name: 'Hu Tao',
  uname: 'hu_tao',
  email: 'hutao@gmail.com',
  defPrivacy: 0
}

const privArr = ['public', 'friends', 'only me'];

function Dashboard() {
    const router = useRouter();
    const { userId } = router.query;
  
    return (
    <div 
    className='
    max-w-md
    w-screen
    border-2 border-solid'>

<div><FiX /></div>
      <div>
        <h2 className='text-3xl font-medium'>
          Dashboard: </h2>
      </div>
      
      
      <div >
      <div className='
      relative 
      flex justify-center items-center
      border-2 border-solid'>
        
        <img 
        src='/ayaka.jpg'
        className='
        h-36 w-36 rounded-full
        '
        ></img>
        
        <div 
        className='
        p-3 absolute 
        bottom-2 ml-28
        bg-secondary2 text-primary rounded-full inline-block shadow-lg'
        >
            <FiEdit3 />
            </div>
      </div>
      
      <div className='
      p-4
      flex flex-col gap-3
      '>
      <div className='
      relative
      flex justify-between items-center
      border-2 border-solid'>
      <span>Name: {details.name}</span> 
        <span>
          <FiEdit3 />
        </span>
      </div>
      
      <div className='
      flex justify-between items-center
      border-2 border-solid'>
        <span>Uname: {details.uname}</span> 
        <span>
          <FiEdit3 />
        </span>
        {/* <div className='
        absolute bg-white
        border-2 border-solid 
        p-2 right-2
        rounded-lg
        '>
          You cannot change your username</div> */}
      </div>
      
      <div className='
      flex justify-between items-center
      border-2 border-solid'>
        <span>email: {details.email}</span> 
        <span>
          <FiEdit3 />
        </span>
      </div>

      <div className='
      flex justify-between items-center
      border-2 border-solid'>
      <span>Default privacy: {privArr[details.defPrivacy]} </span>
        <span>
          <FiEdit3 />
        </span>
      </div>

<div>
  <button
  className='
  p-2 rounded-lg
  border-2 border-solid border-primary2 
  bg-primary 
  active:bg-primary2 active:text-white
  lg:hover:bg-primary2 lg:active:bg-primary
  lg:hover:text-white lg:active:text-black
  flex justify-center items-center gap-2
  '>

    <FiTrash />
    Delete Account</button>
</div>
      </div>
      </div>
    
    </div>
  )
}

export default Dashboard