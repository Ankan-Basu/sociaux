import { useEffect, useContext, FC } from "react";
import FrenReq from "./friendReq";
import { NotifContext } from "./navbar";
import NotifItem from "./notifItem";

interface INotifProps {
  display: boolean;
  type: string
}

const Notif: FC<INotifProps> = ({display, type}) => {
  // console.log(notifs); 

  // useEffect(() => {
  //   console.log('notif.tsx.\n notifs,', notifs)
  // }, [notifs])

  const {notifList, friendReqList, setNotifList} = useContext(NotifContext);
  // console.log(notifList);
  
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
      hidden 
      z-30
      ${display?'lg:block':'hidden'} bg-white
       fixed top-14 right-4 w-72 h-100 
       overflow-auto p-2 border-2 rounded-lg 
       shadow-lg`}>
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
            notifList &&
                notifList.map((notif: any, indx: number) => {
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

  export default Notif;