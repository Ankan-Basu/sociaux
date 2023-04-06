import React from 'react'
import works from '../infos/work'
import DetailsBanner from './detailsBanner'

const WorksBanner = () => {
  return (
    <div className='flex flex-col gap-8'>
      Work Experience
      {
        works.map((work) => {
          return (
            <DetailsBanner key={work._id} data={work}/>
          )
        })
      }
    </div>
  )
}

export default WorksBanner