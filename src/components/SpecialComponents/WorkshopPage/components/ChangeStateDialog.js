import {
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
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
        {edges.slice().sort((e1, e2) => e1.head.name < e2.head.name ? 1 : -1).map((edge) => (
          <ListItemButton
            onClick={() => {
              changeState(edge);
              handleClose();
            }}
            key={edge.id}>
            {edge.head.name}
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}

export default ChangeStateDialog;
