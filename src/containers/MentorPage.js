import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  makeStyles,
  Grid,
  Paper,
  ButtonGroup,
  Hidden,
  Badge,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import { getWorkshopTeams } from '../redux/actions/mentor';
import { connect } from 'react-redux';
import {
  getAllWorkshops,
  getUnreadNotifications,
} from '../redux/actions/mentor';
import { Link } from 'react-router-dom';
import MentorWorkshops from '../components/SpecialComponents/MentorPage/MentorWorkshops';
import Teams from '../components/SpecialComponents/MentorPage/Teams';

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
}));

const MentorPage = ({
  workshops,
  teams,
  getAllWorkshops,
  getUnreadNotifications,
  getWorkshopTeams,
}) => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      getUnreadNotifications();
    }, 10000);
    return () => clearInterval(interval);
  }, [getUnreadNotifications]);

  useEffect(() => {
    workshops.forEach((workshop) => {
      if (!teams[workshop.id]) {
        getWorkshopTeams({ fsmId: workshop.id });
      }
    });
  }, [getWorkshopTeams, workshops, teams]);

  useEffect(() => {
    getAllWorkshops();
  }, [getAllWorkshops]);

  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={2} direction="row" justify="center">
          <Grid
            container
            item
            sm={3}
            xs={12}
            direction="column"
            justify="space-between">
            <Grid item>
              <ButtonGroup orientation="vertical" color="primary" fullWidth>
                <Button
                  onClick={() => setTabNumber(0)}
                  variant={tabNumber === 0 && 'contained'}
                  startIcon={<ClassIcon />}>
                  کارگاه‌ها
                </Button>
                <Button
                  onClick={() => setTabNumber(1)}
                  variant={tabNumber === 1 && 'contained'}
                  startIcon={<GroupIcon />}>
                  تیم‌ها
                </Button>
                <Button
                  onClick={() => setTabNumber(2)}
                  variant={tabNumber === 2 && 'contained'}>
                  <Badge badgeContent={'!'} color="secondary">
                    درخواست‌ها
                  </Badge>
                </Button>
              </ButtonGroup>
            </Grid>
            <Hidden xsDown>
              <Grid item fullWidth>
                <Button
                  fullWidth
                  color="primary"
                  component={Link}
                  to="/"
                  startIcon={<ExitToAppIcon />}>
                  بازگشت
                </Button>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Paper elevation={3} classNames={classes.rightBox}>
              {tabNumber === 0 && <MentorWorkshops />}
              {tabNumber === 1 && <Teams />}
              {tabNumber === 2 && <Teams mode="notifications" />}
            </Paper>
          </Grid>
          <Hidden smUp>
            <Grid item fullWidth>
              <Button fullWidth color="primary" startIcon={<ExitToAppIcon />}>
                بازگشت
              </Button>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops,
  teams: state.mentor.teams,
});

export default connect(mapStateToProps, {
  getAllWorkshops,
  getUnreadNotifications,
  getWorkshopTeams,
})(MentorPage);
