import React from 'react'
// import {FaEdit, FaRegSun, FaWrench, FaUserAlt} from 'react-icons/fa';
import { FiEdit, FiSettings, FiLogOut, FiUser } from "react-icons/fi";

export default function PersonalOptions(){
  return (
    <div className='p-1 rounded-lg shadow-lg flex flex-col gap-3'>
        <div className='p-1 flex justify-center gap-1 items-center
        border-2 border-solid border-primary2 rounded-lg cursor-pointer bg-primary hover:bg-primary2 hover:text-white'>
            <FiEdit /><h4>Add Post</h4>
        </div>
        <div className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
            <FiUser /><h4>My Profile</h4>
        </div>
        <div className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
            <FiSettings/>
            <h4>Settings</h4>
        </div>
        <div className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
            <FiLogOut />
            <h4>Logout</h4>
        </div>
    </div>
  )
}
