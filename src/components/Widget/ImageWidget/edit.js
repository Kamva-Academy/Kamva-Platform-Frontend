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

import { createImageWidgetAction } from '../../../redux/slices/mentor';

function ImageEditWidget({
  open,
  handleClose,
  initLink = '',
  stateId,
  id,
  createImageWidget,
}) {
  const [link, setLink] = useState(initLink);
  const t = useTranslate();

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createImageWidget({ state: stateId, link });
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

export default connect(null, { createImageWidget: createImageWidgetAction })(
  ImageEditWidget
);
