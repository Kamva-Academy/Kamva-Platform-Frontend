import React, { useEffect, useState } from 'react';
import GraphMapBase from './Base';

const _nodes = [
  { id: "علی", color: '#80ff2b' },
  { id: "محمد" },
  { id: "رضا" },
  { id: "حسن" },
  { id: "تقی" },
  { id: "میرزا" },
];

const _links = [
  { source: "علی", target: "محمد" },
  { source: "علی", target: "رضا" },
  { source: "رضا", target: "تقی" },
  { source: "میرزا", target: "حسن" },
];


const GraphType2 = () => {

  return (
    <>
      <GraphMapBase dragAndDrop={true} currentNodeId={'علی'} nodes={_nodes} links={_links} />
    </>
  );
};

export default GraphType2;
