import React from 'react'
import works from '../infos/work'
import DetailsBanner from './detailsBanner'

const WorksBanner = () => {
  return (
    <div className='flex flex-col gap-8 snap-start py-12 //md:w-700px mx-auto min-h-screen bg-blue-200'>
      <h1 className='text-4xl px-2 md:p-0'>Work Experience</h1>
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