import React, { useState } from 'react';
import { Popover, Fab } from '@mui/material';
// import DehazeIcon from '@mui/icons-material/Dehaze';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import Tree from './Tree';

const TreePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const togglePopover = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fab color="primary" aria-label="toggle-popover" onClick={togglePopover}>
        {anchorEl ? <CloseIcon /> : <FormatListBulletedIcon />}
      </Fab>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: { marginTop: '10px', width: '350px', height: '80%' },
        }}
      >
        <div style={{ padding: 16 }}>
          <Tree />
        </div>
      </Popover>
    </>
  );
};

export default TreePopover;
