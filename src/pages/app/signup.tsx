import SignupComponent from '~/components/auth/signupComponent'
import React from 'react'
import Blob from '~/components/blob/blob'

function signup() {
  return (
    <div className='grid border-2 bordder-solid border-black overflow-hidden'>
      <Blob additionCss='left-28'/>
      <div className=''>
      <SignupComponent />
      </div>
    </div>
  )
}

export default signup