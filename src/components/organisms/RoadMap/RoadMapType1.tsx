import React, { FC, useEffect, useState } from 'react';
import BaseGraph from './Base';
import { Link, Node } from 'types/redux/Roadmap';

type GraphType1PropsType = {
  currentNodeId: string;
  links: Link[];
  highlighedPath: Link[];
  firstStateName: string;
};

const GraphType1: FC<GraphType1PropsType> = ({
  currentNodeId,
  links: inputLinks,
  highlighedPath,
  firstStateName,
}) => {
  const nodesXdistance = 120;
  const nodesYdistance = 200;

  const nodes = [];
  const links = [];

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
    // check weather inputLinks are updated and are not cached in the redux from previous fsm
    if (!inputLinks.find(link => link.source === currentNodeId || link.target === currentNodeId)) {
      return;
    }

    let firstNode = nodes.find(node => node.id === firstStateName);

    if (!firstNode) {
      firstNode = { id: firstStateName, x: 0, y: getY(0) };
      nodes.push(firstNode);
    }

    const inputLinksCopy = [...inputLinks];

    let counter = 10_000;
    while (inputLinksCopy.length > 0 && counter--) {
      const link = inputLinksCopy[0];
      let sourceNode = nodes.find(node => node.id === link.source);
      let targetNode = nodes.find(node => node.id === link.target);
      if (!sourceNode && !targetNode) {
        inputLinksCopy.push(inputLinksCopy.shift());
      } else {
        handleAddingLink(link.source, link.target, nodes, links);
        inputLinksCopy.shift();
      }
    }
  }

  developGraph();

  return (
    <BaseGraph height={200} dragAndDrop={false} currentNodeId={currentNodeId} nodes={nodes} links={links} highlighedPath={highlighedPath} />
  );
};

export default GraphType1;
