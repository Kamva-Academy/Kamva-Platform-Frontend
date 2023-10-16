import React, { useEffect, useState } from 'react';
import { Graph } from "react-d3-graph";

const BaseGraph = ({
  currentNodeId = null,
  nodes,
  links,
  tragAndDrop,
}) => {

  const [focused, setFocused] = useState(null);

  useEffect(() => {
    setFocused(currentNodeId)
  }, [])

  return (
    <>
      {/* https://danielcaldas.github.io/react-d3-graph/docs/index.html */}
      <Graph
        id="fsm-map"
        data={{
          nodes,
          links,
          focusedNodeId: focused,
        }}
        config={{
          directed: true,
          minZoom: 1,
          maxZoom: 5,
          initialZoom: 5,
          height: window.innerHeight,
          width: window.innerWidth,
          staticGraph: !tragAndDrop,
          staticGraphWithDragAndDrop: tragAndDrop,
          nodeHighlightBehavior: true,
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
      />;
    </>
  );
};

export default BaseGraph;
