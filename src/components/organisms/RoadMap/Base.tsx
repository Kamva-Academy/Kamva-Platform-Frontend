import { Box, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Graph } from "react-d3-graph";
import MyLocationIcon from '@mui/icons-material/MyLocation';

const GraphMapBase = ({
  currentNode,
  nodes,
  links,
  dragAndDrop,
  height = 400,
}) => {
  const boxRef = useRef(null);
  const graphRef = useRef(null);
  const [focused, setFocused] = useState(null);
  const [width, setWidth] = useState(null);

  // todo: maybe there is a better way to solve :?
  const goToCurrentNode = () => {
    setFocused(null);
    setTimeout(() => {
      setFocused(currentNode)
    }, 100)
    setTimeout(() => {
      setFocused(null)
    }, 200)
  }

  function handleBoxResize() {
    if (boxRef.current) {
      setWidth(boxRef.current.clientWidth);
    }
  }

  // make current node green:
  nodes = nodes.map(node => {
    if (node.id === currentNode) {
      return ({
        ...node,
        color: '#80ff2b',
      })
    }
    return node;
  });

  useEffect(() => {
    handleBoxResize();
    goToCurrentNode();
  }, [])

  useEffect(() => {
    goToCurrentNode();
  }, [currentNode])


  useEffect(() => {
    if (!boxRef.current) return;
    boxRef.current.addEventListener('mousewheel', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    const resizeObserver = new ResizeObserver(handleBoxResize);
    resizeObserver.observe(boxRef.current);
  }, [boxRef.current])

  return (
    <Box id={currentNode} overflow={'hidden'} ref={boxRef} height={height} sx={{ position: 'relative', userSelect: 'none' }}>
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
