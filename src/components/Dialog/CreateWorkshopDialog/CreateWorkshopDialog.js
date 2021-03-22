import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createWorkshopAction } from '../../../redux/slices/mentor';

function CreateWorkshopDialog({ open, handleClose, createWorkshop }) {
  const [name, setName] = useState();
  const t = useTranslate();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>{t('createWorkshop')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('specifyNameAndTypeOfWorkshop')}
        </DialogContentText>
        <TextField
          fullWidth
          autoFocus
          label={t('workshopName')}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => createWorkshop({ name })}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createWorkshop: createWorkshopAction })(
  CreateWorkshopDialog
);
