import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';

type UploadFileProblemEditWidgetPropsType = {
  onEdit: any;
  handleClose: any;

  open: boolean;
  text: string;
  paperId: number;
  id: number;
  solution: string;
}

const UploadFileProblemEditWidget: FC<UploadFileProblemEditWidgetPropsType> = ({
  onEdit,
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
    onEdit({
      paper: paperId,
      text: text,
      widgetId,
      solution,
      onSuccess: handleClose,
    });
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

export default UploadFileProblemEditWidget;
