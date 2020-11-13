import jsonpack from 'jsonpack';

const translate = [
  {
    from: '"points"',
    to: '"p":',
  },
  {
    from: '"type"',
    to: '"t"',
  },
  {
    from: '"CIRCLE"',
    to: '"C"',
  },
  {
    from: '"RECT"',
    to: '"R"',
  },
  {
    from: '"LINE"',
    to: '"L"',
  },
  {
    from: '"TEXT"',
    to: '"T"',
  },
  {
    from: '"shadowBlur"',
    to: '"sb"',
  },
  {
    from: '"transformerProps"',
    to: '"tp"',
  },
  {
    from: '"shapeProps"',
    to: '"sp"',
  },
  {
    from: '"stroke"',
    to: '"st"',
  },
  {
    from: '"width"',
    to: '"w"',
  },
  {
    from: '"height"',
    to: '"h"',
  },
];

const compressNode = (node) => {
  try {
    let strNode = JSON.stringify(node);
    translate.forEach((t) => {
      strNode = strNode.replaceAll(`${t.from}`, `${t.to}`);
    });
    const jsonNode = JSON.parse(strNode);
    delete jsonNode['isSelected'];
    return jsonNode;
  } catch {
    return node;
  }
};

const decompressNode = (node) => {
  try {
    let strNode = JSON.stringify(node);
    translate.forEach((t) => {
      strNode = strNode.replaceAll(`${t.to}`, `${t.from}`);
    });
    return JSON.parse(strNode);
  } catch {
    return node;
  }
};

export function compressNodes({ nodes, changeCount }) {
  return jsonpack.pack({ n: nodes.map(compressNode), c: changeCount });
}

export function decompressNodes(gzippedString) {
  const { n, c } = jsonpack.unpack(gzippedString);
  return { nodes: n ? n.map(decompressNode) : {}, changeCount: c || 0 };
}
