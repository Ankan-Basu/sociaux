import newsappImg from '../img/newsapp.webp';
import sociauxImg from '../img/sociaux.png';
import shcImg from '../img/shc.png';
import ergmImg from '../img/ergm.webp';
import eegImg from '../img/eeg.jpg';
import htcImg from '../img/htc2.webp';
import solarEngImg from '../img/solareng.webp';
import deliveryDriverImg from '../img/delivery-driver.webp';

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
    img: sociauxImg,
    liveLink: 'https://sociaux.vercel.app/',
    gitHubLink: 'https://github.com/Ankan-Basu/sociaux',
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
    img: newsappImg,
    liveLink: '',
    gitHubLink: 'https://github.com/Ankan-Basu/news-app-functionbased',
    certificateLink: undefined,
    LORLink: undefined
  },
  {
    _id: 2,
    name: 'Delivery Driver Game',
    ongoing: false,
    title: 'Game Development',
    desc: 'This is a very simple 2D game I created using Unity. It involves driving a car to pickup packages and delivering to drop point.',
    techStack: [
      'Unity', 'C#'
    ],
    img: deliveryDriverImg,
    liveLink: '',
    gitHubLink: '  https://github.com/Ankan-Basu/delivery-driver-2d',
    certificateLink: undefined,
    LORLink: undefined
  },
  {
    _id: 3,
    name: 'Network analysis using ERGM',
    ongoing: false,
    title: 'Research (Datascience)',
    desc: 'This project aims to use Exponential Random Graph Models (ERGM) to find the factors that drive employee interaction and workflow in a software development company.',
    techStack: [
      'R (Programming Language)'
    ],
    img: ergmImg,
    liveLink: '',
    gitHubLink: 'https://github.com/Ankan-Basu/ERGM-project',
    certificateLink: undefined,
    LORLink: undefined
  },
  {
    _id: 4,
    name: 'Predicting HTC',
    ongoing: false,
    title: 'Research (Machine Learning)',
    desc: 'Predicting the Heat Transfer Coefficient (HTC) is crucial in engineering applications, but traditional methods are challenging due to the ill-posed nature of the problem. This work utilises machine learning techniques, such as Bidirectional LSTM-based networks, to accurately predict the HTC.',
    techStack: [
      'Python', 'Keras', 'Tensorflow', 'ScikitLearn'
    ],
    img: htcImg,
    liveLink: 'https://link.springer.com/chapter/10.1007/978-981-97-7296-4_9',
    gitHubLink: 'https://github.com/Ankan-Basu/HTC_Prediction_ML',
    certificateLink: undefined,
    LORLink: undefined
  },
  {
    _id: 5,
    name: 'Predicting Thermo-Physical Properties of Nanofluids',
    ongoing: false,
    title: 'Research (Machine Learning)',
    desc: 'Predicting thermo-physical properties of nanofluids can be a challenging task. This project builds upon previous works and aims to use AI and Machine Learning to predict the thermo-physical properties of nanofluids.',
    techStack: [
      'Python', 'Keras', 'Tensorflow', 'ScikitLearn'
    ],
    img: shcImg,
    liveLink: 'https://iopscience.iop.org/article/10.1088/2631-8695/ad8536',
    gitHubLink: 'https://github.com/Ankan-Basu/Mech-Project',
    certificateLink: undefined,
    LORLink: undefined
  },
  {
    _id: 6,
    name: 'Forecasting Solar Power Output Using ML',
    ongoing: true,
    title: 'Research (Machine Learning)',
    desc: 'This project aims to forecast solar power output based on current weather conditions by using artificial intelligence and ML techniques such as attention based neural networks.',
    techStack: [
      'Python', 'PyTorch', 'ScikitLearn'
    ],
    img: solarEngImg,
    liveLink: '',
    gitHubLink: '',
    certificateLink: undefined,
    LORLink: undefined
  },
  {
    _id: 7,
    name: 'Analysing EEG using ML',
    ongoing: true,
    title: 'Research (Machine Learning)',
    desc: 'EEG analysis is key in neuroscience, emotion recognition, and safety monitoring. This work uses AI and machine learning to support EEG interpretation, aiding in emotion detection, fatigue monitoring, and clinical assessment.',
    techStack: [
      'Python', 'PyTorch', 'ScikitLearn'
    ],
    img: eegImg,
    liveLink: '',
    gitHubLink: '',
    certificateLink: undefined,
    LORLink: undefined
  },
];

export type projectType = typeof projects[0];
export default projects;