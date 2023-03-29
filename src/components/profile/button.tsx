import React, { FC, useEffect, useState } from 'react'
import { string } from 'zod'
import { api } from '~/utils/api';

interface IProps {
  profileUname: string;
}

const ButtonTest: FC<IProps> = ({profileUname}) => {
  const [buttonState, setButtonState] = useState<Number>(0);
  const buttonQuery = api.button.getState.useQuery({profileUname});

  useEffect(() => {
    if (buttonQuery.isFetched) {
      if (buttonQuery.data?.code) {
        console.log('SET BUTTON STATE', buttonState);
        
        setButtonState(buttonQuery.data?.code)
      }
    }
  }, [buttonQuery])
  
  useEffect(() => {
    console.log('BUTTON MOUNTS');
    
  }, [])
  console.log('Button Test, query', buttonQuery);

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

  else if(buttonState === 1) {
    return (
      <button 
    className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
    >
      <span className="text-sm lg:text-base">Add Friend</span>
    </button>
    )
  }

  else if(buttonState === 2) {
    return (
      <button 
    className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
    >
      <span className="text-sm lg:text-base">Accept Request</span>
    </button>
    )
  }

  else if(buttonState === 3) {
    return (

      <button 
      className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
      >
      <span className="text-sm lg:text-base">Cancel Request</span>
    </button>
      );
  }

  else if(buttonState === 4) {
    return (

      <button 
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