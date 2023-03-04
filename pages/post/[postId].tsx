import React from 'react'
import { useRouter } from 'next/router'

function Post() {
    const router = useRouter();
    const { postId } = router.query;

  return (
    <div>postId {postId}</div>
  )
}

export default Post