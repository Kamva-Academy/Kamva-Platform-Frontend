import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createStateAction } from '../../../../redux/slices/mentor';

function CreateStateDialog({ open, handleClose, createState, fsmId }) {
  const [name, setName] = useState('');
  const t = useTranslate();

  return (
    <Dialog open={open} onClose={handleClose}>
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
          onClick={() => createState({ name, fsmId }).then(handleClose)}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createState: createStateAction })(
  CreateStateDialog
);
