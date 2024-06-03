import React, { useState } from 'react';

const HierarchyCheckboxes = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  
  const handleSelectParent = (parent, children) => {
    if (selectedItems.includes(parent)) {
      setSelectedItems(selectedItems.filter(item => !children.includes(item)));
    } else {
      setSelectedItems([...selectedItems, parent, ...children]);
    }
  };
  const handleSelectItem = (item) => {
    const index = selectedItems.indexOf(item);
    if (index === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((value) => value !== item));
    }
    
    const parent = parentOf(item);
    if (parent && !selectedItems.includes(item)) {
      const children = childrenOf(parent);
      if (children.every(child => !selectedItems.includes(child))) {
        setSelectedItems(selectedItems.filter(value => value !== parent));
      }
    }
  };
  
  const childrenOf = (parent) => {
    return items[parent] || [];
  };
  
  const parentOf = (child) => {
    for (const parent in items) {
      if (items[parent].includes(child)) {
        return parent;
      }
    }
    return '';
  };

  return (
    <div>
      {Object.entries(items).map(([parent, children]) => (
        <div key={parent}>
          <input
            type="checkbox"
            checked={selectedItems.includes(parent)}
            onChange={() => handleSelectParent(parent, children)}
          />
          <label>{parent}</label>
          {children.map((child) => (
            <div key={child} style={{ marginLeft: '20px' }}>
              <input
                type="checkbox"
                checked={selectedItems.includes(child)}
                onChange={() => handleSelectItem(child)}
              />
              <label>{child}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HierarchyCheckboxes;
