import React, { useState, useRef } from 'react';
import { Fab, Popover, Box } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import Popup from './Popup';

const PopupPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const togglePopover = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Fab color="primary" aria-label="toggle-popover" onClick={togglePopover}>
        {open ? <CloseIcon /> : <DehazeIcon />}
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={togglePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: { marginTop: '10px', width: '350px', height: '350px' },
        }}
      >
        <Box p={2}>
          <Popup />
        </Box>
      </Popover>
    </>
  );
};

export default PopupPopover;
