import React, { FC } from 'react'
import { string } from 'zod'
import { api } from '~/utils/api';

interface IProps {
  profileUname: string;
}

const ButtonTest: FC<IProps> = ({profileUname}) => {
  const buttonQuery = api.button.getState.useQuery({profileUname});
  
  // console.log(buttonQuery);
  
  return (
    <div>{profileUname}</div>
  )
}

export default ButtonTest