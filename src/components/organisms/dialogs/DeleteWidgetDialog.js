import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { deleteWidgetAction } from '../../../redux/slices/Paper';

function DeleteWidgetDialog({
  handleClose,
  deleteWidget,

  paperId,
  open,
  widgetId
}) {
  const t = useTranslate();
  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{t('removeWidget')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('wantRemoveWidget')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          {'لغو'}
        </Button>
        <Button
          onClick={() => {
            deleteWidget({ widgetId, paperId });
            handleClose();
          }}
          color="primary"
          variant="contained">
          {'حذف'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { deleteWidget: deleteWidgetAction })(
  DeleteWidgetDialog
);
