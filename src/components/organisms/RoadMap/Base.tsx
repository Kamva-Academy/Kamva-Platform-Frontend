import { Box, IconButton } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Graph } from "react-d3-graph";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Link, Node } from 'types/redux/Roadmap';

type GraphMapBasePropsType = {
  currentNodeId: string;
  nodes: Node[];
  links: Link[];
  dragAndDrop: any;
  height?: number;
  highlighedPath?: Link[];
};

const GraphMapBase: FC<GraphMapBasePropsType> = ({
  currentNodeId,
  nodes,
  links,
  dragAndDrop,
  height = 400,
  highlighedPath = [],
}) => {
  const highlightGreenColor = '#80ff2b';
  const highlightBlueColor = '#00b4e0';
  const boxRef = useRef(null);
  const graphRef = useRef(null);
  const [focused, setFocused] = useState(null);
  const [width, setWidth] = useState(null);

  const goToCurrentNode = (delay = 100) => {
    setFocused(null);
    setTimeout(() => {
      setFocused(currentNodeId)
    }, delay)
    setTimeout(() => {
      setFocused(null)
    }, 2 * delay)
  }

  const handleBoxResize = () => {
    if (boxRef.current) {
      setWidth(boxRef.current.clientWidth);
    }
  }

  // make previous path highlighted:
  highlighedPath.forEach(pathLink => {
    const linkSourceNode = nodes.find(node => node.id === pathLink.source);
    if (linkSourceNode) linkSourceNode['color'] = highlightGreenColor;
    const linkTargetNode = nodes.find(node => node.id === pathLink.target);
    if (linkTargetNode) linkTargetNode['color'] = highlightGreenColor;
    const link = links.find(link => link.source === pathLink.source && link.target === pathLink.target);
    if (link) link['color'] = highlightGreenColor;
  });

  // make current node green:
  nodes = nodes.map(node => {
    if (node.id === currentNodeId) {
      return {
        ...node,
        color: highlightGreenColor,
      }
    }
    return node;
  })

  useEffect(() => {
    handleBoxResize();
    goToCurrentNode(1000);
  }, [])

  useEffect(() => {
    goToCurrentNode();
  }, [currentNodeId])

  useEffect(() => {
    if (!boxRef.current) return;
    boxRef.current.addEventListener('mousewheel', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    new ResizeObserver(handleBoxResize).observe(boxRef.current);
  }, [boxRef.current])

  return (
    <Box id={currentNodeId} overflow={'hidden'} ref={boxRef} height={height} sx={{ position: 'relative', userSelect: 'none' }}>
      <IconButton sx={{ position: 'absolute', bottom: 0 }} onClick={() => goToCurrentNode()}>
        <MyLocationIcon color='secondary' />
      </IconButton>
      {/* https://danielcaldas.github.io/react-d3-graph/docs/index.html */}
      <Graph
        ref={graphRef}
        id={"road-map"}
        data={{
          nodes,
          links,
          focusedNodeId: focused,
        }}
        config={{
          directed: true,
          minZoom: 0.5,
          maxZoom: 2,
          focuseZoom: 2,
          initialZoom: 1,
          focusAnimationDuration: 0.5,
          height,
          width,
          staticGraph: !dragAndDrop,
          staticGraphWithDragAndDrop: dragAndDrop,
          // nodeHighlightBehavior: true,
          node: {
            labelPosition: "bottom",
            highlightFontSize: 9,
            highlightFontWeight: "bold",
            highlightStrokeColor: highlightBlueColor,
            strokeWidth: 2,
          },
          link: {
            highlightColor: highlightBlueColor,
          }
        }}
      />
    </Box>
  );
};

export default GraphMapBase;
