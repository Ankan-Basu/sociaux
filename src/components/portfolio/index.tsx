import React from 'react'
import Banner from './components/banner'
import Skills from './components/skills'
import skills from './infos/skills'
import languages from './infos/lang'
import DetailsBanner from './components/detailsBanner'
import works from './infos/work'
import projects from './infos/projects'
import WorksBanner from './components/worksBanner'
import ProjectsBanner from './components/projectsBanner'
import AboutMe from './components/aboutMe'

const Portfolio = () => {
  return (
    <div className='snap-y snap-mandatory h-screen overflow-y-scroll //overflow-x-hidden'>

      <Banner />

      <div className='flex flex-col justify-center gap-12 min-h-screen snap-start py-12'>
      <Skills type='skills' arr={skills}/>
      {/* <Skills type='languages' arr={languages} /> */}
      </div>

      <div className='flex flex-col justify-center gap-12 min-h-screen snap-start py-12'>
      {/* <Skills type='skills' arr={skills}/> */}
      <Skills type='languages' arr={languages} />
      </div>
      

      <WorksBanner />
      <ProjectsBanner />

      <AboutMe />
    </div>
  )
}

export default Portfolio