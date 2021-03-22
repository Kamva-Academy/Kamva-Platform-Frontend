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
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createVideoWidgetAction } from '../../../redux/slices/mentor';


function VideoEditWidget({
  open,
  handleClose,
  initLink = '',
  stateId,
  id,
  createVideoWidget,
}) {
  const t = useTranslate();
  const [link, setLink] = useState(initLink);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createVideoWidget({ state: stateId, link });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>فیلم</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('uploadFileFillUrl')}</DialogContentText>
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
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createVideoWidget: createVideoWidgetAction })(VideoEditWidget);
