import React, { useState } from 'react';
import { Slider, Button } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';


const Popup = () => {
    const [value, setValue] = useState(5);
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleCheckboxChange = (checkbox, setter) => {
        setter(!checkbox);
      };
    
    const handleOKClick = () => {
        setIsOpen(false);
        // handleClose();
    };

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
        
        <p>Intervalo do popup:</p>
            <Slider
                value={value}
                onChange={handleChange}
                min={0}
                max={10}
                step={1}
                valueLabelDisplay="auto"
            />

        <p>Periodicidade do popup:</p>
            <Slider
                value={value}
                onChange={handleChange}
                min={0}
                max={10}
                step={1}
                valueLabelDisplay="auto"
            />
        <div style= {{ flexDirection: 'column', gap: '5px'}}>
         <FormControlLabel
        control={
          <Checkbox
            checked={checkbox1}
            onChange={() => handleCheckboxChange(checkbox1, setCheckbox1)}
          />
        }
        label="Mover o mapa automaticamente"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkbox2}
            onChange={() => handleCheckboxChange(checkbox2, setCheckbox2)}
          />
        }
        label="Habilitar visualização da porcentagem"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkbox3}
            onChange={() => handleCheckboxChange(checkbox3, setCheckbox3)}
          />
        }
        label="Habilitar estados"
      />
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" style={{backgroundColor: '#C13617' }} onClick={handleOKClick}>OK</Button>
      </div>
    </div>
  );
};

export default Popup;
