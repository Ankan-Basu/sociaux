// 'use client'

import React, { useState } from 'react'
// import { FaBars, FaUserFriends, FaSearch, FaUserAlt, FaBell } from "react-icons/fa";
import { FiSearch, FiBell, FiUsers, FiMenu, FiX } from "react-icons/fi";


export default function Navbar() {
    const [notifSelected, setNotifSelected] = useState<boolean>(false)
    const [friendReqSelected, setFriendReqSelected] = useState<boolean>(false)
    const [mobileNotifSelected, setMobileNotifSelected] = useState<boolean>(false)

  return (
    <>
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
        className=
        {`${notifSelected?'bg-primary2 text-white':''} 
        hidden lg:inline cursor-pointer rounded-full p-2`}
        >
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
        onClick={() => setMobileNotifSelected(currState => !currState)}
        className={`lg:hidden inline cursor-pointer rounded-full p-2`}>
        <FiMenu />
        </span>

        </span>
        </nav>

        <Notif
        display={notifSelected||friendReqSelected} 
        type={friendReqSelected?'Friend Requests':'Notifications'}/>
    
        <NotifScreenMobile 
        display={notifSelected||friendReqSelected||mobileNotifSelected} 
        type={friendReqSelected?'Friend Requests':'Notifications'}
        notifState={notifSelected}
        notifStateToggler={setNotifSelected}
        friendReqState={friendReqSelected}
        friendReqStateToggler={setFriendReqSelected}
        selfDisplayState={mobileNotifSelected}
        selfDisplayStateToggler={setMobileNotifSelected}
        />
        </>
    
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
    hidden 
    z-30
    ${display?'lg:block':'hidden'} bg-white
     fixed top-14 right-4 w-72 h-100 
     overflow-auto p-2 border-2 rounded-lg 
     shadow-lg`}>
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

function NotifScreenMobile(
  {
    display, 
    type,
    notifState,
    notifStateToggler,
    friendReqState,
    friendReqStateToggler,
    selfDisplayState,
    selfDisplayStateToggler
  }: {
    display: boolean, 
    type: String
    notifState: boolean,
    notifStateToggler: Function,
    friendReqState: boolean,
    friendReqStateToggler: Function,
    selfDisplayState: boolean,
    selfDisplayStateToggler: Function
  }) {
  return (
    <div className={`
    ${display?'block':'hidden'}
    lg:hidden
    z-30 pt-2
    fixed top-0 w-screen h-screen
    bg-white/90
   backdrop-blur-sm
    `}>
      <div className='flex justify-end'>
        <span
        onClick={() => {
          selfDisplayStateToggler(false);
          notifStateToggler(false);
          friendReqStateToggler(false);
        }} 
        className='p-4 pt-2 active:text-primary'
        >
        <FiX />
        </span>
      </div>
      <div className='text-xl font-medium flex justify-evenly px-2'>
        <div 
        className='
        w-1/2
        //border-r-2 //border-b-2 border-solid border-black'
        >
          <span 
          onClick={() => {
            if (friendReqState) {
              friendReqStateToggler(false);
          }
          notifStateToggler((currState: boolean) => !currState)
            }}
          className={`
          active:bg-primary
          ${type!=='Friend Requests'?'bg-primary2 text-white':''}
          flex justify-center items-center 
          w-full h-full py-1
          rounded-lg cursor-pointer
          `}
          >
          Notifications
          </span>
        </div>
        <div 
        className='
        w-1/2
        //border-l-2 //border-b-2 border-solid border-black'
        >
          <span
          onClick={() => {
            if (notifState) {
                notifStateToggler(false);
            }
            friendReqStateToggler((currState: boolean) => !currState)
        }
        }
          className={`
          active:bg-primary
          ${type==='Friend Requests'?'bg-primary2 text-white':''}
          flex justify-center items-center 
          w-full h-full py-1
          rounded-lg cursor-pointer
          `}>
          Friend Requests
          </span>
          </ div>
      </div>
      <NotifMobile type={type} display={display}/>
    </div>
  )
}

function NotifMobile(
  {display, type}: 
  {display: boolean, type: String}
) {
  return (
    <div className={`
    z-30
  //bg-white/60
  //backdrop-blur-sm 
     overflow-auto p-2`}>
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