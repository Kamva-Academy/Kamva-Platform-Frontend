import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createVideoWidget } from '../../../redux/actions/mentor';

function VideoEditWidget({
  open,
  handleClose,
  initLink = '',
  stateId,
  id,
  createVideoWidget,
}) {
  const [link, setLink] = useState(initLink);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createVideoWidget({ state: stateId, link }).then(() =>
        window.location.reload(false)
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>فیلم</DialogTitle>
      <DialogContent>
        <DialogContentText>
          فیلم را در مکانی بارگذاری کرده و آدرس آن را در ورودی پایین قرار دهید.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label="آدرس فیلم"
          value={link}
          inputProps={{ className: 'ltr-input' }}
          placeholder="http://example.com/example.mp4"
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

export default connect(null, { createVideoWidget })(VideoEditWidget);
