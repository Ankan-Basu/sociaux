import React from 'react'

const AboutMe = () => {
  return (
    <div className='min-h-screen pt-28 bg-secondary2 snap-start snap-always'>
      <div className='md:w-700px border-2 border-solid border-black mx-auto'>
      <h1 className='text-4xl font-medium'>AboutMe</h1>
      <p>Hi, <br/>
      I am Ankan Basu.
      I am a student of Computer Science and Engineering. <br />
      I like learning new things - technology, science and anything cool.
     I also like learning languages (not just programming ones. But the ones humans speak) and discover new cultures and people.  
    </p>
    
<br />
    <div>
      <h1 className='text-3xl font-medium'>Languages I speak</h1>
      <ul>
        <li>English</li>
        <li>Bangla</li>
        <li>Hindi</li>
        <li>French</li>
      </ul>
    </div>

<br />
    <div>
      <h1 className='text-3xl font-medium'>Contact Me</h1>
      <p>Email: <a href="mailto: an.basu.kan@gmail.com">an.basu.kan@gmail.com</a> </p>
      <p>Whatsapp: +91 8697797274</p>
      </div>
    </div>
    </div>
  )
}

export default AboutMe