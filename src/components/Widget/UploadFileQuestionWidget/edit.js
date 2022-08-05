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
  createUploadFileWidgetAction,
  updateUploadFileWidgetAction,
} from '../../../redux/slices/widget';

function UploadFileQuestionEditWidget({
  updateUploadFileWidget,
  createUploadFileWidget,
  handleClose,

  open,
  text: oldText,
  stateId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState(oldText);

  const handleClick = () => {
    if (widgetId) {
      updateUploadFileWidget({
        paper: stateId,
        text,
        widgetId,
      })
    } else {
      createUploadFileWidget({
        paper: stateId,
        text: text
      });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('file')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          متن درخواستی را که برای ارسال فایل دارید، در قسمت پایین وارد کنید.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label="متن درخواست"
          value={text}
          placeholder="مثال: لطفا فایل جواب را ارسال کنید."
          onChange={(e) => setText(e.target.value)}
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

export default connect(null, {
  createUploadFileWidget: createUploadFileWidgetAction,
  updateUploadFileWidget: updateUploadFileWidgetAction,
})(UploadFileQuestionEditWidget);
