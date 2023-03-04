// 'use client'

import React, { useState } from 'react'
// import { FaBars, FaUserFriends, FaSearch, FaUserAlt, FaBell } from "react-icons/fa";
import { FiSearch, FiBell, FiUsers, FiMenu } from "react-icons/fi";


export default function Navbar() {
    const [notifSelected, setNotifSelected] = useState<boolean>(false)
    const [friendReqSelected, setFriendReqSelected] = useState<boolean>(false)

  return (
    <nav className='z-10 mb-2 shadow-lg backdrop-blur-md py-2 px-2 flex items-center gap-1 sticky top-0'>
      <span className='flex-1'>Navbar</span>
      <span className='flex-1'><SearchBox /></span>


      <span className='flex-1 flex justify-end gap-4 items-center text-xl text-primary'>
        {/* Login Logout Notification Icons */}

        <span 
        onClick={() => {
            if (friendReqSelected) {
                setFriendReqSelected(false);
            }
            setNotifSelected(currState => !currState)
        }
        }
        className={`${notifSelected?'bg-primary2 text-white':''} hidden lg:inline cursor-pointer rounded-full p-2`}>
        <FiBell />
        </span>
        <span 
        onClick={() => {
            if (notifSelected) {
                setNotifSelected(false);
            }
            setFriendReqSelected(currState => !currState)
        }
        }
        className={`${friendReqSelected?'bg-primary2 text-white':''} hidden lg:inline cursor-pointer rounded-full p-2`}>
        <FiUsers />
        </span>
        {/* <span className='cursor-pointer border-2 border-solid border-red-300 rounded-full p-2'>
        <FaBars />
        </span> */}


      <span 
        className={`lg:hidden inline cursor-pointer rounded-full p-2`}>
        <FiMenu />
        </span>

        </span>

        <Notif
        display={notifSelected||friendReqSelected} 
        type={friendReqSelected?'Friend Requests':'Notifications'}/>
    </nav>
  )
}


function SearchBox() {
  return (
    <div className=' bg-secondary2 rounded-full p-1'>
      <form className='flex items-center'>
        <input className='p-1 w-36 lg:w-auto outline-none bg-secondary2 flex-1 rounded-full rounded-r-none'>
        </input>
        <button type='submit' className='p-1 text-primary rounded-full rounded-l-none'>
          <FiSearch fontSize="1.5em" />
        </button>
      </form>
    </div>
  )
}


function Notif({display, type}: {display: boolean, type: String}) {
  return (
    <div className={`
    ${display?'block':'hidden'} bg-white absolute top-14 right-4 w-72 h-100 overflow-auto p-2 border-2 rounded-lg shadow-lg`}>
      <h3 className='text-2xl font-medium'>{type}</h3>
      <div className='mb-4'>
        {type==='Notifications'?
        <span className='cursor-pointer hover:text-primary active:text-primary2'>
            Mark all as read</span>
        :
        <span className='flex justify-between'>
        <span className='cursor-pointer hover:text-primary active:text-primary2'>
            Accept All</span>
        <span className='cursor-pointer hover:text-primary active:text-primary2'>
            Reject All</span>    
        </span>}

      </div>

      {
        type==='Notifications'?
        (
            <>
        <NotifItem />
        <NotifItem />
        <NotifItem />
        <NotifItem />
        <NotifItem />
        <NotifItem />
        <NotifItem />
        </>
        ):
        (
            <>
            <FrenReq />
            <FrenReq />
            <FrenReq />
            <FrenReq />
            <FrenReq />
            <FrenReq />
            </>
        )
      }
    </div>
  )
}

function NotifItem() {
    return (
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <img src='ayaka.jpg' className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div className='p-1 bg-secondary rounded-lg rounded-tl-none h-12 text-ellipsis overflow-hidden'>
                    Do text clipping
                    </div>
                <div className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>Mark as read</div>
            </div>
        </div>
    )
}

function FrenReq() {
    return (
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <img src='ayaka.jpg' className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div className='p-1 bg-secondary rounded-lg rounded-tl-none h-12 text-ellipsis overflow-hidden'>
                    fren?
                    </div>
                    <div className='flex justify-between pl-1 pr-2'>
                <span className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                    Accept</span>
                <span className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                    Reject</span>
                    </div>
            </div>
        </div>
    )
}