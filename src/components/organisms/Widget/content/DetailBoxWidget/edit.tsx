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
  createDetailBoxWidgetAction,
  updateDetailBoxWidgetAction,
} from 'redux/slices/widget';
import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';

const DetailBoxEditWidget = ({
  updateDetailBoxWidget,
  createDetailBoxWidget,

  open,
  handleClose,
  title: previousTitle,
  detail: previousDetail,
  paperId,
  id: widgetId,
}) => {
  const t = useTranslate();
  const [title, setTitle] = useState(previousTitle);
  const [detail, setDetail] = useState(previousDetail);

  const handleClick = () => {
    if (widgetId) {
      updateDetailBoxWidget({
        paper: paperId,
        title,
        widgetId,
      })
    } else {
      createDetailBoxWidget({
        paper: paperId,
        title,
      });
    }
    handleClose();
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
          content={title}
          onChange={(text) => setTitle(text)}
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
  createDetailBoxWidget: createDetailBoxWidgetAction,
  updateDetailBoxWidget: updateDetailBoxWidgetAction,
})(DetailBoxEditWidget);
