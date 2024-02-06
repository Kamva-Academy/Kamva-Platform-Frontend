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
  const nodesYdistance = 100;
  const graph = {};

  const getRandomBoolean = () => Math.random() > 0.5;

  const handleAddingNode = (id: string, x: number, nodes: Node[]) => {
    let y = null;
    if (!graph[x]) {
      y = (getRandomBoolean() ? 1 : -1) * Math.floor(nodesYdistance * Math.random());
      graph[x] = [y];
    } else {
      if (getRandomBoolean()) {
        y = graph[x][0] - nodesYdistance;
        graph[x].unshift(y);
      } else {
        y = graph[x][graph[x].length - 1] + nodesYdistance;
        graph[x].push(y);
      }
    }
    nodes.push({ id, x, y });
  }

  const handleAddingLink = (sourceId: string, targetId: string, nodes: Node[], links: Link[]) => {
    let sourceNode = nodes.find(node => node.id === sourceId);
    let targetNode = nodes.find(node => node.id === targetId);

    if (sourceNode && !targetNode) {
      handleAddingNode(targetId, sourceNode.x - nodesXdistance, nodes);
      links.push({
        source: sourceId,
        target: targetId,
      })
    } else if (!sourceNode && targetNode) {
      handleAddingNode(sourceId, targetNode.x + nodesXdistance, nodes);
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

  const developGraph = (inputLinks: any[]) => {
    const nodes = [];
    const links = [];
    handleAddingNode(firstStateName, 0, nodes);

    let counter = 10_000;
    while (inputLinks.length > 0 && counter--) {
      const link = inputLinks[0];
      let sourceNode = nodes.find(node => node.id === link.source);
      let targetNode = nodes.find(node => node.id === link.target);
      if (!sourceNode && !targetNode) {
        inputLinks.push(inputLinks.shift());
      } else {
        handleAddingLink(link.source, link.target, nodes, links);
        inputLinks.shift();
      }
    }
    return [nodes, links]
  }

  // check weather inputLinks are updated and are not cached in the redux from previous fsm
  if (!inputLinks.find(link => link.source === currentNodeId || link.target === currentNodeId)) {
    return;
  }
  const [nodes, links] = developGraph([...inputLinks]);

  return (
    <BaseGraph height={200} dragAndDrop={false} currentNodeId={currentNodeId} nodes={nodes} links={links} highlighedPath={highlighedPath} />
  );
};

export default GraphType1;
