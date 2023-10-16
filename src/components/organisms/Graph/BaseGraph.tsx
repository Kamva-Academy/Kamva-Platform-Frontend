import { Box, Button, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Graph } from "react-d3-graph";
import MyLocationIcon from '@mui/icons-material/MyLocation';

const BaseGraph = ({
  currentNode = null,
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
  }

  useEffect(() => {
    goToCurrentNode();
  }, [currentNode])

  // make current node green
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
    if (!boxRef.current) return;
    boxRef.current.addEventListener('mousewheel', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }, [boxRef.current])

  useEffect(() => {
    function handleWindowResize() {
      setWidth(boxRef.current.clientWidth);
      goToCurrentNode();
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  return (
    <Box overflow={'hidden'} ref={boxRef} height={height} sx={{ position: 'relative' }}>
      <IconButton sx={{ position: 'absolute', bottom: 0 }} onClick={goToCurrentNode}>
        <MyLocationIcon color='secondary' />
      </IconButton>
      {/* https://danielcaldas.github.io/react-d3-graph/docs/index.html */}
      <Graph
        ref={graphRef}
        id="fsm-map"
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
          height: height,
          width: width,
          staticGraph: !dragAndDrop,
          staticGraphWithDragAndDrop: dragAndDrop,
          // nodeHighlightBehavior: true,
          // linkHighlightBehavior: true,
          node: {
            labelPosition: "bottom",
            highlightFontSize: 10,
            highlightFontWeight: "bold",
            highlightStrokeColor: "#00b4e0",
            // size: 500,
            strokeWidth: 2,
          },
          link: {
            highlightColor: '#00b4e0',
            // fontSize: 12,
          },
          d3: {
            // gravity: -100,
            // linkLength: 10,
            // disableLinkForce: true,
          },
        }}
      />
    </Box>
  );
};

export default BaseGraph;
