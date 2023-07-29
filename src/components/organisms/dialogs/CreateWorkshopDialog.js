import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';

import { createWorkshopAction } from 'redux/slices/events';

function CreateWorkshopDialog({
  createWorkshop,
  open,
  handleClose,
}) {
  const t = useTranslate();
  const { eventId } = useParams();
  const [properties, setProperties] = useState({
    name: '',
    description: '',
    fsm_learning_type: '',
    fsm_p_type: '',
    event: eventId,
  });

  const putData = (event) => {
    setProperties({
      ...properties,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>{t('createWorkshop')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('specifyNameAndTypeOfWorkshop')}
        </DialogContentText>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              autoFocus
              variant='outlined'
              label={t('workshopName')}
              name='name'
              onChange={putData}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>نوع آموزش</InputLabel>
              <Select
                onChange={putData}
                name='fsm_learning_type'
                label='نوع آموزش'>
                <MenuItem value={'Supervised'}>{'با همیار'}</MenuItem>
                <MenuItem value={'Unsupervised'}>{'بدون همیار'}</MenuItem>
              </Select>
            </FormControl >
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>وضعیت تیم</InputLabel>
              <Select
                onChange={putData}
                name='fsm_p_type'
                label='وضعیت تیم'>
                <MenuItem value={'Individual'}>{'فردی'}</MenuItem>
                <MenuItem value={'Team'}>{'تیمی'}</MenuItem>
                <MenuItem value={'Hybrid'}>{'هیبرید'}</MenuItem>
              </Select>
            </FormControl >
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoFocus
              variant='outlined'
              label={'توضیحات'}
              name='description'
              onChange={putData}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            createWorkshop(properties);
            handleClose();
          }}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  null,
  {
    createWorkshop: createWorkshopAction
  }
)(CreateWorkshopDialog);
