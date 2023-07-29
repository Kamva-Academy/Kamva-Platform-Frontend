import { Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';

import ReviewAnswers from 'components/organisms/dialogs/ReviewAnswers';

const useStyles = makeStyles(() => ({
  iconImage: {
    maxHeight: '20px',
    width: '100%',
  },
}));

export default function Index() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        <Typography variant="caption">{'مرور پاسخ‌ها'}</Typography>
      </Button>
      <ReviewAnswers open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
