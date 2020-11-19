import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  makeStyles,
  Grid,
  Paper,
  ButtonGroup,
  Hidden,
  Backdrop,
  Badge,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  LinearProgress,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  getAllWorkshops,
  getUnreadNotifications,
  getTeamAnswers,
  getWorkshopTeams,
} from '../redux/actions/mentor';
import CreateWorkshopDialog from '../components/Dialog/CreateWorkshopDialog/CreateWorkshopDialog';
import { Link } from 'react-router-dom';
import WorkShopCard from '../components/Cards/WorkshopCard';

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
  cardHolder: {
    padding: theme.spacing(2),
  },
}));

const MentorPage = ({
  isLoading,
  getAllWorkshops,
  getUnreadNotifications,
  getTeamAnswers,
  getWorkshopTeams,
  workshops,
}) => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0);
  const [workshopNumber, setWorkshopNumber] = useState(0);
  const [openCreateWorkshopDialog, setOpenCreateWorkshopDialog] = useState(
    false
  );

  useEffect(() => {
    getAllWorkshops();
    const interval = setInterval(() => {
      getUnreadNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [getAllWorkshops, getUnreadNotifications]);

  const handleChange = (event, newValue) => {
    setWorkshopNumber(newValue);
  };

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
              <ButtonGroup
                orientation="vertical"
                variant="contained"
                color="primary"
                fullWidth>
                <Button
                  onClick={() => setTabNumber(0)}
                  startIcon={<ClassIcon />}>
                  کارگاه‌ها
                </Button>
                <Button
                  onClick={() => setTabNumber(1)}
                  startIcon={<GroupIcon />}>
                  تیم‌ها
                </Button>
                <Button onClick={() => setTabNumber(2)}>
                  <Badge badgeContent={'!'} color="secondary">
                    درخواست‌ها
                  </Badge>
                </Button>
              </ButtonGroup>
            </Grid>
            <Hidden xsDown>
              <Grid item fullWidth>
                <Button
                  variant="contained"
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

          <Grid container item sm={9} xs={12} direction="column">
            <Paper elevation={3} classNames={classes.rightBox}>
              {isLoading && <LinearProgress />}
              <Grid item xs={12}>
                {tabNumber !== 0 && (
                  <Tabs
                    value={workshopNumber}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto">
                    {workshops.map((workshop) => (
                      <Tab label={workshop.name} />
                    ))}
                  </Tabs>
                )}
                {tabNumber === 0 && (
                  <Tooltip
                    arrow
                    title={'اضافه کردن کارگاه جدید'}
                    className={classes.absolute}>
                    <IconButton
                      onClick={() => setOpenCreateWorkshopDialog(true)}>
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid
                container
                item
                spacing={2}
                direction="row"
                className={classes.cardHolder}>
                {workshops.map((workshop) => {
                  return <WorkShopCard {...workshop} />;
                })}
              </Grid>
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
      <CreateWorkshopDialog
        open={openCreateWorkshopDialog}
        handleClose={() => setOpenCreateWorkshopDialog(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops || [],
});

export default connect(mapStateToProps, {
  getAllWorkshops,
  getUnreadNotifications,
  getTeamAnswers,
  getWorkshopTeams,
})(MentorPage);
