import React, { useState } from 'react';
// import TreeIcon from '@mui/icons-material/AccountTree';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tree from './Tree';
import { Fab, Popover, Box } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';

const TreePopover = () => {
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
        {open ? <CloseIcon /> : <FormatListBulletedIcon />}
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
          style: { marginTop: '10px', width: '350px', height: '80%' },
        }}
      >
        <Box p={2}>
          <Tree />
        </Box>
      </Popover>
    </>
  );
};

export default TreePopover;

