import { FC, useContext, useEffect } from "react";
import { NotifContext } from "./navbar";

interface INotifProps {
    source: string,
    message: string,
    link: string,
    time: Date,
    isSend: boolean,
    _id: string
}
const NotifItem: FC<INotifProps | any> = ({notif}) => {

    const {setNotifList} = useContext(NotifContext);
    
    
    //change later. after auth
    const uname = 'kamisato_ayaka';
    
    const handleReadNotif = async () => {
        const url = `/api/notifs/${uname}`;

        const reqBody = {
            notifId: notif._id
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
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <img src='ayaka.jpg' className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div className='p-1 bg-secondary rounded-lg rounded-tl-none h-12 text-ellipsis overflow-hidden'>
                    {
                    notif &&
                    <>
                    <div>{notif.source}</div>
                    <div>{notif.message}</div>
                    </>
                    }
                    </div>
                <div
                onClick={handleReadNotif} 
                className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                    Mark as read</div>
            </div>
        </div>
    )
}

export default NotifItem;