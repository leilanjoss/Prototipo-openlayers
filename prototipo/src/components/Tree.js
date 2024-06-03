import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import HierarchyCheckboxes from './TreeContent'

// const Tree = () => {
//   const [treeData, setTreeData] = useState([
//     {
//       id: 1,
//       name: 'Node 1',
//       children: [
//         {
//           id: 2,
//           name: 'Node 1.1',
//           children: [],
//         },
//         {
//           id: 3,
//           name: 'Node 1.2',
//           children: [],
//         },
//       ],
//     },
//     {
//       id: 4,
//       name: 'Node 2',
//       children: [
//         {
//           id: 5,
//           name: 'Node 2.1',
//           children: [],
//         },
//       ],
//     },
//   ]);
const items = {
    'TODOS': ['ADMINISTRATIVO', 'TELEDIAGNÓSTICO'],
  };

const Tree = () => {
    const [selectedValue, setSelectedValue] = useState('todos');
  
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

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
      <h3>Eventos a serem monitorados</h3>
      <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
      <FormControl component="fieldset">
        <HierarchyCheckboxes items={items} />
      </FormControl>
      {/* {renderTree(treeData)} */}
    </div>
  );
};

export default Tree;
