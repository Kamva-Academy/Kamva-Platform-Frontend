import React from 'react';

import PhysicArticle from './PhysicArticle';

export const MINI_GAMES = {
  physic_article: {
    label: 'بازی مقاله فیزیک',
    component: PhysicArticle,
  },
};

function MiniGames(props) {
  const { gameId } = props.match.params;
  if (!MINI_GAMES[gameId]) {
    return <div></div>;
  }
  const MiniGameComponent = MINI_GAMES[gameId].component;
  return <MiniGameComponent />;
}

export default MiniGames;
