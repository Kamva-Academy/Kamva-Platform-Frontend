import {
  Grid,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import makeStyles from '@mui/styles/makeStyles';
import { Workshop } from '../../types/models';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: 2,
    zIndex: 5,
  },
}));

type InfoPropsType = {
  workshop: Workshop;
}

const Info: FC<InfoPropsType> = ({
  workshop,
}) => {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>{workshop?.name}</Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography align='center'>{workshop?.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  workshop: state.workshop.workshop,
});

export default connect(
  mapStateToProps,
  {
  }
)(Info);