import { useSession } from "next-auth/react"
import { FC } from "react"
import { api } from "~/utils/api"

interface IFrenReqProps {
    friendReq: {
        source: string
    } | any
}

const FrenReq: FC<IFrenReqProps> = ({friendReq}) => {

    const session = useSession();

    const acceptFriendMutation = api.friends.acceptFriendReq.useMutation();
    const rejectFriendMutation = api.friends.rejectFriendReq.useMutation();

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

        const resp = await acceptFriendMutation.mutateAsync({acceptorUname, targetUname});
        console.log(resp);
        
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

        const resp = await rejectFriendMutation.mutateAsync({rejectorUname, targetUname});
        console.log(resp);
        
    }
    return (
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <img src='ayaka.jpg' className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div className='p-1 bg-secondary rounded-lg rounded-tl-none h-12 text-ellipsis overflow-hidden'>
                    {

                        friendReq&&
                    <div>{friendReq.source}</div>
                    }
                    
                    <div>fren?</div>
                    
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