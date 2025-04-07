import { TRPCClientError } from "@trpc/client"
import { type HydratedDocument } from "mongoose"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { type FC, useContext } from "react"
import { ErrorContext, ErrorContextType } from "~/contexts/errorContext"
import { type IFriendReqItemHydrated, NotifContext, type NotifContextType } from "~/contexts/notifContext"
import { type IFriendReqItem } from "~/server/db/models/FriendReq"
import { api } from "~/utils/api"

interface IFrenReqProps {
    friendReq: IFriendReqItemHydrated | HydratedDocument<IFriendReqItem>
}

const FrenReq: FC<IFrenReqProps> = ({ friendReq }) => {

    const session = useSession();
    const router = useRouter();

    const { setFriendReqList, setFriendReqSelected, setMobileNotifSelected } = useContext(NotifContext) as NotifContextType;

    const { setErrorDisplay, setErrorMessage, setErrorType } = useContext(ErrorContext) as ErrorContextType

    const acceptFriendMutation = api.friends.acceptFriendReq.useMutation();
    const rejectFriendMutation = api.friends.rejectFriendReq.useMutation();

    const imgQuery = api.users.getProfileImage.useQuery({ uname: friendReq.source })

    const handleAccept = async (targetUname: string) => {
        if (session.status !== 'authenticated') {
            setErrorDisplay(true);
            setErrorMessage('UNAUTHENTICATED');
            setErrorType('logout');
            return;
        }

        const acceptorUname = session.data.user.uname;
        if (!acceptorUname || !targetUname) {
            setErrorDisplay(true);
            setErrorMessage('BAD_REQUEST');
            setErrorType('simple')
            return;
        }

        try {

            const resp = await acceptFriendMutation.mutateAsync({ acceptorUname, targetUname });

            if (!setFriendReqList) {
                //won't happen
                return;
            }
            setFriendReqList(resp.reqs);
        } catch (err) {
            setErrorDisplay(true);
            let msg = 'An unknown error occured';
            if (err instanceof TRPCClientError) {
                msg = err.data.code;
            }
            setErrorMessage(msg);
            setErrorType('simple');

        }

    }

    const handleReject = async (targetUname: string) => {
        if (session.status !== 'authenticated') {
            setErrorDisplay(true);
            setErrorMessage('UNAUTHENTICATED');
            setErrorType('logout');
            return;
        }

        const rejectorUname = session.data.user.uname;
        if (!rejectorUname || !targetUname) {
            setErrorDisplay(true);
            setErrorMessage('BAD_REQUEST');
            setErrorType('simple')
            return;
        }

        try {

            const resp = await rejectFriendMutation.mutateAsync({ rejectorUname, targetUname });
            if (!setFriendReqList) {
                // won't happen
                return;
            }
            setFriendReqList(resp.reqs)
        } catch (err) {
            setErrorDisplay(true);
            let msg = 'An unknown error occured';
            if (err instanceof TRPCClientError) {
                msg = err.data.code;
            }
            setErrorMessage(msg);
            setErrorType('simple');

        }

    }

    const handleRedirect = () => {
        if (!setFriendReqSelected) {
            // won't happen
            return;
        }
        setFriendReqSelected(false);

        if (!setMobileNotifSelected) {
            // won't happen
            return;
        }
        setMobileNotifSelected(false);
        router.push(`/app/user/${friendReq.source}`)
            .then(() => { }).catch(() => { });
    }


    return (
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <Image
                alt='photo'
                width={100} height={100}
                onClick={handleRedirect}
                src={imgQuery.data?.img || '/avtar.jpg'} className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div
                    onClick={handleRedirect}
                    className='p-1 bg-secondary rounded-lg rounded-tl-none h-14  lg:text-sm text-ellipsis overflow-hidden'>
                    {
                        friendReq &&
                        <>
                            <span className="font-medium">{`@${friendReq.source} `}</span>

                            <span>wants to be your friend.</span>
                        </>
                    }

                </div>
                <div className='flex justify-between pl-1 pr-2'>
                    <span
                        onClick={() => {
                            handleAccept(friendReq.source)
                                .then(() => { }).catch(() => { });
                        }
                        }
                        className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                        Accept</span>
                    <span
                        onClick={() => {
                            handleReject(friendReq.source)
                                .then(() => { }).catch(() => { });
                        }
                        }
                        className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                        Reject</span>
                </div>
            </div>
        </div>
    )
}

export default FrenReq;