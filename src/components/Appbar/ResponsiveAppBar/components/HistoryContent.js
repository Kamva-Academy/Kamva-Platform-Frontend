import React from 'react';
import { MenuItem, MenuList, Paper } from '@material-ui/core';

export default function HistoryContent() {
  return (
    <Paper>
      <MenuList>
        <MenuItem style={{ textAlign: 'center', display: 'block' }} disabled>
          salam
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
