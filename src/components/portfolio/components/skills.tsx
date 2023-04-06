import Image from 'next/image'
import React, { type FC } from 'react'
import tail from '../img/tailwind.svg'
import skills, { type skillType } from '../infos/skills'

interface ISkillsProps {
  type: 'skills' | 'languages'
  arr:  Array<skillType>
}

const Skills: FC<ISkillsProps> = ({type, arr}) => {
  return (
    <div className='md:w-700px mx-auto flex flex-col gap-4'>

      <h1 className='text-4xl'>{type==='skills'?'My Skills':'Progrmming Languages'}</h1>
      <div
      className={`
      border-2 border-solid border-black 
      rounded-lg w-700px m-auto p-2 flex ${type==='skills'?'gap-6':'gap-4'} flex-wrap justify-between
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
    <div className='border-2 border-solid border-green-500 w-20
    flex flex-col justify-center items-center p-1
    '>
    <div className='relative h-16 w-16 border-2 border-solid border-red-500'>
    <Image src={img || tail} alt='logo' fill={true} className='border-2 border-solid border-black' />
    </div>
    <div className='text-sm'>
      {name}
    </div>
    </div>
  );
}

export default Skills