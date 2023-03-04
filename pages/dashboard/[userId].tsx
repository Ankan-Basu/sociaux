import React from 'react'
import { useRouter } from 'next/router'

function Dashboard() {
    const router = useRouter();
    const { userId } = router.query;
  return (
    <div>Dashboard {userId}</div>
  )
}

export default Dashboard