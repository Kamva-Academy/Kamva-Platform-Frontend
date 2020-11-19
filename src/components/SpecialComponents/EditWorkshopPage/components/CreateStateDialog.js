import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { createState } from '../../../../redux/actions/mentor';
import { connect } from 'react-redux';

function CreateStateDialog({ open, handleClose, createState, fsmId }) {
  const [name, setName] = useState();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ایجاد گام جدید</DialogTitle>
      <DialogContent>
        <DialogContentText>
          برای ایجاد گام جدید ابتدا نام این گام را مشخص کنید.
        </DialogContentText>
        <TextField
          fullWidth
          autoFocus
          label="نام گام"
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => createState({ name, fsm: fsmId }).then(handleClose)}>
          ایجاد
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createState })(CreateStateDialog);
