import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React, { useContext } from 'react';

import { StatePageContext } from 'pages/FSM';

export default function RemoveAllNodesDialog({
  open,
  handleClose,
  removeAllNodes,
}) {
  const { teamId } = useContext(StatePageContext);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          آیا مایل به حذف اطلاعات تخته هستید؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          خیر
        </Button>
        <Button
          onClick={() => {
            removeAllNodes({ uuid: teamId });
            handleClose();
          }}
          color="primary"
          variant="contained">
          بله
        </Button>
      </DialogActions>
    </Dialog>
  );
}
