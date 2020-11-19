import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteWidget } from '../../../redux/actions/mentor';
import { connect } from 'react-redux';

function DeleteWidgetDialog({ open, handleClose, deleteWidget, id }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>حذف ویجت</DialogTitle>
      <DialogContent>
        <DialogContentText>آیا مایل به حذف این ویجت هستید؟</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          لغو
        </Button>
        <Button
          onClick={() =>
            deleteWidget({ id }).then(() => window.location.reload(false))
          }
          color="primary"
          variant="contained">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { deleteWidget })(DeleteWidgetDialog);
