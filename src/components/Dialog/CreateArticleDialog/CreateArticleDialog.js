import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createArticleAction } from '../../../redux/slices/mentor';

function CreateArticleDialog({ open, handleClose, createArticle }) {
  const t = useTranslate();
  const [name, setName] = useState('');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>{t('createArticle')}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label={t('articleName')}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => createArticle({ name })}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createArticle: createArticleAction })(
  CreateArticleDialog
);
