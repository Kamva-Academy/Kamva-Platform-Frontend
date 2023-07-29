import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import WIDGET_TYPES from '../Widget/WidgetTypes';

export default function CreateWidgetDialog({ open, handleClose, paperId, showContent = true, showProblems = false }) {
  const [type, setType] = useState('');
  const t = useTranslate();

  if (type) {
    const { EditWidgetDialog } = WIDGET_TYPES[type];
    return (
      <EditWidgetDialog
        paperId={paperId}
        open={open}
        handleClose={() => {
          setType('');
          handleClose();
        }}
      />
    );
  }

  return (
    <Dialog open={open} maxWidth='sm' onClose={handleClose}>
      <DialogTitle>{t('createWidget')}</DialogTitle>
      <DialogContent>
        <FormControl size='small' fullWidth style={{ width: '200px' }} variant="outlined">
          <InputLabel>{t('widgetType')}</InputLabel>
          <Select
            onChange={(e) => setType(e.target.value)}
            name='fsmId'
            value={type}
            label={t('widgetType')}>
            {Object.keys(WIDGET_TYPES)
              .filter((option, index) => (!option.includes('Problem') && showContent) || (option.includes('Problem') && showProblems))
              .map((option, index) => (
                <MenuItem key={index} value={option}>
                  {WIDGET_TYPES[option].label}
                </MenuItem>
              ))}
          </Select>
        </FormControl >
      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  );
}
