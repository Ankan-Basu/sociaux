import { HydratedDocument } from "mongoose";
import { useSession } from "next-auth/react";
import { FC, useContext } from "react";
import { INotifItem } from "~/server/db/models/Notification";
import { api } from "~/utils/api";
import FrenReq from "./friendReq";
import { NotifContext } from "./navbar";
import NotifItem from "./notifItem";

interface INotifMobileProps {
  notifs: Array<HydratedDocument<INotifItem>>; 
  friendReqs: Array<Object>; 
  display: boolean; 
  type: string;
}

const NotifMobile: FC<INotifMobileProps> = ({notifs, friendReqs, display, type}) => {

    const {setNotifList} = useContext(NotifContext);

    const readNotifMutation = api.notifs.readNotifs.useMutation();

    const session = useSession();
    // const uname = 'kamisato_ayaka'; //change later

    const handleReadAll = async () => {
      if (session.status !== "authenticated") {
        console.log("UNAUTH");
        return;
      }
  
      const uname = session.data.user.uname;
  
      if (!uname) {
        console.log("UNAUTH");
        return;
      }
  
      const x = await readNotifMutation.mutateAsync({ uname, notifId: "0" });
      // console.log('Notif', x);
  
      setNotifList(x.notifs);
    };

    return (
      <div className={`
      z-30
    //bg-white/60
    //backdrop-blur-sm 
       overflow-auto p-2
       pb-14`}>
        <h3 className='text-2xl font-medium'>{type}</h3>
        <div className='mb-4'>
          {type==='Notifications'?
          <span 
          onClick={handleReadAll}
          className='cursor-pointer hover:text-primary active:text-primary2'>
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
            
                notifs &&
                notifs.map((notif: HydratedDocument<INotifItem>, indx) => {
                    return (
                        <NotifItem key={indx} notif={notif}/>
                    )
                })
          
          ):
          (

            friendReqs && 
            friendReqs.map((friendReq,indx) => {
                return (
                    <FrenReq key={indx} friendReq={friendReq} />
                )
            })
          )
        }
      </div>
    )
  }

  export default NotifMobile;