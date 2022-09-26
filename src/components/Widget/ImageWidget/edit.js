import {
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import UploadFile from '../../molecules/UploadFile';
import {
  createImageWidgetAction,
  updateImageWidgetAction,
} from '../../../redux/slices/widget';

function ImageEditWidget({
  createImageWidget,
  updateImageWidget,
  handleClose,

  open,
  link: oldLink,
  id: widgetId,
  file: previousFile,
  paper: paperId,
}) {
  const [link, setLink] = useState(oldLink);
  const [file, setFile] = useState(null);
  const t = useTranslate();

  const handleClick = () => {
    let payload = {
      paper: paperId,
    };
    if (file) {
      payload = {
        ...payload,
        file,
      }
    }
    if (link) {
      payload = {
        ...payload,
        link,
      }
    }
    if (widgetId) {
      updateImageWidget({
        ...payload,
        widgetId,
      })
    } else {
      createImageWidget(payload);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('image')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>{t('uploadFileFillUrl')}</DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="آدرس عکس"
            value={link}
            inputProps={{ className: 'ltr-input' }}
            placeholder="http://example.com/example.png"
            onChange={(e) => setLink(e.target.value)}
          />
          <Divider>یا</Divider>
          <UploadFile widgetId={widgetId} paperId={paperId} file={file} setFile={setFile} previousFile={previousFile} />
        </Stack>
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
    createImageWidget: createImageWidgetAction,
    updateImageWidget: updateImageWidgetAction,
  }
)(ImageEditWidget);
