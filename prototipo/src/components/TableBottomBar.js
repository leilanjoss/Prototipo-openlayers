import React, { useState } from 'react';
import { Drawer, Fab, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableComponent from './Table'

const TableBottomBar = () => {
  const [open, setOpen] = useState(false);

  const toggleBottombar = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab color="primary" aria-label="toggle-sidebar" onClick={toggleBottombar}>
        {open ? <CloseIcon /> : <KeyboardArrowUpIcon />}
      </Fab>
      <Drawer anchor="bottom" open={open} onClose={toggleBottombar}>
        <div>
          <TableComponent />
        </div>
      </Drawer>
    </>
  );
};

export default TableBottomBar;
