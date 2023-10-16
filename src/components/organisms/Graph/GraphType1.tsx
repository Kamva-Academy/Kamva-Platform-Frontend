import React from 'react';
import BaseGraph from './BaseGraph';

const GraphType1 = ({ currentNode, passedLinks, futureLinks }) => {

  const adaptedLinks = [];
  const nodes = new Set();

  const addNode = (() => {
    let [x, y] = [1000 * Math.random(), 0];
    return (id) => {
      nodes.add({ id, x, y });
      x += 100;
      y = Math.floor(150 * Math.random() - 50);
    }
  })();

  passedLinks.forEach((link) => {
    addNode(link.tail.name);
    adaptedLinks.push({
      source: link.tail.name,
      target: link.head.name,
    })
  })

  addNode(currentNode);

  futureLinks.forEach((link) => {
    addNode(link.head.name);
    adaptedLinks.push({
      source: link.tail.name,
      target: link.head.name,
    })
  });

  return (
    <BaseGraph height={200} dragAndDrop={false} currentNode={currentNode} nodes={Array.from(nodes)} links={adaptedLinks} />
  );
};

export default GraphType1;
