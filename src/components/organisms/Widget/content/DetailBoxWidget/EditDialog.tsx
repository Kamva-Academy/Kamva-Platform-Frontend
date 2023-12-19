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
import { EditPaper } from 'components/template/Paper';

const DetailBoxEditDialog = ({
  onSubmit,

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

  const onSubmitWrapper = () => {
    onSubmit({
      paper: paperId,
      title,
      widgetId,
      detail,
      onSuccess: handleClose,
    })
  };

  return (
    <Dialog disableScrollLock
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{'عنوان'}</DialogTitle>
      <DialogContent>
        <DialogContentText>متن مورد نظر خود را وارد کنید.</DialogContentText>
        <TinyEditorComponent
          content={title}
          onChange={(text) => setTitle(text)}
        />
        <EditPaper paperId={paperId} widgets={[]} mode='contents' />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmitWrapper} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapDispatcherToProps = (dispatch, ownProps) => {
  let onSubmit;
  if (ownProps.collectData) {
    onSubmit = ownProps.collectData;
  } else if (ownProps.widgetId) {
    onSubmit = (arg) => dispatch(updateDetailBoxWidgetAction(arg));
  } else {
    onSubmit = (arg) => dispatch(createDetailBoxWidgetAction(arg));
  }
  return {
    onSubmit,
  }
}

export default connect(null, mapDispatcherToProps)(DetailBoxEditDialog);
