import { useContext } from "react";
import { FiX } from "react-icons/fi";
import { NotifContext } from "./navbar";
import NotifMobile from "./notifMobile";

interface INotifScreenMobileProps {
  display: boolean; 
  type: String;
  notifState: boolean;
  notifStateToggler: Function;
  friendReqState: boolean;
  friendReqStateToggler: Function;
  selfDisplayState: boolean;
  selfDisplayStateToggler: Function
};

export default function NotifScreenMobile(
    {
      display, 
      type,
      notifState,
      notifStateToggler,
      friendReqState,
      friendReqStateToggler,
      selfDisplayState,
      selfDisplayStateToggler
    }: INotifScreenMobileProps) {


      const {notifList, friendReqList} = useContext(NotifContext);
    return (
      <div className={`
      ${display?'block':'hidden'}
      lg:hidden
      z-30 pt-2
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
        notifs={notifList} 
        friendReqs={friendReqList}/>
      </div>
    )
  }