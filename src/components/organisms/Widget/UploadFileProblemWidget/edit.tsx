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
} from '../../../../redux/slices/widget';
import TinyEditorComponent from '../../../tiny_editor/react_tiny/TinyEditorComponent';

type UploadFileProblemEditWidgetPropsType = {
  updateUploadFileWidget: any;
  createUploadFileWidget: any;
  handleClose: any;
  open: boolean;
  text: string;
  paperId: number;
  id: number;
  solution: string;
}

const UploadFileProblemEditWidget: FC<UploadFileProblemEditWidgetPropsType> = ({
  updateUploadFileWidget,
  createUploadFileWidget,
  handleClose,

  open,
  text: oldText,
  solution: oldSolution,
  paperId,
  id: widgetId,
}) => {
  const t = useTranslate();
  const [text, setText] = useState(oldText || '');
  const [solution, setSolution] = useState<string>(oldSolution || '');

  const handleSubmit = () => {
    if (widgetId) {
      updateUploadFileWidget({
        paper: paperId,
        text: text,
        widgetId,
        solution,
      }).then((response) => {
        if (response.type?.endsWith('fulfilled')) {
          handleClose();
        }
      });
    } else {
      createUploadFileWidget({
        paper: paperId,
        text: text,
        solution,
      }).then((response) => {
        if (response.type?.endsWith('fulfilled')) {
          handleClose();
        }
      });
    }
  };

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{'ارسال فایل'}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography>
            متن درخواستی را که برای ارسال فایل دارید، در قسمت زیر وارد کنید.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            value={text}
            placeholder="مثال: لطفا فایل جواب را ارسال کنید."
            onChange={(e) => setText(e.target.value)}
          />
          <label>{'راه‌حل'}</label>
          <TinyEditorComponent
            content={solution}
            onChange={(val: string) => setSolution(val)}
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

export default connect(null, {
  createUploadFileWidget: createUploadFileWidgetAction,
  updateUploadFileWidget: updateUploadFileWidgetAction,
})(UploadFileProblemEditWidget);
