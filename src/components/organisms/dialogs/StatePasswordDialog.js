import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

function StatePasswordDialog({ open, handleClose, onSubmit }) {
  const t = useTranslate();
  const [password, setPassword] = useState('');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        برای ورود به این گام باید رمز آن را وارد کنید! )اگر قبلا به این گام
        رفته‌اید نیازی به رمز نیست(
      </DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          fullWidth
          autoFocus
          label={t('رمز')}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onSubmit(password);
            handleClose();
          }}>
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StatePasswordDialog;
