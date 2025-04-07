import { useSession } from "next-auth/react";
import { type FC, useContext } from "react";
import { type IFriendReqItemHydrated, type INotifItemHydrated, NotifContext, type NotifContextType } from "~/contexts/notifContext";
import { api } from "~/utils/api";
import FrenReq from "./friendReq";
import NotifItem from "./notifItem";

interface INotifMobileProps {
  notifs: Array<INotifItemHydrated>; 
  friendReqs: Array<IFriendReqItemHydrated>; 
  display: boolean; 
  type: string;
}

const NotifMobile: FC<INotifMobileProps> = ({notifs, friendReqs, display, type}) => {

    const {setNotifList} = useContext(NotifContext) as NotifContextType;

    const readNotifMutation = api.notifs.readNotifs.useMutation();

    const session = useSession();
    // const uname = 'kamisato_ayaka'; //change later

    const handleReadAll = async () => {
      if (session.status !== "authenticated") {
        return;
      }
  
      const uname = session.data.user.uname;
  
      if (!uname) {
        return;
      }
  
      const x = await readNotifMutation.mutateAsync({ uname, notifId: "0" });
  
      if (!setNotifList){
        //won't happen
        return;
      }
      setNotifList(x.notifs);
    };

    return (
      <div className={`
      z-20
    //bg-white/60
    //backdrop-blur-sm 
       overflow-auto p-2
       pb-14`}>
        <h3 className='text-2xl font-medium'>{type}</h3>
        <div className='mb-4'>
          {type==='Notifications'?
          <span 
          onClick={() => {
            handleReadAll()
            .then(()=>{}).catch(()=>{});
          }
          }
          className='cursor-pointer hover:text-primary active:text-primary2'>
              Mark all as read</span>
          :
          <span className='flex justify-between'>
          </span>}
  
        </div>
  
        {
          type==='Notifications'?
          (
            
                notifs &&
                notifs.map((notif: INotifItemHydrated, indx: number, arr: Array<INotifItemHydrated>) => {
                    return (
                        <NotifItem key={indx} notif={arr[arr.length -1 -indx]!}/>
                    )
                })
          
          ):
          (

            friendReqs && 
            friendReqs.map((friendReq: IFriendReqItemHydrated, indx: number, arr: Array<IFriendReqItemHydrated>) => {
                return (
                    <FrenReq key={indx} friendReq={arr[arr.length -1 -indx]!} />
                )
            })
          )
        }
      </div>
    )
  }

  export default NotifMobile;