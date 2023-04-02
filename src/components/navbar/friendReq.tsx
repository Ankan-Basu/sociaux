import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { FC, useContext } from "react"
import { api } from "~/utils/api"
import { NotifContext } from "./navbar"

interface IFrenReqProps {
    friendReq: {
        source: string
    } | any
}

const FrenReq: FC<IFrenReqProps> = ({friendReq}) => {

    const session = useSession();
    const router = useRouter();

    const {setFriendReqList, setFriendReqSelected, setMobileNotifSelected} = useContext(NotifContext);

    const acceptFriendMutation = api.friends.acceptFriendReq.useMutation();
    const rejectFriendMutation = api.friends.rejectFriendReq.useMutation();

    const imgQuery = api.users.getProfileImage.useQuery({uname: friendReq.source})

    const handleAccept = async (targetUname: string) => {
        if (session.status !== 'authenticated'){
            console.log('UnauThen');
            return;
        }

        const acceptorUname = session.data.user.uname;
        if (!acceptorUname || !targetUname) {
            console.log('BAD REQ');
            return;
        }

        try {

            const resp = await acceptFriendMutation.mutateAsync({acceptorUname, targetUname});
            // console.log(resp);
            setFriendReqList(resp.reqs);
        } catch(err) {
            console.log(err);
            
        }
        
    }

    const handleReject = async (targetUname: string) => {
        if (session.status !== 'authenticated'){
            console.log('UnauThen');
            return;
        }

        const rejectorUname = session.data.user.uname;
        if (!rejectorUname || !targetUname) {
            console.log('BAD REQ');
            return;
        }

        try {

            const resp = await rejectFriendMutation.mutateAsync({rejectorUname, targetUname});
            // console.log(resp);
            setFriendReqList(resp.reqs)
        } catch(err) {
            console.log(err);
            
        }
        
    }

    const handleRedirect = () => {
        setFriendReqSelected(false);
        setMobileNotifSelected(false);
        router.push(`/user/${friendReq.source}`)
    }


    return (
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <img 
            onClick={handleRedirect}
            src={imgQuery.data?.img} className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div 
                onClick={handleRedirect}
                className='p-1 bg-secondary rounded-lg rounded-tl-none h-14  lg:text-sm text-ellipsis overflow-hidden'>
                    {
                        friendReq&&
                        <>
                    <span className="font-medium">{`@${friendReq.source} `}</span>
                    
                    <span>wants to be your friend.</span>
                    </>
                    }
                    
                    </div>
                    <div className='flex justify-between pl-1 pr-2'>
                <span
                onClick={() => handleAccept(friendReq.source)} 
                className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                    Accept</span>
                <span 
                onClick={() => handleReject(friendReq.source)}
                className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                    Reject</span>
                    </div>
            </div>
        </div>
    )
}

export default FrenReq;