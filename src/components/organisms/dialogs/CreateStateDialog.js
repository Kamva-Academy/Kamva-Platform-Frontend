import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';

import {
  addStateAction,
} from 'redux/slices/workshop';

function CreateStateDialog({
  addState,
  open,
  handleClose,
}) {
  const [name, setName] = useState('');
  const { fsmId } = useParams();
  const t = useTranslate();

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{t('createState')}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label={t('stateName')}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => addState({ name, fsm: fsmId }).then(handleClose)}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  null,
  {
    addState: addStateAction,
  }
)(CreateStateDialog);
