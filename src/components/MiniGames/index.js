import React from 'react';

import Chart from './PhysicArticle/Chart';
import Graph from './PhysicArticle/Graph';

export const MINI_GAMES = {
  physic_article_graph: {
    label: 'گراف مقاله فیزیک',
    component: Graph,
  },
  physic_article_chart: {
    label: 'نمودار مقاله فیزیک',
    component: Chart,
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
