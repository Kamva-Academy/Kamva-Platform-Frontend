import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';


function MiniGameEditWidget({
  handleClose,
  onEdit,

  open,
  paperId,
  link: oldLink,
  id: widgetId,
}) {
  const [link, setLink] = useState(oldLink);
  const t = useTranslate();

  const onEditWrapper = () => {
    onEdit({
      paper: paperId,
      link,
      widgetId,
      onSuccess: handleClose,
    })
  };

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{t('لینک')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'لطفاً لینک مورد نظر خود را قرار دهید. '}
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label='لینک'
          value={link}
          inputProps={{ className: 'ltr-input' }}
          onChange={(e) => setLink(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onEditWrapper} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default MiniGameEditWidget;
