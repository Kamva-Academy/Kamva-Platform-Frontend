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

import { createUploadFileWidget } from '../../../redux/actions/mentor';

function UploadFileQuestionEditWidget({
  open,
  handleClose,
  initQuestion = '',
  stateId,
  id,
  createUploadFileWidget,
}) {
  const t = useTranslate();
  const [question, setQuestion] = useState(initQuestion);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createUploadFileWidget({ state: stateId, text: question });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('file')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          متن درخواستی که برای ارسال فایل دارید در قسمت پایین وارد کنید.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label="متن درخواست"
          value={question}
          placeholder="مثال: لطفا فایل جواب را ارسال کنید."
          onChange={(e) => setQuestion(e.target.value)}
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

export default connect(null, { createUploadFileWidget })(
  UploadFileQuestionEditWidget
);
