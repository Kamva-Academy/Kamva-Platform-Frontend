import { MenuItem, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import WIDGET_TYPES from '../../../Widget/WidgetTypes';

export default function CreateWidgetDialog({ open, handleClose, stateId }) {
  const [type, setType] = useState('');
  const t = useTranslate();

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
      <DialogTitle>{t('createWidget')}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          select
          label={t('widgetType')}
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
