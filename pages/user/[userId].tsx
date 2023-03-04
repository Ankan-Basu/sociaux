import React from 'react'
import { useRouter } from 'next/router'

export default function UserId() {

    const router = useRouter();
    const { userId}  = router.query

  return (
    <div>UserId {userId} </div>
  )
}

