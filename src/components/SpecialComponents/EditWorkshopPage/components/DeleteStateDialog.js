import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
