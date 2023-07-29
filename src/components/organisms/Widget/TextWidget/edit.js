import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  createTextWidgetAction,
  updateTextWidgetAction,
} from '../../../../redux/slices/widget';
import TinyEditorComponent from '../../../tiny_editor/react_tiny/TinyEditorComponent';

function TextEditWidget({
  updateTextWidget,
  createTextWidget,

  open,
  handleClose,
  text: oldText,
  paperId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState(oldText);

  const handleClick = () => {
    if (widgetId) {
      updateTextWidget({
        paper: paperId,
        text,
        widgetId,
      })
    } else {
      createTextWidget({
        paper: paperId,
        text
      });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('text')}</DialogTitle>
      <DialogContent>
        <DialogContentText>متن مورد نظر خود را وارد کنید.</DialogContentText>
        <TinyEditorComponent
          // id={`edit-question-${Math.floor(Math.random() * 1000)}`}
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

export default connect(
  null,
  {
    createTextWidget: createTextWidgetAction,
    updateTextWidget: updateTextWidgetAction,
  }
)(TextEditWidget);
