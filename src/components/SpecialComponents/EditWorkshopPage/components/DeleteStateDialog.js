import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { deleteStateAction } from '../../../../redux/slices/widget';

function DeleteStateDialog({ open, handleClose, deleteState, stateId }) {
  const t = useTranslate();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('removeState')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('wantDeleteState')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          لغو
        </Button>
        <Button
          onClick={() => {
            deleteState({ id: stateId });
            handleClose();
          }}
          color="primary"
          variant="contained">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { deleteState: deleteStateAction })(
  DeleteStateDialog
);
