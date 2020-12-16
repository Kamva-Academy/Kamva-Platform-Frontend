import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  Fab,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Toolbar,
} from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import StatePage from '../components/SpecialComponents/WorkshopPage/StatePage';
import BigAnswerQuestionWidget from '../components/Widget/BigAnswerQuestionWidget/edit'


const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
  },
  title: {
    fontSize: 60,
    color: '#555',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
    },
  },
  body: {
    background: '#F7F9FC',
  },
}));


const Article = ({ }) => {
  return (
    <Grid sx={6}>
      <BigAnswerQuestionWidget open='true' />
    </Grid>
  )
}

const mapStateToProps = (state, ownProps) => ({

})

export default connect(
  mapStateToProps,
  {

  }
)(Article)