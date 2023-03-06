import FrenReq from "./friendReq";
import NotifItem from "./notifItem";

export default function NotifMobile(
    {display, type}: 
    {display: boolean, type: String}
  ) {
    return (
      <div className={`
      z-30
    //bg-white/60
    //backdrop-blur-sm 
       overflow-auto p-2`}>
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
              <>
          <NotifItem />
          <NotifItem />
          <NotifItem />
          <NotifItem />
          <NotifItem />
          <NotifItem />
          <NotifItem />
          <NotifItem />
          <NotifItem />
          <NotifItem />
          </>
          ):
          (
              <>
              <FrenReq />
              <FrenReq />
              <FrenReq />
              <FrenReq />
              <FrenReq />
              <FrenReq />
              </>
          )
        }
      </div>
    )
  }