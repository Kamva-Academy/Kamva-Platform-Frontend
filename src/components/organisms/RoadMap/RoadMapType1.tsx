import React, { useEffect, useState } from 'react';
import BaseGraph from './Base';

const GraphType1 = ({ currentNode, links: inputLinks }) => {

  const [finalLinks, setFinalLinks] = useState([]);
  const [finalNodes, setFinalNodes] = useState([]);

  const developGraph = () => {
    const nodes = [...finalNodes];
    const links = [...finalLinks];
    const getY = () => Math.floor(150 * Math.random() - 50)

    let origin = nodes.find(node => node.id === currentNode);
    if (!origin) {
      origin = { id: currentNode, x: 0, y: getY() };
      nodes.push(origin);
    }

    const handleAddingLink = (sourceId, targetId) => {
      let sourceNode = nodes.find(node => node.id === sourceId);
      let targetNode = nodes.find(node => node.id === targetId);

      if (sourceNode && !targetNode) {
        targetNode = { id: targetId, x: sourceNode.x - 100, y: getY() };
        nodes.push(targetNode);
        links.push({
          source: sourceId,
          target: targetId,
        })
      } else if (!sourceNode && targetNode) {
        sourceNode = { id: sourceId, x: targetNode.x + 100, y: getY() };
        nodes.push(sourceNode);
        links.push({
          source: sourceId,
          target: targetId,
        })
      } else if (!sourceNode && !targetNode) {
        // todo: handle nodes
        links.push({
          source: sourceId,
          target: targetId,
        })
      } else if (sourceNode && targetNode) {
        if (!links.find(link => link.source === sourceId && link.target === targetId)) {
          links.push({
            source: sourceId,
            target: targetId,
          })
        }
      }
    }

    inputLinks.forEach((link) => {
      handleAddingLink(link.tail.name, link.head.name);
    })

    setFinalNodes(nodes);
    setFinalLinks(links);
  }

  useEffect(() => {
    developGraph();
  }, [currentNode])

  return (
    <BaseGraph height={200} dragAndDrop={false} currentNode={currentNode} nodes={Array.from(finalNodes)} links={finalLinks} />
  );
};

export default GraphType1;
