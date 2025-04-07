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
import kerasLogo from '../img/keras.svg';
import sklearnLogo from '../img/sklearn.svg';
import angularLogo from '../img/angular.svg';
import dotNetCoreLogo from '../img/dot-net-core.svg';
import pyTorchLogo from '../img/pytorch.svg';
import unityLogo from '../img/unity.svg'

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
    name: 'Angular',
    img: angularLogo
  },
  {
    _id: 5,
    name: 'ASP .NET',
    img: dotNetCoreLogo
  },
  {
    _id: 6,
    name: 'tRPC',
    img: trpcLogo
  },
  {
    _id: 7,
    name: 'MongoDb',
    img: mongoLogo
  },
  {
    _id: 8,
    name: 'Tailwind',
    img: tailwindLogo
  },
  {
    _id: 9,
    name: 'SQL',
    img: sqlLogo
  },{
    _id: 10,
    name: 'Keras',
    img: kerasLogo
  },
  {
    _id: 11,
    name: 'Tensorflow',
    img: tfLogo
  },
  {
    _id: 12,
    name: 'ScikitLearn',
    img: sklearnLogo
  },
  {
    _id: 13,
    name: 'PyTorch',
    img: pyTorchLogo
  },
  {
    _id: 14,
    name: 'Git',
    img: gitLogo
  },
  {
    _id: 15,
    name: 'Linux',
    img: linuxLogo
  },
  {
    _id: 16,
    name: 'Unity',
    img: unityLogo
  }
]

export type skillType = typeof skills[0];
export default skills;