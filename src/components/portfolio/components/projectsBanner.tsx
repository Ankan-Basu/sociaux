import React from 'react'
import projects from '../infos/projects'
import DetailsBanner from './detailsBanner'

const ProjectsBanner = () => {
  return (
    <div className='flex flex-col gap-8 py-12 md:w-700px mx-auto'>
      <h1 className='text-4xl'>Projects</h1>
      {
        projects.map((project) => {
          return (
            <DetailsBanner key={project._id} data={project}/>
          )
        })
      }
    </div>
  )
}

export default ProjectsBanner