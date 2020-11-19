import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem, TextField } from '@material-ui/core';
import WIDGET_TYPES from '../../../Widget/WidgetTypes';

export default function CreateWidgetDialog({ open, handleClose, stateId }) {
  const [type, setType] = useState('');

  if (type) {
    const { WidgetEditDialog } = WIDGET_TYPES[type];
    return (
      <WidgetEditDialog
        stateId={stateId}
        open={open}
        handleClose={() => {
          setType('');
          handleClose();
        }}
      />
    );
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ایجاد گام جدید</DialogTitle>
      <DialogContent>
        <DialogContentText>
          برای ایجاد ویجت ابتدا نوع آن را مشخص کنید.
        </DialogContentText>
        <TextField
          fullWidth
          autoFocus
          select
          label="نوع ویجت"
          onChange={(e) => setType(e.target.value)}>
          {Object.keys(WIDGET_TYPES).map((option, index) => (
            <MenuItem key={index} value={option}>
              {WIDGET_TYPES[option].label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          بعدی
        </Button>
      </DialogActions>
    </Dialog>
  );
}
