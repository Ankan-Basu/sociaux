import Image from 'next/image'
import React, { type FC } from 'react'
import tail from '../img/tailwind.svg'
import skills, { type skillType } from '../infos/skills'

interface ISkillsProps {
  arr:  Array<skillType>
}

const Skills: FC<ISkillsProps> = ({arr}) => {
  return (
    <div>


      <div
      className='
      border-2 border-solid border-black 
      rounded-lg w-700px m-auto p-2 flex gap-2 flex-wrap
      '
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