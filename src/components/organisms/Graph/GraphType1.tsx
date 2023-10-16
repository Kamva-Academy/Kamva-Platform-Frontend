import React, { useEffect, useState } from 'react';
import BaseGraph from './BaseGraph';

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


const GraphType1 = () => {

  return (
    <>
      <BaseGraph tragAndDrop={false} currentNodeId={'علی'} nodes={_nodes} links={_links} />
    </>
  );
};

export default GraphType1;
