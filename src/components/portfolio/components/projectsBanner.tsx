import React from 'react'
import projects from '../infos/projects'
import DetailsBanner from './detailsBanner'

const ProjectsBanner = () => {
  return (
    <div className='flex flex-col gap-8'>
      Projects
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