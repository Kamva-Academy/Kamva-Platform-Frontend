import React, { useState } from 'react';
import { createImageWidget } from '../../../redux/actions/mentor';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';

function ImageEditWidget({
  open,
  handleClose,
  initLink = '',
  stateId,
  id,
  createImageWidget,
}) {
  const [link, setLink] = useState(initLink);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createImageWidget({ state: stateId, link }).then(()=>window.location.reload(false));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>عکس</DialogTitle>
      <DialogContent>
        <DialogContentText>
          عکس را در مکانی بارگذاری کرده و آدرس آن را در ورودی پایین قرار دهید.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label="آدرس عکس"
          value={link}
          inputProps={{ className: 'ltr-input' }}
          placeholder="http://example.com/example.png"
          onChange={(e) => setLink(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createImageWidget })(ImageEditWidget);
