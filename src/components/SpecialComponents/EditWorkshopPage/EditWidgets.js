import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';

import {
  removeStateAction,
  updateStateAction,
} from '../../../redux/slices/workshop2';
import AreYouSure from '../../Dialog/AreYouSure';
import Widget, { MODES } from '../../Widget';
import CreateWidgetDialog from './components/CreateWidgetDialog';

const useStyles = makeStyles((theme) => ({
  workshopContent: {
    paddingTop: 20,
  },
  paper: {
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
}));

function EditWidgets({
  removeState,
  updateState,

  widgets = [],
  id: stateId,
  name
}) {
  const classes = useStyles();
  const t = useTranslate();
  const { fsmId } = useParams()
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [isEditingStateName, setIsEditingStateName] = useState(false);
  const [newName, setNewName] = useState();

  useEffect(() => {
    if (name) {
      setNewName(name)
    }
  }, [name])

  const questions = widgets?.filter((widget) =>
    widget.widget_type.includes('Problem')
  );

  const notQuestions = widgets?.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  return (
    <>
      <Grid container spacing={2} className={classes.workshopContent} justify="center">
        {stateId &&
          <>
            <Grid item sm={3} />
            <Grid item xs={12} sm={6}>
              {isEditingStateName &&
                <TextField
                  onChange={(e) => setNewName(e.target.value)}
                  fullWidth variant='outlined'
                  defaultValue={name} />
              }
              {!isEditingStateName &&
                <Typography align="center" variant="h1" gutterBottom>
                  {name}
                </Typography>
              }
            </Grid>
            <Grid item container justify='flex-end' alignItems='flex-start' xs={12} sm={3}>
              <Grid item>
                {isEditingStateName &&
                  <Tooltip title='ذخیره' arrow>
                    <IconButton size='small'
                      onClick={() => {
                        updateState({ stateId, name: newName, fsm: fsmId });
                        setIsEditingStateName(false);
                      }
                      }>
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                }
                {!isEditingStateName &&
                  <Tooltip title='ویرایش نام' arrow>
                    <IconButton size='small' onClick={() => setIsEditingStateName(true)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                }
              </Grid>
              <Grid item>
                <Tooltip title='حذف گام' arrow>
                  <IconButton size='small' onClick={() => setOpenDeleteWidgetDialog(true)}>
                    <DeleteIcon style={{ color: 'red' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </>
        }
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>
            {'سوالات'}
          </Typography>
          <Divider />
        </Grid>
        {
          questions.map((widget) => (
            <Grid item xs={12} key={widget.index}>
              <Paper className={classes.paper}>
                <Widget
                  stateId={stateId}
                  widget={widget}
                  mode={MODES.EDIT}
                />
              </Paper>
            </Grid>
          ))
        }
        {questions?.length === 0 &&
          <Grid item xs={12}>
            <Box m={2}>
              <Typography variant='h4' align="center">{'سوالی در این گام وجود ندارد!'}</Typography>
            </Box>
          </Grid>
        }
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>
            {'محتواها'}
          </Typography>
          <Divider />
        </Grid>
        {
          notQuestions.map((widget) => (
            <Grid key={widget.id} item xs={12}>
              <Paper className={classes.paper}>
                <Widget
                  stateId={stateId}
                  widget={widget}
                  mode={MODES.EDIT}
                />
              </Paper>
            </Grid>
          ))
        }
        {notQuestions?.length === 0 &&
          <Grid item xs={12}>
            <Box m={2}>
              <Typography variant='h4' align="center">{'محتوایی در این گام وجود ندارد!'}</Typography>
            </Box>
          </Grid>
        }
        {stateId &&
          <Grid item xs={12} md={6} container justify="center">
            <Button
              color="primary" variant="contained"
              fullWidth startIcon={<Add />}
              onClick={() => setOpenCreateWidgetDialog(true)}>
              {t('createWidget')}
            </Button>
          </Grid>
        }
      </Grid>
      <CreateWidgetDialog
        stateId={stateId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />
      <AreYouSure
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        callBackFunction={() => removeState({ stateId })}
      />
    </>
  );
}

export default connect(
  null,
  {
    removeState: removeStateAction,
    updateState: updateStateAction,
  }
)(EditWidgets);
