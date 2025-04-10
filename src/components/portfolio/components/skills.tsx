import Image from 'next/image'
import React, { type FC } from 'react'
import Blob from '~/components/blob/blob'
import tail from '../img/tailwind.svg'
import skills, { type skillType } from '../infos/skills'

interface ISkillsProps {
  type: 'skills' | 'languages'
  arr:  Array<skillType>
}

const Skills: FC<ISkillsProps> = ({type, arr}) => {
  return (
    <div className='md:w-700px mx-auto flex flex-col gap-4'>
      <h1 className='text-4xl px-2 md:p-0'>{type==='skills'?'My Skills':'Programming Languages'}</h1>
      <div
      className={`
      border-2 border-solid border-primary2 
      rounded-lg w-10/12 md:w-700px m-auto p-4 flex ${type==='skills'?'gap-4':'gap-4'} flex-wrap justify-center shadow-lg bg-white/60
      `}
      >
        {
          arr &&
          arr.map((skill: skillType) => {
            return (
              <X _id={skill._id} name={skill.name} img={skill.img} />
            );
          })
        }

        {/* <X _id={'skill._id'} name={'tensorfloe'} img={'skill.img'} /> */}
      </div>
    </div>
  )
}


const X: FC<skillType> = ({_id, name, img}) => {
  return (
    <div className=' w-20
    flex flex-col justify-center items-center p-1 gap-2
    '>
    <div className='relative h-12 w-12 md:h-16 md:w-16 bg-white rounded-full'>
    <Image src={img || tail} alt='logo' fill={true} className='' />
    </div>
    <div className='text-sm font-medium'>
      {name}
    </div>
    </div>
  );
}

export default Skills