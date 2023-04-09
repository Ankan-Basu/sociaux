import shoptopImg from '../img/shoptop.png'
import tourcirkitImg from '../img/tourcirkit2.webp'

const works = [
  {
    _id: 0,
    name: 'ShopTop',
    ongoing: false,
    title: 'Backend Developper',
    desc: 'It is an online shopping website. I worked as a backend developper in the team',
    techStack: [
      'NodeJs', 'Express', 'MongoDb'
    ],
    img: shoptopImg,
    certificateLink: 'https://drive.google.com/file/d/1yqmMnhf8EbANxrXx19y65Aa6kTefJWHa/view?usp=sharing',
    LORLink: 'https://drive.google.com/file/d/1AUJvrMA8zU2IEmxOGLXcORYOLfgj8sez/view?usp=sharing',
    liveLink: '',
    gitHubLink: ''
  },
  {
    _id: 1,
    name: 'TourCirkit',
    ongoing: true,
    title: 'Fullstack Developper',
    desc: 'This is a group project done under my college professor. It is a travel guide website. It involved scraping sites using puppeteer. I worked mostly on the backend and in few places in the frontend and hosted it on AWS.',
    techStack: [
      'NodeJs', 'Express', 'Puppeteer', 'AWS', 'MongoDb', 'ReactJs'
    ],
    img: tourcirkitImg,
    liveLink: '',
    gitHubLink: ''
  },
];

export type workType = typeof works[0];
export default works;