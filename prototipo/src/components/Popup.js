//Teste
import React, { useState } from 'react';

const Popup = () => {
  const [popupData, setPopupData] = useState([
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

  const renderPopup = (nodes) => {
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            {node.name}
            {node.children.length > 0 && renderPopup(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>Popup Component</h3>
      {renderPopup(popupData)}
    </div>
  );
};

export default Popup;
