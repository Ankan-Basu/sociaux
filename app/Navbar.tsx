'use client'

import React, { useState } from 'react'
// import { FaBars, FaUserFriends, FaSearch, FaUserAlt, FaBell } from "react-icons/fa";
import { FiSearch, FiBell, FiUsers } from "react-icons/fi";


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
        className={`${notifSelected?'bg-primary2 text-white':''} cursor-pointer rounded-full p-2`}>
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
        className={`${friendReqSelected?'bg-primary2 text-white':''} cursor-pointer rounded-full p-2`}>
        <FiUsers />
        </span>
        {/* <span className='cursor-pointer border-2 border-solid border-red-300 rounded-full p-2'>
        <FaBars />
        </span> */}
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
        <input className='p-1 outline-none bg-secondary2 flex-1 rounded-full rounded-r-none'>
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
    ${display?'block':'hidden'} absolute top-14 right-4 w-72 h-100 overflow-auto p-2 border-2 rounded-lg shadow-lg border-solid border-red-500`}>
      <h3>{type}</h3>
      <div>
        {type==='Notifications'?
        <span>Mark all as read</span>
        :
        <span className='flex justify-between'>
        <span>Accept All</span>
        <span>Reject All</span>    
        </span>}

      </div>
      <NotifItem />
      <NotifItem />
      <NotifItem />
      <NotifItem />
      <NotifItem />
      <NotifItem />
      <NotifItem />
    </div>
  )
}

function NotifItem() {
    return (
        <div className='mb-4 flex border-2 border-solid border-red-300'>
            <div className='w-12 h-12 rounded-full border-2 border-solid border-red-300'>Img</div>
            <div className='flex-1 w-100 rounded-lg rounded-tl-none border-2 border-solid border-red-300'>
                <div className='h-12 text-ellipsis overflow-hidden border-2 border-solid border-black'>
                    Do text clipping
                    </div>
                <div className='text-sm'>Mark as read</div>
            </div>
        </div>
    )
}