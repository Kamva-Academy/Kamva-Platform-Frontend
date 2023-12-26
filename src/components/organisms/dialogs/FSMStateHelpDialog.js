import { Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { toPersianNumber } from 'utils/translateNumber';
import Paper from 'components/template/Paper';

function HelpDialog({ open, handleClose, helps }) {
  const t = useTranslate();
  const [index, setIndex] = useState(0);

  const help = helps[index];
  return (
    <Dialog disableScrollLock open={open} onClose={handleClose} maxWidth="xs" fullWidth >
      <DialogContent>
        <Typography>{t('helpNumber') + " " + (toPersianNumber(index + 1))}</Typography>
        <Paper paper={help} />
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            {index > 0 && (
              <Button variant='outlined' color="primary" onClick={() => setIndex(index - 1)}>
                قبلی
              </Button>
            )}
          </Grid>
          <Grid item>
            {index < helps.length - 1 && (
              <Button
                sx={{ animation: "shake 12s infinite" }}
                variant="contained"
                color="primary"
                onClick={() => setIndex(index + 1)}>
                بازم کمک لازم دارم
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default HelpDialog;
