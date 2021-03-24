import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import React, { useContext } from 'react';

import { StatePageContext } from '../../../containers/Workshop';

export default function RemoveAllNodesDialog({
  open,
  handleClose,
  removeAllNodes,
}) {
  const {
    player: { uuid },
  } = useContext(StatePageContext);

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
            removeAllNodes({ uuid });
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
