import React, { useState } from 'react';

const Tree = () => {
  const [treeData, setTreeData] = useState([
    {
      id: 1,
      name: 'Node 1',
      children: [
        {
          id: 2,
          name: 'Node 1.1',
          children: [],
        },
        {
          id: 3,
          name: 'Node 1.2',
          children: [],
        },
      ],
    },
    {
      id: 4,
      name: 'Node 2',
      children: [
        {
          id: 5,
          name: 'Node 2.1',
          children: [],
        },
      ],
    },
  ]);

  const renderTree = (nodes) => {
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            {node.name}
            {node.children.length > 0 && renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>Tree Component</h3>
      {renderTree(treeData)}
    </div>
  );
};

export default Tree;
