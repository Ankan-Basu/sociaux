import React, { type FC, useContext } from "react";
import { FiX } from "react-icons/fi";
import { NotifContext, type NotifContextType } from "~/contexts/notifContext";
import NotifMobile from "./notifMobile";

interface INotifScreenMobileProps {
  display: boolean; 
  type: string;
  notifState: boolean;
  notifStateToggler: React.Dispatch<React.SetStateAction<boolean>>;
  friendReqState: boolean;
  friendReqStateToggler: React.Dispatch<React.SetStateAction<boolean>>;
  selfDisplayState: boolean;
  selfDisplayStateToggler: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotifScreenMobile: FC<INotifScreenMobileProps> = (
    {
      display, 
      type,
      notifState,
      notifStateToggler,
      friendReqState,
      friendReqStateToggler,
      selfDisplayState,
      selfDisplayStateToggler
    }) => {


      const {notifList, friendReqList} = useContext(NotifContext) as NotifContextType;
    return (
      <div className={`
      ${display?'block':'hidden'}
      lg:hidden
      z-20 pt-2
      fixed top-0 w-screen h-screen
      bg-white/90
      overflow-auto
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
        <NotifMobile 
        type={type} 
        display={display} 
        notifs={notifList || []} 
        friendReqs={friendReqList || []}/>
      </div>
    )
  }

  export default NotifScreenMobile;