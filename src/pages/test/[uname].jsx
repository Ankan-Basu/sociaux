import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function test() {
  const router = useRouter();
    const { uname}  = router.query

    useEffect(() => {
      getNotif();
    }, [router]);

    const getNotif = async () => {
      const url = `/api/notifs/${uname}`;

      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
    }
  return (
    <div>test</div>
  )
}

export default test