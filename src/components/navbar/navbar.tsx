import { type FC, useEffect, useState } from 'react'
import { FiBell, FiUsers, FiMenu } from "react-icons/fi";
import Notif from './notif';
import NotifScreenMobile from './notifScreenMobile';
import SearchBox from './searchBox';

import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import NotifContextProvider, { type IFriendReqItemHydrated, type INotifItemHydrated } from '~/contexts/notifContext';
import { type INotifItem } from '~/server/db/models/Notification';

const Navbar: FC = () => {

  const session = useSession();
  // console.log(session);
  
    const [notifSelected, setNotifSelected] = useState<boolean>(false)
    const [friendReqSelected, setFriendReqSelected] = useState<boolean>(false)
    const [mobileNotifSelected, setMobileNotifSelected] = useState<boolean>(false)

    const [notifList, setNotifList] = useState< Array<INotifItemHydrated | INotifItem>>();
    const [friendReqList, setFriendReqList] = useState<Array<IFriendReqItemHydrated>>();

    const notifQuery = api.notifs.getNotifs.useQuery({uname: `${session.data?.user.uname || ''}`});
    const friendReqQuery = api.friends.getFriendReqList.useQuery({uname: `${session.data?.user.uname || ''}`});

    useEffect(() => {
      console.log('Navbar mounted');
      // getNotifList();
      // getFriendReqList();
    }, []);

    useEffect(() => {
      if (session.status === 'authenticated') {
        (async () => {
          const notifData = await notifQuery.refetch();
          setNotifList(notifData.data?.notifs)
        })()
        .then(()=>{}).catch(()=>{});

        (async () => {
          const friendReqData = await friendReqQuery.refetch();
          setFriendReqList(friendReqData.data?.reqs)
        })()
        .then(()=>{}).catch(()=>{});
        
      }
    }, [session])

    useEffect(() => {
      if (notifSelected || mobileNotifSelected) {
        if (session.status === 'authenticated') {
          (async () => {
            const notifData = await notifQuery.refetch();
            setNotifList(notifData.data?.notifs)
          })()
          .then(()=>{}).catch(()=>{});
        }
      }

    }, [notifSelected, mobileNotifSelected])

    useEffect(() => {
      if (friendReqSelected || mobileNotifSelected) {
        if (session.status === 'authenticated') {
          (async () => {
            const friendReqData = await friendReqQuery.refetch();
            setFriendReqList(friendReqData.data?.reqs)
          })()
          .then(()=>{}).catch(()=>{});
        }
      }
    }, [friendReqSelected, mobileNotifSelected])
    
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


        <NotifContextProvider additionVals={{
          notifList, setNotifList,
          friendReqList, setFriendReqList,
          notifSelected, setNotifSelected,
          friendReqSelected, setFriendReqSelected,
          mobileNotifSelected, setMobileNotifSelected
        }}>

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
</NotifContextProvider>
        </>
    
  )
}

export default Navbar;