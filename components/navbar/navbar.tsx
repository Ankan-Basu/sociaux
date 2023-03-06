// 'use client'

import React, { useEffect, useState } from 'react'
// import { FaBars, FaUserFriends, FaSearch, FaUserAlt, FaBell } from "react-icons/fa";
import { FiSearch, FiBell, FiUsers, FiMenu, FiX } from "react-icons/fi";
import Notif from './notif';
import NotifScreenMobile from './notifScreenMobile';
import SearchBox from './searchBox';

import { useRouter } from 'next/router';


export default function Navbar() {
    const [notifSelected, setNotifSelected] = useState<boolean>(false)
    const [friendReqSelected, setFriendReqSelected] = useState<boolean>(false)
    const [mobileNotifSelected, setMobileNotifSelected] = useState<boolean>(false)

    const [notifList, setNotifList] = useState<Array<Object>>();

    useEffect(() => {
      console.log('Navbar mounted');
      getNotifList();
    }, []);

    const getNotifList = async () => {
      //todo: make this dynamic
      //after login. store uname in context api.
      //use that uname
      const url = '/api/notifs/kamisato_ayaka';
      console.log('fetching data');

      const resp = await fetch(url);
      
      // console.log(resp);
      const data = await resp.json();
      
      // console.log(data);
      
      if (resp.status === 200) {
        if (!data) {
          setNotifList([]);
          return;
        } else {
          const notifsArr = data.notifs.reverse();
          setNotifList(notifsArr);
          // console.log(notifsArr);
        }
      }
    }

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
        notifs={notifList || []}
        display={notifSelected||friendReqSelected} 
        type={friendReqSelected?'Friend Requests':'Notifications'}/>
    
        <NotifScreenMobile 
        notifs={notifList || []}
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