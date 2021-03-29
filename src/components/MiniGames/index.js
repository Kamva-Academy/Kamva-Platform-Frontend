import React from 'react';

import BoxSimulator from './BoxSimulator';
import CompleteCode from './CompleteCode';
import Experts from './Experts';
import Chart from './PhysicArticle/Chart';
import Graph from './PhysicArticle/Graph';

export const MINI_GAMES = [
  {
    label: 'بازی زندگی کانوی',
    url: 'https://mini-games-sigma.vercel.app/Conways_Game_Of_Life'
  },
  {
    label: 'شبیه‌ساز بازی زندگی',
    url: 'https://mini-games-sigma.vercel.app/Game_Of_Life_Simulation'
  },
  {
    label: 'رفتار جمعی ماهی‌ها',
    url: 'https://mini-games-sigma.vercel.app/Collective_Behavior_Of_Fish'
  },
  {
    label: 'بهینه‌سازی کلونی مورچه‌ها',
    url: 'https://mini-games-sigma.vercel.app/Ant_Colony_Optimization',
  },
  {
    label: 'واکسیناسیون شبکه',
    url: 'https://mini-games-sigma.vercel.app/Network_Vaccination',
  },
  {
    label: 'حساب به نقطه‌ها',
    url: 'https://mini-games-sigma.vercel.app/Account2Points'
  },
  {
    label: 'ترکیبیات ۱',
    url: 'https://mini-games-sigma.vercel.app/tarkibiat/1'
  },
  {
    label: 'ترکیبیات ۲',
    url: 'https://mini-games-sigma.vercel.app/tarkibiat/2'
  },
  {
    label: 'ترکیبیات ۳',
    url: 'https://mini-games-sigma.vercel.app/tarkibiat/3'
  },
  {
    label: 'نظریه بازی ۱',
    url: 'https://mini-games-sigma.vercel.app/Donor_Patient/1'
  },
  {
    label: 'نظریه بازی۲',
    url: 'https://mini-games-sigma.vercel.app/Donor_Patient/2'
  },
  {
    label: 'نظریه بازی ۳',
    url: 'https://mini-games-sigma.vercel.app/Donor_Patient/3'
  },
  {
    label: 'نظریه بازی ۴',
    url: 'https://mini-games-sigma.vercel.app/Donor_Patient/4'
  },
  {
    label: 'اتوماتا',
    url: 'https://mini-games-sigma.vercel.app/Defusing_Bomb'
  },
]

// physic_article_graph: {
//   label: 'گراف مقاله فیزیک',
//   component: Graph,
// },
// physic_article_chart: {
//   label: 'نمودار مقاله فیزیک',
//   component: Chart,
// },
// first_complete_code: {
//   label: 'بازی کامل کردن کد اول',
//   component: CompleteCode,
//   props: { mode: 0 },
// },
// second_complete_code: {
//   label: 'بازی کامل کردن کد دوم',
//   component: CompleteCode,
//   props: { mode: 1 },
// },
// third_complete_code: {
//   label: 'بازی کامل کردن کد سوم',
//   component: CompleteCode,
//   props: { mode: 2 },
// },
// first_box_simulator: {
//   label: 'بازی جعبه‌ها اول',
//   component: BoxSimulator,
//   props: { mode: 0 },
// },
// second_box_simulator: {
//   label: 'بازی جعبه‌ها دوم',
//   component: BoxSimulator,
//   props: { mode: 1 },
// },
// experts: {
//   label: 'بازی خبرگان',
//   component: Experts,
// },

function MiniGames(props) {
  const { gameId } = props.match.params;
  if (!MINI_GAMES[gameId]) {
    return <div></div>;
  }
  const MiniGameComponent = MINI_GAMES[gameId].component;
  return <MiniGameComponent {...MINI_GAMES[gameId].props} />;
}

export default MiniGames;
