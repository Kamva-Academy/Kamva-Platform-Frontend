import React, { useEffect, useState } from 'react';
import BaseGraph from './Base';

const GraphType1 = ({ currentNodeId, links: inputLinks, highlighPath }) => {
  const [finalLinks, setFinalLinks] = useState([]);
  const [finalNodes, setFinalNodes] = useState([]);

  const developGraph = () => {
    const nodesXdistance = 120;
    const nodesYdistance = 200;
    const nodes = [...finalNodes];
    const links = [...finalLinks];

    const getY = (initialY) => initialY + Math.floor(nodesYdistance * Math.random() - (nodesYdistance / 2))

    let currentNode = nodes.find(node => node.id === currentNodeId);
    if (!currentNode) {
      currentNode = { id: currentNodeId, x: 0, y: getY(0) };
      nodes.push(currentNode);
    }

    const handleAddingLink = (sourceId, targetId) => {
      let sourceNode = nodes.find(node => node.id === sourceId);
      let targetNode = nodes.find(node => node.id === targetId);

      if (sourceNode && !targetNode) {
        targetNode = { id: targetId, x: sourceNode.x - nodesXdistance, y: getY(sourceNode.y) };
        nodes.push(targetNode);
        links.push({
          source: sourceId,
          target: targetId,
        })
      } else if (!sourceNode && targetNode) {
        sourceNode = { id: sourceId, x: targetNode.x + nodesXdistance, y: getY(targetNode.y) };
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
  }, [currentNodeId])

  return (
    <BaseGraph height={200} dragAndDrop={false} currentNodeId={currentNodeId} nodes={Array.from(finalNodes)} links={finalLinks} />
  );
};

export default GraphType1;
