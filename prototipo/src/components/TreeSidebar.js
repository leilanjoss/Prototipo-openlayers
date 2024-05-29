import React, { useState } from 'react';
import { Drawer, Fab, FormControlLabel } from '@mui/material';
// import TreeIcon from '@mui/icons-material/AccountTree';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tree from './Tree';

const TreeSidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab color="primary" aria-label="toggle-sidebar" onClick={toggleSidebar}>
        {open ? <CloseIcon /> : <FormatListBulletedIcon />}
      </Fab>
      <Drawer anchor="right" open={open} onClose={toggleSidebar}>
        <div>
          <Tree />
        </div>
      </Drawer>
    </>
  );
};

export default TreeSidebar;
