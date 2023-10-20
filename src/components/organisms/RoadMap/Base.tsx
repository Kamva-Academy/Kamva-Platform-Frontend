import { Box, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Graph } from "react-d3-graph";
import MyLocationIcon from '@mui/icons-material/MyLocation';

const GraphMapBase = ({
  currentNodeId,
  nodes,
  links,
  dragAndDrop,
  height = 400,
  highlighPath = [],
}) => {
  const highlightColor = '#80ff2b';
  const boxRef = useRef(null);
  const graphRef = useRef(null);
  const [focused, setFocused] = useState(null);
  const [width, setWidth] = useState(null);

  const goToCurrentNode = () => {
    setFocused(null);
    setTimeout(() => {
      setFocused(currentNodeId)
    }, 100)
    setTimeout(() => {
      setFocused(null)
    }, 200)
  }

  const handleBoxResize = () => {
    if (boxRef.current) {
      setWidth(boxRef.current.clientWidth);
    }
  }

  // make previous path highlighted:
  highlighPath.forEach(pathLink => {
    nodes.find(node => node.id === pathLink.source)['color'] = highlightColor;
    nodes.find(node => node.id === pathLink.target)['color'] = highlightColor;
    links.find(link => link.source === pathLink.source && link.target === pathLink.target)
  });

  // make current node green:
  const currentNode = nodes.find(node => node.id === currentNodeId)
  if (currentNode) {
    currentNode['color'] = highlightColor;
  }

  useEffect(() => {
    handleBoxResize();
    goToCurrentNode();
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
      <IconButton sx={{ position: 'absolute', bottom: 0 }} onClick={goToCurrentNode}>
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
          minZoom: 1,
          maxZoom: 2,
          focuseZoom: 2,
          initialZoom: 2,
          focusAnimationDuration: 0.5,
          height,
          width,
          staticGraph: !dragAndDrop,
          staticGraphWithDragAndDrop: dragAndDrop,
          nodeHighlightBehavior: true,
          node: {
            labelPosition: "bottom",
            highlightFontSize: 9,
            highlightFontWeight: "bold",
            highlightStrokeColor: "#00b4e0",
            strokeWidth: 2,
          },
          link: {
            highlightColor: '#00b4e0',
          }
        }}
      />
    </Box>
  );
};

export default GraphMapBase;
