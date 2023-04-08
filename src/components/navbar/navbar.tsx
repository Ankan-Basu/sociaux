import { type FC, useEffect, useState } from 'react'
import { FiBell, FiUsers, FiMenu } from "react-icons/fi";
import Notif from './notif';
import NotifScreenMobile from './notifScreenMobile';
import SearchBox from './searchBox';

import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import NotifContextProvider, { type IFriendReqItemHydrated, type INotifItemHydrated } from '~/contexts/notifContext';
import { type INotifItem } from '~/server/db/models/Notification';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: FC = () => {
  const session = useSession();
  
    const [notifSelected, setNotifSelected] = useState<boolean>(false)
    const [friendReqSelected, setFriendReqSelected] = useState<boolean>(false)
    const [mobileNotifSelected, setMobileNotifSelected] = useState<boolean>(false)

    const [notifList, setNotifList] = useState< Array<INotifItemHydrated | INotifItem>>();
    const [friendReqList, setFriendReqList] = useState<Array<IFriendReqItemHydrated>>();

    const notifQuery = api.notifs.getNotifs.useQuery({uname: `${session.data?.user.uname || ''}`});
    const friendReqQuery = api.friends.getFriendReqList.useQuery({uname: `${session.data?.user.uname || ''}`});


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

    const router = useRouter();
    // console.log(router);

    const [showNavbar, setShowNavbar] = useState<boolean>(false);
    
    useEffect(() => {
      if (router.pathname.startsWith('/app/')) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    }, [router])


    // useEffect(() => {
    //   console.log('Navbar MOUNTS');

    //   return () => {
    //     console.log('Navbar Unmounts');
        
    //   }
    // }, [])
    
  return (
    <>
    <nav className={`mb-2 shadow-lg backdrop-blur-md py-2 px-2 flex items-center gap-1 sticky top-0
    ${showNavbar?'block':'hidden'} z-10
    `}>
      <div className='flex-1 relative'>
        <Link href='/app/feed'>
        <div className='w-10 h-10 relative rounded full'>
        <Image src={'/logo.svg'} alt='logo' fill={true} className='rounded-full'/>
        </div>
        </Link>
      </div>
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