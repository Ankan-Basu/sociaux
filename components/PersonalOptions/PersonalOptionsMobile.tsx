import React, { FC } from 'react'
import { FiEdit, FiSettings, FiLogOut, FiUser, FiX } from "react-icons/fi";
import { signOut } from 'next-auth/react';

interface IPersonalOptionsMobileProps {
    toShow: boolean, 
    toggleToShow: Function,
    setShowModal: Function
};

const PersonalOptionsMobile: FC<IPersonalOptionsMobileProps> = (
    {toShow, toggleToShow, setShowModal}) => {
    
    console.log(toShow);
    
    return (
        <div
        className={`
        ${toShow?'':'hidden'}
        fixed z-20 lg:z-0 
        top-0 left-0
        bg-white
        w-screen h-screen
        p-4 rounded-lg
        flex flex-col gap-3`}
        >
            <div 
            onClick={() => toggleToShow((currState: boolean) => !currState)}
            className='active:text-primary lg:hidden flex justify-end p-2 text-lg'
            >
                <FiX />
            </div>
            <div 
            onClick={() => {
                setShowModal(true);
                toggleToShow(false);
            }}
            className='p-1 flex justify-center gap-1 items-center
            border-2 border-solid border-primary2 rounded-lg cursor-pointer bg-primary hover:bg-primary2 hover:text-white'>
                <FiEdit /><h4>Add Post</h4>

            </div>
            <div className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
                <FiUser /><h4>My Profile</h4>
            </div>
            <div className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
                <FiSettings />
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
        </div>
    )
}

export default PersonalOptionsMobile