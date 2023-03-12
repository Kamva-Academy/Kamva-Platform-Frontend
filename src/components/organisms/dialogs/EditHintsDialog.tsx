import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import EditHints from '../EditHints';

const EditHintsDialog = ({
  handleClose,

  paperId,
  open,
  widgetId
}) => {
  const t = useTranslate();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'ویرایش راهنمایی'}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>{t('wantRemoveWidget')}</DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <EditHints />
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, {

})(EditHintsDialog);
