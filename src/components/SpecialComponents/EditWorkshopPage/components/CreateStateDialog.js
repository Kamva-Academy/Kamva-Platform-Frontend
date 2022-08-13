import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';

import {
  addStateAction,
} from '../../../../redux/slices/workshop';

function CreateStateDialog({
  addState,
  open,
  handleClose,
}) {
  const [name, setName] = useState('');
  const { fsmId } = useParams();
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
