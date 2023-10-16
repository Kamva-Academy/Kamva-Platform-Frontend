import React from 'react';
import GraphType1 from './GraphType1';
import GraphType2 from './GraphType2';

const _nodes = [
  { id: "علی", color: '#80ff2b', x: 0, y: 400 },
  { id: "محمد", x: 100, y: 400 },
  { id: "رضا", x: 200, y: 400 },
  { id: "حسن", x: 300, y: 400 },
  { id: "تقی", x: 400, y: 400 },
  { id: "میرزا", x: 500, y: 400 },
];

const _links = [
  { source: "علی", target: "محمد" },
  { source: "علی", target: "رضا" },
  { source: "رضا", target: "تقی" },
  { source: "میرزا", target: "حسن" },
];

const GraphPage = () => {

  return (
    <>
      {/* <GraphType2 /> */}
    </>
  );
};

export default GraphPage;
