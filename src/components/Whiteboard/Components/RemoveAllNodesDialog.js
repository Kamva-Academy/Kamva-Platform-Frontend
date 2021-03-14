import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import React from 'react';

export default function RemoveAllNodesDialog({
  open,
  handleClose,
  removeAllNodes,
}) {
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
            removeAllNodes();
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
