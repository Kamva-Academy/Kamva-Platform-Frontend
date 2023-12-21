import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';

function TextEditWidget({
  onEdit,

  open,
  handleClose,
  text: oldText,
  paperId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState(oldText);

  const handleClick = () => {
    onEdit({
      paper: paperId,
      text,
      widgetId,
      onSuccess: handleClose,
    })
  };

  return (
    <Dialog disableScrollLock
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('text')}</DialogTitle>
      <DialogContent>
        <DialogContentText>متن مورد نظر خود را وارد کنید.</DialogContentText>
        <TinyEditorComponent
          content={text}
          onChange={(text) => setText(text)}
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

export default TextEditWidget;
