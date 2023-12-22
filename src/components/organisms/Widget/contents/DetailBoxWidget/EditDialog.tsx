import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';
import { EditPaper } from 'components/template/Paper';
import useCollectWidgetsData from 'components/Hooks/useCollectWidgetsData';

const DetailBoxEditDialog = ({
  onEdit,

  paperId,
  id: widgetId,
  open,
  handleClose,
  title: previousTitle,
  details,
}) => {
  const t = useTranslate();
  const [title, setTitle] = useState(previousTitle);
  const { widgets, setWidgets, addWidget, removeWidget } = useCollectWidgetsData(details?.widgets || []);

  const onSubmitWrapper = () => {
    onEdit({
      paperId,
      widgetId,
      title,
      details: {
        paper_type: 'General',
        widgets,
      },
      onSuccess: handleClose,
    })
  };

  return (
    <Dialog disableScrollLock
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus>
      <DialogContent>
        <Typography variant='h5' gutterBottom>{'عنوان'}</Typography>
        <DialogContentText gutterBottom>متن مورد نظر خود را وارد کنید.</DialogContentText>
        <TinyEditorComponent
          content={title}
          onChange={(text) => setTitle(text)}
        />
        <Typography mt={2} variant='h5' gutterBottom>{'جزئیات بیشتر'}</Typography>
        <DialogContentText gutterBottom>ویجت‌هایی را که می‌خواهید به‌صورت پنهان‌شونده باشند، اینجا بگذارید.</DialogContentText>
        <EditPaper paperId={details?.id} widgets={widgets} mode='contents' addWidget={addWidget} removeWidget={removeWidget} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmitWrapper} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailBoxEditDialog;
