import React, { FC, useEffect, useState } from 'react';
import BaseGraph from './Base';
import { Link, Node } from 'types/redux/Roadmap';

type GraphType1PropsType = {
  currentNodeId: string;
  links: Link[];
  highlighPath: Link[];
};

const GraphType1: FC<GraphType1PropsType> = ({
  currentNodeId,
  links: inputLinks,
  highlighPath,
}) => {
  const nodesXdistance = 120;
  const nodesYdistance = 200;
  const [finalLinks, setFinalLinks] = useState([]);
  const [finalNodes, setFinalNodes] = useState([]);

  const getY = (initialY) => initialY + Math.floor(nodesYdistance * Math.random() - (nodesYdistance / 2))

  const handleAddingLink = (sourceId: string, targetId: string, nodes: Node[], links: Link[]) => {
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
      throw new Error("invalid state");
    } else if (sourceNode && targetNode) {
      if (!links.find(link => link.source === sourceId && link.target === targetId)) {
        links.push({
          source: sourceId,
          target: targetId,
        })
      }
    }
  }

  const developGraph = () => {
    const nodes = [...finalNodes];
    const links = [...finalLinks];

    let currentNode = nodes.find(node => node.id === currentNodeId);
    if (!currentNode) {
      currentNode = { id: currentNodeId, x: 0, y: getY(0) };
      nodes.push(currentNode);
    }

    const tmpLinks = [...inputLinks];
    while (tmpLinks.length > 0) {
      const link = tmpLinks[0];
      let sourceNode = nodes.find(node => node.id === link.source);
      let targetNode = nodes.find(node => node.id === link.target);

      if (!sourceNode && !targetNode) {
        tmpLinks.push(tmpLinks.shift());
        continue;
      } else {
        handleAddingLink(link.source, link.target, nodes, links);
        tmpLinks.shift();
      }
    }

    setFinalNodes(nodes);
    setFinalLinks(links);
  }
  
  useEffect(() => {
    developGraph();
  }, [inputLinks, highlighPath, currentNodeId])

  return (
    <BaseGraph height={200} dragAndDrop={false} currentNodeId={currentNodeId} nodes={finalNodes} links={finalLinks} />
  );
};

export default GraphType1;
