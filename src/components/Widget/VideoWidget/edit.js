import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  createVideoWidgetAction,
  updateVideoWidgetAction,
} from '../../../redux/slices/widget';


function VideoEditWidget({
  updateVideoWidget,
  createVideoWidget,

  stateId,
  open,
  link: oldLink,
  handleClose,
  id: widgetId,
}) {
  const t = useTranslate();
  const [link, setLink] = useState(oldLink);

  const handleClick = () => {
    if (widgetId) {
      updateVideoWidget({
        paper: stateId,
        link,
        widgetId,
      })
    } else {
      createVideoWidget({ paper: stateId, link });
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

export default connect(
  null,
  {
    createVideoWidget: createVideoWidgetAction,
    updateVideoWidget: updateVideoWidgetAction,
  }
)(VideoEditWidget);
