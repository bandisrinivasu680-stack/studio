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
