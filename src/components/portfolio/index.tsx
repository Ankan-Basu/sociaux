import React from 'react'
import Banner from './components/banner'
import Skills from './components/skills'
import skills from './infos/skills'
import languages from './infos/lang'
import DetailsBanner from './components/detailsBanner'
import works from './infos/work'
import projects from './infos/projects'

const Portfolio = () => {
  return (
    <div>

      <Banner />
      <Skills arr={skills}/>
      <Skills arr={languages} />

      {
        works.map((work) => {
          return (
            <DetailsBanner key={work._id} data={work}/>
          )
        })
      }

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

export default Portfolio