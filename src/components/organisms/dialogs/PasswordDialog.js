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

function PasswordDialog({ open, handleClose, eventId, fsmId, enterWorkshop }) {
  const t = useTranslate();
  const [password, setPassword] = useState('');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        برای ورود به این کارگاه باید رمز آن را وارد کنید!
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
          onClick={() => enterWorkshop({ eventId, fsmId, password })}>
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PasswordDialog;
