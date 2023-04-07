import reactLogo from '../img/react.svg';
import nextLogo from '../img/nextjs.svg';
import gitLogo from '../img/git.svg';
import nodeLogo from '../img/nodejs.svg';
import expressLogo from '../img/express.svg';
import mongoLogo from '../img/mongodb.svg';
import linuxLogo from '../img/linux.svg';
import tfLogo from '../img/tensorflow.svg';
import trpcLogo from '../img/trpc.svg';
import sqlLogo from '../img/sql.svg';
import tailwindLogo from '../img/tailwind.svg';

const skills = [
  {
    _id: 0,
    name: 'React',
    img: reactLogo
  },
  {
    _id: 1,
    name: 'NextJs',
    img: nextLogo
  },
  {
    _id: 2,
    name: 'NodeJs',
    img: nodeLogo
  },
  {
    _id: 3,
    name: 'Express',
    img: expressLogo
  },
  {
    _id: 4,
    name: 'tRPC',
    img: trpcLogo
  },
  {
    _id: 5,
    name: 'MongoDb',
    img: mongoLogo
  },
  {
    _id: 6,
    name: 'Tailwind',
    img: tailwindLogo
  },
  {
    _id: 7,
    name: 'SQL',
    img: sqlLogo
  },{
    _id: 8,
    name: 'Keras',
    img: ''
  },
  {
    _id: 9,
    name: 'Tensorflow',
    img: tfLogo
  },
  {
    _id: 10,
    name: 'Git',
    img: gitLogo
  },
  {
    _id: 11,
    name: 'Linux',
    img: linuxLogo
  },
]

export type skillType = typeof skills[0];
export default skills;