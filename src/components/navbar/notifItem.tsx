import { HydratedDocument } from "mongoose";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";
import { INotifItem } from "~/server/db/models/Notification";
import { api } from "~/utils/api";
import { NotifContext } from "./navbar";


interface INotifProps {
    notif: HydratedDocument<INotifItem>;
}

const NotifItem: FC<INotifProps> = ({notif}) => {

    const {setNotifList, setNotifSelected, setFriendReqSelected, setMobileNotifSelected} = useContext(NotifContext);

    const imgQuery = api.users.getProfileImage.useQuery({uname: notif.source});
    
    const router = useRouter();
    
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
            <img src={imgQuery.data?.img} className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div 
                onClick={() => {
                    setNotifSelected(false);
                    setMobileNotifSelected(false);
                    switch(notif.type) {
                        case "acceptReq":
                            router.push(`/user/${notif.source}`);
                            break;

                        case "comment":
                        case "likeComment":
                        case "likePost":
                        case "likeReplyComment":
                        case "replyToComment":
                            router.push(`/post/${notif.postId}`);
                            break;
                        default:
                            break;
                    }
                }}
                
                className='p-1 cursor-pointer bg-secondary rounded-lg rounded-tl-none h-14 //min-h-full lg:text-sm text-ellipsis overflow-hidden'>
                    {
                    notif &&
                    <>
                    {/* <div>{notif.source}</div>
                    <div>{notif.message}</div> */}
                    <span className="font-medium">
                    {`@${notif.source} `}
                    </span>
                    {/* {!notif.postId && <>Sent you a friend req</>} */}
                    {notif.type === "acceptReq"? 'accepted your friend request':''}
                    {notif.type === "likePost"? 'likes your post':''}
                    {notif.type === "comment"? 'commented on your post':''}
                    {notif.type === "likeComment"? 'likes your comment':''}
                    {notif.type === "replyToComment"? 'replied to your comment':''}
                    {notif.type === "likeReplyComment"? 'likes your reply comment':''}
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