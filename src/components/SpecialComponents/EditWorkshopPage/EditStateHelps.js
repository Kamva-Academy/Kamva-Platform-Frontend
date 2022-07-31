import { Button, Grid, Paper, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import clsx from 'clsx';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import makeStyles from '@mui/styles/makeStyles';

import { createHelpAction } from '../../../redux/slices/widget';
import Widget, { MODES } from '../../Widget';
import CreateWidgetDialog from './components/CreateWidgetDialog';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
  mainItem: {
    margin: theme.spacing(1, 0),
  },
  helps: {
    marginBottom: theme.spacing(2),
  },
  addHelpWidget: {
    margin: theme.spacing(2, 0, 1),
    float: 'right',
  },
}));

function EditStateHelps({ helps, stateId, createHelp }) {
  const classes = useStyles();
  const t = useTranslate();
  const [helpId, setHelpId] = useState();
  return (
    <>
      <Typography variant="h3" gutterBottom>
        {t('help')}
      </Typography>
      <Grid container justify="center">
        <Grid item xs={12} md={5}>
          <div className={classes.helps}>
            {helps.length > 0 ? (
              <Carousel
                autoPlay={false}
                fullHeightHover={false}
                navButtonsAlwaysInvisible={true}>
                {helps.map((help, index) => (
                  <Paper
                    className={clsx(classes.mainItem, classes.paper)}
                    key={help.id}>
                    <Typography>{t('helpNumber') + (index + 1)}</Typography>
                    {help.widgets.map((widget) => (
                      <Widget
                        key={widget.id}
                        stateId={stateId}
                        widget={widget}
                        mode={MODES.EDIT}
                      />
                    ))}
                    <Button
                      className={classes.addHelpWidget}
                      startIcon={<AddIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => setHelpId(help.id)}>
                      {t('createWidget')}
                    </Button>
                  </Paper>
                ))}
              </Carousel>
            ) : (
                <Typography align="center">{t('thereIsNoItem')}</Typography>
              )}
          </div>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={() => createHelp({ stateId })}>
            {t('createHelp')}
          </Button>
        </Grid>
      </Grid>
      <CreateWidgetDialog
        stateId={helpId}
        open={!!helpId}
        handleClose={() => setHelpId(null)}
      />
    </>
  );
}

export default connect(null, { createHelp: createHelpAction })(EditStateHelps);
