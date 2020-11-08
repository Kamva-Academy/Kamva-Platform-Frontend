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
  },
}));

const tabTypes = ['workshops', 'teams', 'requests', 'answers']

const MentorPage = ({
  isLoading,
  getAllWorkshops,
  getUnreadNotifications,
  getTeamAnswers,
  getWorkshopTeams,
}) => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0)
  const [workshop, setWorkshop] = useState(0)


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
    setWorkshop(newValue);
  };

  console.log(tabNumber)

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
                  badgeContent={2 /*mentorRequestsNumber* todo*/}
                  color="secondary">
                  درخواست‌ها
                </Badge>
              </Button>
              <Button
                onClick={() => setTabNumber(3)}
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
            {isLoading && <LinearProgress />}
            <Grid item xs={12}>
              {tabNumber != 0 && tabNumber != 3 &&
                <Tabs
                  value={workshop}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="گرانش" />
                  <Tab label="شار" />
                  <Tab label="کدگذاری" />
                </Tabs>
              }
            </Grid>
            <CardHolder type={tabTypes[tabNumber]} />
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
