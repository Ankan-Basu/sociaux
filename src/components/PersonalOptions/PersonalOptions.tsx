import { signOut } from 'next-auth/react';
import React, { FC, useState } from 'react'
import { FiEdit, FiSettings, FiLogOut, FiUser, FiX } from "react-icons/fi";
import Modal from '../modal/Modal';

const PersonalOptions: FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div 
    className='hidden sticky z-20 lg:z-0 
    top-0 left-0
    lg:top-16
    bg-white
    w-screen h-screen
    lg:w-60 lg:h-auto
    p-4 lg:p-1 rounded-lg lg:shadow-lg 
    lg:flex flex-col gap-3'
    >
        <div className='lg:hidden flex justify-end p-2 text-lg'>
            <FiX />
        </div>
        <div 
        onClick={()=> setShowModal(currState => !currState)}
        className='
        p-1 flex justify-center gap-1 items-center
        border-2 border-solid border-primary2 rounded-lg cursor-pointer bg-primary hover:bg-primary2 hover:text-white'>
            <FiEdit /><h4>Add Post</h4>
            {/* <Modal display={true} 
            customCss=''
            setShowModal={()=>{}} /> */}
        </div>
        <div className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
            <FiUser /><h4>My Profile</h4>
        </div>
        <div className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
            <FiSettings/>
            <h4>Settings</h4>
        </div>
        <div 
        onClick={() => {
            signOut({
                callbackUrl: '/login'
            })
        }}
        className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
            <FiLogOut />
            <h4>Logout</h4>
        </div>


        <div className={`
        bg-slate-800/80
        fixed
        w-screen h-screen top-0 left-0
        ${!showModal?'hidden':'flex'} justify-center
        items-center
        `}>



            <Modal mode='desktop' display={true} setShowModal={setShowModal} />
        </div>
    </div>
  )
}

export default PersonalOptions;