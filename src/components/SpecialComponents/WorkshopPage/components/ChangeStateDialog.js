import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import React from 'react';

function ChangeStateDialog({ open, handleClose, edges, changeState }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h3">کجا بریم؟</Typography>
      </DialogTitle>
      <List>
        {edges.map((edge) => (
          <ListItem button onClick={() => changeState(edge)} key={edge.id}>
            {edge.text}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default ChangeStateDialog;
