export type App = {
  id: string;
  name: string;
  developer: string;
  iconUrl: string;
  rating: number;
  reviewsCount: number;
  size: string;
  downloads: string;
  category: string;
  description: string;
  featureGraphicUrl: string;
  screenshots: string[];
};

export const apps: App[] = [
  {
    id: '1',
    name: 'TaskMaster Pro',
    developer: 'Productivity Inc.',
    iconUrl: 'https://picsum.photos/seed/app1/256/256',
    rating: 4.8,
    reviewsCount: 12500,
    size: '25 MB',
    downloads: '1M+',
    category: 'Productivity',
    description:
      'Organize your life and boost your productivity with TaskMaster Pro. Manage tasks, set reminders, and collaborate with teams seamlessly. Features a clean interface and powerful tools to help you stay on top of your work.',
    featureGraphicUrl: 'https://picsum.photos/seed/feature1/1024/500',
    screenshots: [
      'https://picsum.photos/seed/ss1/270/480',
      'https://picsum.photos/seed/ss2/270/480',
      'https://picsum.photos/seed/ss3/270/480',
    ],
  },
  {
    id: '2',
    name: 'ConnectSphere',
    developer: 'SocialNerds',
    iconUrl: 'https://picsum.photos/seed/app2/256/256',
    rating: 4.5,
    reviewsCount: 500000,
    size: '50 MB',
    downloads: '50M+',
    category: 'Social',
    description:
      'Connect with friends and the world around you on ConnectSphere. Share updates, photos, and videos. Discover new communities and stay in touch with what matters most.',
    featureGraphicUrl: 'https://picsum.photos/seed/feature2/1024/500',
    screenshots: [
      'https://picsum.photos/seed/ss4/270/480',
      'https://picsum.photos/seed/ss5/270/480',
      'https://picsum.photos/seed/ss6/270/480',
    ],
  },
  {
    id: '3',
    name: 'Galaxy Warriors',
    developer: 'PixelStorm Games',
    iconUrl: 'https://picsum.photos/seed/app3/256/256',
    rating: 4.7,
    reviewsCount: 250000,
    size: '150 MB',
    downloads: '10M+',
    category: 'Games',
    description:
      'Embark on an epic space adventure in Galaxy Warriors. Battle alien fleets, upgrade your starship, and conquer the galaxy in this thrilling action-packed game. Stunning graphics and immersive gameplay await.',
    featureGraphicUrl: 'https://picsum.photos/seed/feature3/1024/500',
    screenshots: [
      'https://picsum.photos/seed/ss7/270/480',
      'https://picsum.photos/seed/ss8/270/480',
      'https://picsum.photos/seed/ss9/270/480',
    ],
  },
  {
    id: '4',
    name: 'FinTrack',
    developer: 'MoneyWise',
    iconUrl: 'https://picsum.photos/seed/app4/256/256',
    rating: 4.9,
    reviewsCount: 80000,
    size: '30 MB',
    downloads: '5M+',
    category: 'Finance',
    description:
      'Take control of your finances with FinTrack. Track your expenses, create budgets, and view insightful reports to achieve your financial goals. Secure, intuitive, and powerful.',
    featureGraphicUrl: 'https://picsum.photos/seed/feature4/1024/500',
    screenshots: [
      'https://picsum.photos/seed/ss10/270/480',
      'https://picsum.photos/seed/ss11/270/480',
      'https://picsum.photos/seed/ss12/270/480',
    ],
  },
  {
    id: '5',
    name: 'HeartBeat',
    developer: 'Wellness Tech',
    iconUrl: 'https://picsum.photos/seed/app5/256/256',
    rating: 4.6,
    reviewsCount: 45000,
    size: '40 MB',
    downloads: '1M+',
    category: 'Health & Fitness',
    description:
      'Your personal health companion. Monitor your workouts, track your diet, and get personalized fitness plans with HeartBeat. Integrate with your favorite wearables for a complete health overview.',
    featureGraphicUrl: 'https://picsum.photos/seed/feature5/1024/500',
    screenshots: [
      'https://picsum.photos/seed/ss13/270/480',
      'https://picsum.photos/seed/ss14/270/480',
      'https://picsum.photos/seed/ss15/270/480',
    ],
  },
  {
    id: '6',
    name: 'Learniverse',
    developer: 'EduVentures',
    iconUrl: 'https://picsum.photos/seed/app6/256/256',
    rating: 4.8,
    reviewsCount: 95000,
    size: '60 MB',
    downloads: '10M+',
    category: 'Education',
    description:
      'Unlock a universe of knowledge with Learniverse. Access thousands of courses on any subject, from programming to photography. Learn from experts and join a community of learners.',
    featureGraphicUrl: 'https://picsum.photos/seed/feature6/1024/500',
    screenshots: [
      'https://picsum.photos/seed/ss16/270/480',
      'https://picsum.photos/seed/ss17/270/480',
      'https://picsum.photos/seed/ss18/270/480',
    ],
  },
   {
    id: '7',
    name: 'SoundWave',
    developer: 'AudioPhonic',
    iconUrl: 'https://picsum.photos/seed/app7/256/256',
    rating: 4.7,
    reviewsCount: 300000,
    size: '55 MB',
    downloads: '20M+',
    category: 'Music & Audio',
    description: 'Immerse yourself in music with SoundWave. Stream millions of songs, create playlists, and discover new artists. High-fidelity audio and personalized recommendations.',
    featureGraphicUrl: 'https://picsum.photos/seed/feature7/1024/500',
    screenshots: [
      'https://picsum.photos/seed/ss19/270/480',
      'https://picsum.photos/seed/ss20/270/480',
      'https://picsum.photos/seed/ss21/270/480',
    ],
  },
  {
    id: '8',
    name: 'Wanderlust',
    developer: 'GoGlobal',
    iconUrl: 'https://picsum.photos/seed/app8/256/256',
    rating: 4.6,
    reviewsCount: 120000,
    size: '70 MB',
    downloads: '5M+',
    category: 'Travel & Local',
    description: 'Plan your perfect trip with Wanderlust. Find cheap flights, book hotels, and discover local attractions. Your ultimate travel planner and guide.',
    featureGraphicUrl: 'https://picsum.photos/seed/feature8/1024/500',
    screenshots: [
      'https://picsum.photos/seed/ss22/270/480',
      'https://picsum.photos/seed/ss23/270/480',
      'https://picsum.photos/seed/ss24/270/480',
    ],
  },
];

export const categories = [
  'Productivity',
  'Social',
  'Games',
  'Finance',
  'Health & Fitness',
  'Education',
  'Music & Audio',
  'Travel & Local',
  'Books & Reference'
];

export const trendingSearches = [
  'photo editor',
  'vpn',
  'racing games',
  'music player',
  'file manager'
];
