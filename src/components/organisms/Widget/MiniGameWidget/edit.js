import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom'

import {
  createMiniGameWidgetAction,
  updateMiniGameWidgetAction,
} from '../../../../redux/slices/widget';

function MiniGameEditWidget({
  open,
  handleClose,
  updateMiniGameWidget,
  createMiniGameWidget,

  paperId,
  link: oldLink,
  id: widgetId,
}) {
  const [link, setLink] = useState(oldLink);
  const t = useTranslate();

  const handleClick = () => {
    if (widgetId) {
      updateMiniGameWidget({
        paper: paperId,
        link,
        widgetId,
      })
    } else {
      createMiniGameWidget({
        paper: paperId,
        link
      });
    }
    handleClose();
  };

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{t('لینک')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'لطفاً لینک مورد نظر خود را قرار دهید. '}
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label='لینک'
          value={link}
          inputProps={{ className: 'ltr-input' }}
          onChange={(e) => setLink(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default connect(null, {
  createMiniGameWidget: createMiniGameWidgetAction,
  updateMiniGameWidget: updateMiniGameWidgetAction,
})(MiniGameEditWidget);
