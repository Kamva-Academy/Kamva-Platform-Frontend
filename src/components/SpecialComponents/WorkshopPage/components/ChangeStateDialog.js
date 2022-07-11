import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

function ChangeStateDialog({ open, handleClose, edges, changeState }) {
  const t = useTranslate();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h3">{t('chooseNextState')}</Typography>
      </DialogTitle>
      <List>
        {edges.map((edge) => (
          <ListItem
            button
            onClick={() => {
              changeState(edge);
              handleClose();
            }}
            key={edge.id}>
            {edge.str}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default ChangeStateDialog;
