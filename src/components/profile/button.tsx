import { useSession } from 'next-auth/react';
import { bracketSameLine } from 'prettier.config.cjs';
import React, { FC, useEffect, useState } from 'react'
import { string } from 'zod'
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

  const session = useSession();

  useEffect(() => {
    if (buttonQuery.isFetched) {
      if (buttonQuery.data?.code) {
        console.log('SET BUTTON STATE', buttonState);
        
        setButtonState(buttonQuery.data?.code)
      }
    }
  }, [buttonQuery])
  

  const handleButtonClick = async (mode: string) => {
    if (session.status !== 'authenticated') {
      console.log('Unauthenticated');
      return;
    }

    const requesterUname = session.data?.user.uname;
    if (!requesterUname) {
      console.log('Unauth');
      return;
    }

    let resp = undefined;
    switch(mode) {
      case 'sendReq':
        resp = await sendFriendReqMutation.mutateAsync({requesterUname, targetUname: profileUname});
        break;

      case 'acceptReq':
        resp = await acceptFriendReqMutation.mutateAsync({acceptorUname: requesterUname, targetUname: profileUname});
        break;

      case 'cancelReq':
        resp = await cancelFriendReqMutation.mutateAsync({cancellerUname: requesterUname, targetUname: profileUname});
        break;

      case 'unFriend':
        resp = await unFriendMutation.mutateAsync({unFrienderUname: requesterUname, targetUname: profileUname});
        break;

      default:
        console.log('ERROR switch case');
        break;

    }
  }

// if(buttonQuery.isFetching) {
//   return (
//     <button 
//     className="rounded-lg border-2 border-solid border-deactiv bg-deactiv p-1 lg:px-2"
//     >
//       <span className="text-sm lg:text-base">Loading ...</span>
//     </button>
//   )
// }
  // else if (buttonQuery.isFetched) {

    // return (
    //   <>{JSON.stringify(buttonQuery.data)}</>
    // )
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
      <button 
    className="rounded-lg border-2 border-solid border-deactiv bg-deactiv p-1 lg:px-2"
    >
      <span className="text-sm lg:text-base">Literally Me</span>
    </button>
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
    console.log('Error in friend button')
    return (
      <>
      xD
      </>
    )
  }
// }


  
  // return (
  //   <>
  //   {/* <div>{profileUname}</div>
  //   <div>{buttonQuery.data?.toString()}</div> */}
  //   <button 
  //   className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
  //   >
  //     <span className="text-sm lg:text-base">Add Friend</span>
  //   </button>


  //   <button 
  //   className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
  //   >
  //     <span className="text-sm lg:text-base">Unfriend</span>
  //   </button>

  //   <button 
  //   className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
  //   >
  //     <span className="text-sm lg:text-base">Cancel Request</span>
  //   </button>


  //   <button 
  //   className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
  //   >
  //     <span className="text-sm lg:text-base">Accept Request</span>
  //   </button>
  //   </>
  // )
}

export default ButtonTest