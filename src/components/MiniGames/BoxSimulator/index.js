import React from 'react';

import Simulator from './Simulator';

function BoxSimulator({ mode }) {
  if (mode === 0)
    return (
      <Simulator
        config={[
          {
            initItems: [4, 7, 3, 12, 1, 10, 5, 20],
            answer: { optimum: 21 },
          },
        ]}
      />
    );
  return (
    <Simulator
      isOnline
      config={[
        {
          initItems: [4, 1, 5, 3, 8, 3, 7, 4, 7, 5, 2, 9],
          answer: { optimum: 18 },
        },
        {
          initItems: [5, 1, 1, 40, 3, 2, 3, 50, 1, 100],
          answer: { optimum: 100 },
        },
        {
          initItems: [4, 7, 3, 12, 1, 10, 5, 20],
          answer: { optimum: 21 },
        },
      ]}
    />
  );
}

export default BoxSimulator;
