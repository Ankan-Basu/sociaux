import { HydratedDocument } from "mongoose";
import { useSession } from "next-auth/react";
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

    const readNotifMutation = api.notifs.readNotifs.useMutation();
    
    const router = useRouter();
    const session = useSession();
    
    
    const handleReadNotif = async () => {
        if (session.status !== 'authenticated') {
            console.log('UNAUTH');
            return;
        }

        const uname = session.data.user.uname;

        if (!uname) {
            console.log('UNAUTH');
            return;
        }

        const x = await readNotifMutation.mutateAsync({uname, notifId: notif._id.toString()});
        // console.log('Notif', x);
        
        setNotifList(x.notifs);

    }

    return (
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <img src={imgQuery.data?.img} className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div 
                onClick={() => {
                    handleReadNotif();
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