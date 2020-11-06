import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  makeStyles,
  Grid,
  Paper,
  ButtonGroup,
  CssBaseline,
  Hidden,
  Backdrop,
  Badge,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import { connect } from 'react-redux';
import WorkshopCard from '../components/Cards/WorkshopCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';
import CardHolder from '../components/Cards/CardHolder'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  rightBox: {
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
  },
}));

const MentorPage = ({ mentorRequestsNumber, isLoading, cards }) => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)

  const handleChange = (event, newValue) => {
    setTabNumber(newValue);
  };

  console.log(tabNumber)

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Grid container spacing={2} direction="row" justify="space-around">
        <Grid container item sm={3} xs={12} direction="column" justify="space-between">
          <Grid item>
            <ButtonGroup orientation="vertical" variant="contained" color="primary" fullWidth>
              <Button
                onClick={() => setPageNumber(0)}
                startIcon={<ClassIcon />}
              >
                کارگاه‌ها
              </Button>
              <Button
                onClick={() => setPageNumber(1)}
                startIcon={<GroupIcon />}
              >
                تیم‌ها
              </Button>
              <Button
                onClick={() => setPageNumber(2)}
              >
                <Badge
                  badgeContent={2 /*mentorRequestsNumber* todo*/}
                  color="secondary">
                  درخواست‌ها
                </Badge>
              </Button>
              <Button
                onClick={() => setPageNumber(3)}
                startIcon={<CreateIcon />}
              >
                پاسخ‌ها
              </Button>
            </ButtonGroup>
          </Grid>
          <Hidden xsDown>
            <Grid item fullWidth>
              <Button variant="contained" fullWidth color="primary" startIcon={<ExitToAppIcon />}>
                بازگشت
              </Button>
            </Grid>
          </Hidden>
        </Grid>

        <Grid container item sm={9} xs={12} justify="center" direction='column'>
          <Paper elevation={3} classNames={classes.rightBox}>
            <Grid item xs={12}>
              <Tabs
                value={tabNumber}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                centered
              >

                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
              </Tabs>
            </Grid>
            <CardHolder tabNumber={tabNumber} />
          </Paper>
        </Grid>
        <Hidden smUp>
          <Grid item fullWidth>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              startIcon={<ExitToAppIcon />}>
              بازگشت
            </Button>
          </Grid>
        </Hidden>
      </Grid>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

const mapStateToProps = (state) => {

  return ({
    cards: [],
  })

};

export default connect(mapStateToProps, {})(MentorPage);
