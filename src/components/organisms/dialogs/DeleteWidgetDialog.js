import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';


function DeleteWidgetDialog({
  handleClose,
  onDelete,
  
  paperId,
  open,
  widgetId
}) {
  const t = useTranslate();

  const onDeleteWrapper = () => {
    onDelete({
      widgetId,
      paperId,
      onSuccess: handleClose,
    });
  }

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
          onClick={onDeleteWrapper}
          color="primary"
          variant="contained">
          {'حذف'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteWidgetDialog;
