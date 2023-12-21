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
      }
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
