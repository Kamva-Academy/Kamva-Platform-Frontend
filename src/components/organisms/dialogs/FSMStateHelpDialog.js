import { Button, Dialog, Grid, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { toPersianNumber } from 'utils/translateNumber';

import Widget from 'components/organisms/Widget';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  widgets: {
    padding: theme.spacing(2, 0),
  },
}));

function HelpDialog({ open, handleClose, helps }) {
  const t = useTranslate();
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const help = helps[index];
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <Paper className={classes.paper} key={help.id}>
        <Typography>{t('helpNumber') + " " + (toPersianNumber(index + 1))}</Typography>
        <div className={classes.widgets}>
          {help.widgets.map((widget) => (
            <Widget key={widget.id} coveredWithPaper={false} widget={widget} />
          ))}
        </div>
        <Grid container justifyContent="space-between">
          <Grid item>
            {index > 0 && (
              <Button color="primary" onClick={() => setIndex(index - 1)}>
                قبلی
              </Button>
            )}
          </Grid>
          <Grid item>
            {index < helps.length - 1 && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setIndex(index + 1)}>
                بازم کمک لازم دارم
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
}

export default HelpDialog;
