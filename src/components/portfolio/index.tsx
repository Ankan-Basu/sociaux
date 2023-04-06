import React from 'react'
import Banner from './components/banner'
import Skills from './components/skills'
import skills from './infos/skills'
import languages from './infos/lang'
import DetailsBanner from './components/detailsBanner'

const Portfolio = () => {
  return (
    <div>

      <Banner />
      <Skills arr={skills}/>
      <Skills arr={languages} />
      <DetailsBanner />
    </div>
  )
}

export default Portfolio