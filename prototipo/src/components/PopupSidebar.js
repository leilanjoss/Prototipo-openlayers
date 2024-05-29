import React, { useState } from 'react';
import { Drawer, Fab } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import Popup from './Popup';

const PopupSidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab color="primary" aria-label="toggle-sidebar" onClick={toggleSidebar}>
        {open ? <CloseIcon /> : <DehazeIcon />}
      </Fab>
      <Drawer anchor="right" open={open} onClose={toggleSidebar}>
        <div>
          <Popup />
        </div>
      </Drawer>
    </>
  );
};

export default PopupSidebar;
