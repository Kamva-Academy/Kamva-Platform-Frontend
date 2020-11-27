import { MenuItem, MenuList, Paper } from '@material-ui/core';
import React from 'react';

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
