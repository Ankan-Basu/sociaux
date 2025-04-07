import { TRPCClientError } from '@trpc/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { type FC, useEffect, useState, useContext } from 'react'
import { ErrorContext, type ErrorContextType } from '~/contexts/errorContext';
import { api } from '~/utils/api';

interface IProps {
  profileUname: string;
}

const ButtonTest: FC<IProps> = ({profileUname}) => {
  const [buttonState, setButtonState] = useState<Number>(0);
  const buttonQuery = api.button.getState.useQuery({profileUname});

  const sendFriendReqMutation = api.friends.sendFriendReq.useMutation();
  const unFriendMutation = api.friends.unFriend.useMutation();
  const cancelFriendReqMutation = api.friends.cancelFriendReq.useMutation();
  const acceptFriendReqMutation = api.friends.acceptFriendReq.useMutation();

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

  const session = useSession();

  useEffect(() => {
    if (buttonQuery.isFetched) {
      if (buttonQuery.data?.code) {
        setButtonState(buttonQuery.data?.code)
      }
    }
  }, [buttonQuery])
  

  const handleButtonClick = async (mode: string) => {
    // setButtonState(0)
    // return
    if (session.status !== 'authenticated') {
      setErrorDisplay(true);
      setErrorMessage('You need to login to perform this action');
      setErrorType('simple');
      return;
    }

    const requesterUname = session.data?.user.uname;
    if (!requesterUname) {
      setErrorDisplay(true);
      setErrorMessage('You need to login to perform this action');
      setErrorType('logout');
      return;
    }
    
    try {

      switch(mode) {
        case 'sendReq':
          await sendFriendReqMutation.mutateAsync({requesterUname, targetUname: profileUname});
          setButtonState(0);
          await buttonQuery.refetch();
        break;

        case 'acceptReq':
        await acceptFriendReqMutation.mutateAsync({acceptorUname: requesterUname, targetUname: profileUname});
        setButtonState(0);
        await buttonQuery.refetch();
        break;

      case 'cancelReq':
        await cancelFriendReqMutation.mutateAsync({cancellerUname: requesterUname, targetUname: profileUname});
        setButtonState(0);
        await buttonQuery.refetch();
        break;

      case 'unFriend':
        await unFriendMutation.mutateAsync({unFrienderUname: requesterUname, targetUname: profileUname});
        setButtonState(0);
        await buttonQuery.refetch();
        break;

      default:
        setErrorDisplay(true);
        setErrorMessage('An unknown error occured');
        setErrorType('simple');
        break;
      }
    } catch(err) {
      setErrorDisplay(true);
      let msg = 'An unexpected error occcured';
      if (err instanceof TRPCClientError) {
        msg = err.data.code || msg;
      }
      setErrorMessage(msg);
      setErrorType('simple');
    }
  }

  if (buttonState === 0) {
    
    return (
      <button 
    className="rounded-lg border-2 border-solid border-deactiv bg-deactiv p-1 lg:px-2"
    >
      <span className="text-sm lg:text-base">Loading ...</span>
    </button>
    )
  }

  else if (buttonState === -1) {
    return (
      <button 
    className="rounded-lg border-2 border-solid border-deactiv bg-deactiv p-1 lg:px-2"
    >
      <span className="text-sm lg:text-base">Login</span>
    </button>
    )
  }

  else if (buttonState === -2) {
    return (
      <Link href='/app/dashboard'>
      <button 
    className="rounded-lg border-2 border-solid border-deactiv bg-deactiv p-1 lg:px-2"
    >
      <span className="text-sm lg:text-base">Edit Profile</span>
    </button>
      </Link>
    )
  }

  else if(buttonState === 1) {
    return (
      <button 
      onClick={() => handleButtonClick('sendReq')}
    className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
    >
      <span className="text-sm lg:text-base">Add Friend</span>
    </button>
    )
  }

  else if(buttonState === 2) {
    return (
      <button 
      onClick={() => handleButtonClick('acceptReq')}
    className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
    >
      <span className="text-sm lg:text-base">Accept Request</span>
    </button>
    )
  }

  else if(buttonState === 3) {
    return (

      <button 
      onClick={() => handleButtonClick('cancelReq')}
      className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
      >
      <span className="text-sm lg:text-base">Cancel Request</span>
    </button>
      );
  }

  else if(buttonState === 4) {
    return (

      <button 
      onClick={() => handleButtonClick('unFriend')}
      className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
      >
      <span className="text-sm lg:text-base">Unfriend</span>
    </button>
      );
  }

  else {
    return (
      <>
      Error
      </>
    )
  }
}

export default ButtonTest