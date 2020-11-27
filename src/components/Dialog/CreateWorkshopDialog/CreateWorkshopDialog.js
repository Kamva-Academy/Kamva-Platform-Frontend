import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createWorkshop } from '../../../redux/actions/mentor';

function CreateWorkshopDialog({ open, handleClose, createWorkshop }) {
  const [name, setName] = useState();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>{'ساخت کارگاه جدید'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          برای ساخت کارگاه ابتدا نام و نوع آن را تعیین کنید.
        </DialogContentText>
        <TextField
          fullWidth
          autoFocus
          label="نام کارگاه"
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => createWorkshop({ name })}>
          ایجاد
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createWorkshop })(CreateWorkshopDialog);
