import Link from 'next/link'
import React from 'react'

const AboutMe = () => {
  return (
    <div className='min-h-screen pt-20 pb-20 bg-secondary2 snap-start snap-always'>
      <div className='md:w-700px p-4 lg:p-0 mx-auto'>
      <h1 className='text-4xl font-medium text-primary2'>More About Me</h1>
      <p className='text-gray-700 font-medium pl-2 pt-2 text-justify'>Hi, <br/>
      I am Ankan Basu.
      I am a student of Computer Science and Engineering. <br />
      I like learning new things - technology, science and anything cool.
     I also like learning languages (not just programming ones. But the ones humans speak) and discover new cultures and people.  
    </p>
    
<br />
    <div>
      <h1 className='text-3xl font-medium text-primary2'>Languages I speak</h1>
      <ul className='text-gray-700 pl-2 font-medium pt-2'>
        <li>English</li>
        <li>Bangla</li>
        <li>Hindi</li>
        <li>French</li>
      </ul>
    </div>

<br />
    <div>
      <h1 className='text-3xl font-medium text-primary2'>Contact Me</h1>
      <div className='pl-2 font-medium text-gray-700 pt-2'>
      <p><span className='text-primary2'>Email:</span> <a href="mailto: an.basu.kan@gmail.com">an.basu.kan@gmail.com</a> </p>
      <p><span className='text-primary2'>Whatsapp:</span> +91 8697797274</p>
      </div>
      </div>

      <br />
      <div>
        <h1 className='text-3xl font-medium text-primary2'>Find me on github</h1>
        <div className='pl-2 font-medium text-gray-700 pt-2'><Link href='https://www.github.com/Ankan-Basu' target={'_blank'}>github.com/Ankan-Basu</Link></div>
      </div>
    </div>
    </div>
  )
}

export default AboutMe