import LoginComponent from '~/components/auth/loginComponent'
import React from 'react'
import Blob from '~/components/blob/blob'

function Login() {
  return (
    <div className=''>
      Sociaux
      <Blob additionCss='left-20 md:left-28 lg:left-40 xl:left-52 2xl:left-72'/>
      <div className={`mt-4 left- border-2 border-solid border-red-500`}>
      <LoginComponent />
      </div>
    </div>
  )
}

export default Login