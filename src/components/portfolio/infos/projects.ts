const projects = [
  {
    _id: 0,
    name: 'Sociaux',
    ongoing: false,
    title: 'FullStack',
    desc: 'This is a social media application. It allows users to post, comment, share posts, like posts and comments and reply to comments. It also allows users to add friends and share posts with different privacy options.',
    techStack: [
      't3 Stack', 'NextJs', 'React', 'MongoDb', 'tRPC', 'Tailwind', 'Typescript', 'AWS'
    ],
    liveLink: '..',
    gitHubLink: '..',
    certificateLink: undefined,
    LORLink: undefined,
  },
  {
    _id: 1,
    name: 'News App',
    ongoing: false,
    title: 'Frontend',
    desc: 'This is a simple news website which fetches news from an API. It allows users to chose between various categories and displays the corresponding news',
    techStack: [
      'ReactJs', 'Tailwind', 'Javascript'
    ],
    liveLink: '',
    gitHubLink: '..',
    certificateLink: undefined,
    LORLink: undefined
  },
  {
    _id: 2,
    name: 'Network analysis using ERGM',
    ongoing: true,
    title: 'Research (Datascience)',
    desc: 'This project aims to use Exponential Random Graph Models (ERGM) to find the factors that drive employee interaction and workflow in a software development company.',
    techStack: [
      'R (Programming Language)'
    ],
    liveLink: '',
    gitHubLink: '..',
    certificateLink: undefined,
    LORLink: undefined
  },
  {
    _id: 4,
    name: 'Predicting Heat Capacity of Nanofluids',
    ongoing: true,
    title: 'Research (Machine Learning)',
    desc: 'Predicting Heat Capacity of Nanofluids can be a challenging task. This project builds upon previous works and aims to use Machine Learning to predict the heat capacity of nanofluids.',
    techStack: [
      'Python',
    ],
    liveLink: '',
    gitHubLink: '..',
    certificateLink: undefined,
    LORLink: undefined
  },
];

export type projectType = typeof projects[0];
export default projects;