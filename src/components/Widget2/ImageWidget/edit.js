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
  createImageWidgetAction,
  updateImageWidgetAction,
} from '../../../redux/slices/widget';

function ImageEditWidget({
  createImageWidget,
  updateImageWidget,
  handleClose,

  stateId,
  open,
  link: oldLink,
  id: widgetId,
}) {
  const [link, setLink] = useState(oldLink);
  const t = useTranslate();

  const handleClick = () => {
    if (widgetId) {
      updateImageWidget({
        paper: stateId,
        link,
        widgetId,
      })
    } else {
      createImageWidget({
        paper: stateId,
        link
      });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('image')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('uploadFileFillUrl')}</DialogContentText>
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
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  null,
  {
    createImageWidget: createImageWidgetAction,
    updateImageWidget: updateImageWidgetAction,
  }
)(ImageEditWidget);
