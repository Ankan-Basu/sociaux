import React from 'react'
import Blob from '~/components/blob/blob'
import projects from '../infos/projects'
import DetailsBanner from './detailsBanner'

const ProjectsBanner = () => {
  return (
    <div className='flex flex-col gap-8 snap-start py-16 md:w-700px mx-auto min-h-screen /bg-red-200'>
      {/* <Blob /> */}
      <h1 className='text-4xl px-2 md:p-0'>Projects</h1>
      {
        projects.map((project, indx) => {
          return (
            <DetailsBanner key={project._id} data={project}/>
          )
        })
      }
    </div>
  )
}

export default ProjectsBanner