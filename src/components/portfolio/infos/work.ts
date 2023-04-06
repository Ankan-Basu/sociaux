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
    link: '',
    certificateLink: 'bv',
    LORLink: 'vnn',
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
    link: '',
    liveLink: '',
    gitHubLink: ''
  },
];

export type workType = typeof works[0];
export default works;