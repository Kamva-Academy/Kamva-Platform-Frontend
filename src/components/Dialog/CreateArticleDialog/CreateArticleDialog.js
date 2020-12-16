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

import { createArticle } from '../../../redux/actions/mentor';

function CreateArticleDialog({ open, handleClose, createArticle }) {
  const [name, setName] = useState();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>{'ساخت مقاله جدید'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          برای ساخت مقاله ابتدا نام و نوع آن را تعیین کنید.
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
          onClick={() => createArticle({ name })}>
          ایجاد
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createArticle })(CreateArticleDialog);
