import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import EditHints from 'components/templates/EditHints';

const EditHintsDialog = ({
  handleClose,
  hints,
  open,
  widgetId
}) => {
  const t = useTranslate();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogActions>
        <Stack spacing={2}>
          <EditHints referenceId={widgetId} type='widget' hints={hints} />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, {

})(EditHintsDialog);
