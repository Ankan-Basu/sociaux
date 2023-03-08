import { useEffect, useContext } from "react";
import FrenReq from "./friendReq";
import { NotifContext } from "./navbar";
import NotifItem from "./notifItem";

interface INotifProps {
  display: boolean;
  type: string
}

export default function Notif(
  {display, type}: INotifProps) {
  // console.log(notifs); 

  // useEffect(() => {
  //   console.log('notif.tsx.\n notifs,', notifs)
  // }, [notifs])

  const {notifList, friendReqList} = useContext(NotifContext);
  
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
                notifList?.map((notif: any, indx: number) => {
                  // console.log(notif);
                  return notif && <NotifItem key={indx} notif={notif} />

                })          
          ):
          (

            friendReqList?.map((friendReq: any, indx: number) => {
              return friendReq && <FrenReq key={indx} friendReq={friendReq} />
            })
              // <>
              // <FrenReq />
              // <FrenReq />
              // <FrenReq />
              // <FrenReq />
              // <FrenReq />
              // <FrenReq />
              // </>
          )
        }
      </div>
    )
  }