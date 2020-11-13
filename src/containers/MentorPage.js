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
  LinearProgress,
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
import {
  getAllWorkshops,
  getUnreadNotifications,
  getTeamAnswers,
  getWorkshopTeams,
} from '../redux/actions/mentor'

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
    zIndex: 5,
  },
}));

const tabTypes = ['workshops', 'teams', 'requests']

const MentorPage = ({
  isLoading,
  getAllWorkshops,
  getUnreadNotifications,
  getTeamAnswers,
  getWorkshopTeams,
  allWorkshops,
  workshopNames,
}) => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0)
  const [workshopNumber, setWorkshopNumber] = useState(0)


  useEffect(() => {
    getAllWorkshops();
    const interval = setInterval(() => {
      getUnreadNotifications();
    }, 10000)

    return (() => {
      clearInterval(interval)
    })
  }, [getAllWorkshops, getUnreadNotifications])


  const handleChange = (event, newValue) => {
    setWorkshopNumber(newValue);
  };

  console.log(workshopNames[workshopNumber])

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Grid container spacing={2} direction="row" justify="center">
        <Grid container item sm={3} xs={12} direction="column" justify="space-between">
          <Grid item>
            <ButtonGroup orientation="vertical" variant="contained" color="primary" fullWidth>
              <Button
                onClick={() => setTabNumber(0)}
                startIcon={<ClassIcon />}
              >
                کارگاه‌ها
              </Button>
              <Button
                onClick={() => setTabNumber(1)}
                startIcon={<GroupIcon />}
              >
                تیم‌ها
              </Button>
              <Button
                onClick={() => setTabNumber(2)}
              >
                <Badge
                  badgeContent={'!'}
                  color="secondary">
                  درخواست‌ها
                </Badge>
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

        <Grid container item sm={9} xs={12} direction='column'>
          <Paper elevation={3} classNames={classes.rightBox}>
            {isLoading && <LinearProgress />}
            <Grid item xs={12}>
              {tabNumber != 0 &&
                <Tabs
                  value={workshopNumber}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {workshopNames.map((workshopName) =>
                    <Tab label={workshopName} />
                  )}
                </Tabs>
              }
              {
                tabNumber === 0 &&
                <Tooltip
                  arrow
                  title={'اضافه کردن کارگاه جدید'}
                  className={classes.absolute}>
                  <IconButton>
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              }
            </Grid>
            <CardHolder
              key={tabTypes[tabNumber]}
              type={tabTypes[tabNumber]}
              workshop={workshopNames[workshopNumber]}
            />
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
  const allWorkshops = [{
    "id": 1,
    "name": "ای لیمپیاد",
    "active": true,
    "fsm_learning_type": "noMentor",
    "fsm_p_type": "hybrid",
    "first_state": 1
  },
  {
    "id": 1,
    "name": "اوی لیمپیاد",
    "active": true,
    "fsm_learning_type": "noMentor",
    "fsm_p_type": "hybrid",
    "first_state": 1
  }]
  const workshopNames = allWorkshops.map((workshop) => {
    return workshop.name
  })
  return ({
    workshopNames,
    allWorkshops,//: state.mentor.allWorkshops,
  })
};

export default connect(
  mapStateToProps,
  {
    getAllWorkshops,
    getUnreadNotifications,
    getTeamAnswers,
    getWorkshopTeams,
  }
)(MentorPage);
