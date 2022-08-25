import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import {
  createUploadFileWidgetAction,
  updateUploadFileWidgetAction,
} from '../../../redux/slices/widget';

type UploadFileProblemEditWidgetPropsType = {
  updateUploadFileWidget: any;
  createUploadFileWidget: any;
  handleClose: any;
  open: boolean;
  text: string;
  stateId: number;
  id: number;
}

const UploadFileProblemEditWidget: FC<UploadFileProblemEditWidgetPropsType> = ({
  updateUploadFileWidget,
  createUploadFileWidget,
  handleClose,

  open,
  text: previousText,
  stateId,
  id: widgetId,
}) => {
  const t = useTranslate();
  const [newText, setNewText] = useState(previousText);

  const handleSubmit = () => {
    if (widgetId) {
      updateUploadFileWidget({
        paper: stateId,
        text: newText,
        widgetId,
      })
    } else {
      createUploadFileWidget({
        paper: stateId,
        text: newText
      });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'ارسال فایل'}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography>
            متن درخواستی را که برای ارسال فایل دارید، در قسمت زیر وارد کنید.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            value={newText}
            placeholder="مثال: لطفا فایل جواب را ارسال کنید."
            onChange={(e) => setNewText(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  null,
  {
    createUploadFileWidget: createUploadFileWidgetAction,
    updateUploadFileWidget: updateUploadFileWidgetAction,
  }
)(UploadFileProblemEditWidget);
