import { FC, useContext } from "react";
import FrenReq from "./friendReq";
import { NotifContext } from "./navbar";
import NotifItem from "./notifItem";

interface INotifMobileProps {
  notifs: Array<Object>; 
  friendReqs: Array<Object>; 
  display: boolean; 
  type: string;
}

const NotifMobile: FC<INotifMobileProps> = ({notifs, friendReqs, display, type}) => {

    const {setNotifList} = useContext(NotifContext);
    const uname = 'kamisato_ayaka'; //change later

    const handleReadAll = async () => {
      const url = `/api/notifs/${uname}`;
  
      const reqBody = {
          notifId: '0'
      }
  
      const resp = await fetch(url, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBody)
      });
  
      if (resp.status === 200) {
          const data = await resp.json();
          console.log(data);
          setNotifList(data.notifs);
      } else {
          //todo
          console.log('err in notif');
      }
  
    }

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
                notifs.map((notif, indx) => {
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