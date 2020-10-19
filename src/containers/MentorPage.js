import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Grid,
  Paper,
  Typography,
  ButtonGroup,
  CssBaseline,
  Hidden,
  Backdrop,
  Badge,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import { connect } from 'react-redux'
import WorkShpoCard from '../components/Cards/Workshop'
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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


const BackButton = () => {
  return (
    <Grid item>
      <Button variant='contained' fullWidth color='primary' startIcon={<ExitToAppIcon />}>
        بازگشت
      </Button>
    </Grid>
  )
}

const MentorPage = ({ mentorRequestNo, isLoading }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Grid container spacing={2} direction='row' justify='space-around'>
        <Grid container item sm={3} xs={12} direction='column' justify='space-between'>
          <Grid item>
            <ButtonGroup orientation='vertical' variant="contained" color="primary" fullWidth>
              <Button startIcon={<ClassIcon />}>
                کارگاه‌ها
              </Button>
              <Button startIcon={<GroupIcon />}>
                تیم‌ها
              </Button>
              <Button>
                <Badge badgeContent={2/*mentorRequestNo* todo*/} color="secondary">
                  درخواست‌ها
                </Badge>
              </Button>
            </ButtonGroup>
          </Grid>
          <Hidden xsDown>
            <Grid item fullWidth>
              <BackButton />
            </Grid>
          </Hidden>
        </Grid>

        <Grid item sm={9} xs={12} justify='center'>
          <Paper elevation={3} classNames={classes.rightBox}>
            <Container className={classes.container}>
              <Grid container item spacing={2} direction='row' justify='flex-start'>
                <Grid item xs={12} sm={4}>
                  <WorkShpoCard
                    name={'هوش مصنوعی'}
                    description={'این کارگاه خیلی قشنگ است. انگشت‌های خود را هم با آن می‌خورید :/'}
                    teamNo={3}
                    mentorNo={6}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <WorkShpoCard
                    name={'هوش مصنوعی'}
                    description={'این کارگاه خیلی قشنگ است. انگشت‌های خود را هم با آن می‌خورید :/'}
                    teamNo={3}
                    mentorNo={6}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <WorkShpoCard
                    name={'هوش مصنوعی'}
                    description={'این کارگاه خیلی قشنگ است. انگشت‌های خود را هم با آن می‌خورید :/'}
                    teamNo={3}
                    mentorNo={6}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <WorkShpoCard
                    name={'هوش مصنوعی'}
                    description={'این کارگاه خیلی قشنگ است. انگشت‌های خود را هم با آن می‌خورید :/'}
                    teamNo={3}
                    mentorNo={6}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <WorkShpoCard
                    name={'هوش مصنوعی'}
                    description={'این کارگاه خیلی قشنگ است. انگشت‌های خود را هم با آن می‌خورید :/'}
                    teamNo={3}
                    mentorNo={6}
                  />
                </Grid>

                <Tooltip arrow title={'اضافه کردن کارگاه جدید'} className={classes.absolute}>
                  <IconButton aria-label="close" /* onClick={handelClose} todo*/>
                    <AddCircleIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Container>
          </Paper>
        </Grid>
        <Hidden smUp>
          <Grid item fullWidth>
            <BackButton />
          </Grid>
        </Hidden>
      </Grid>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container >
  )
}

const mapStateToProps = (state) => {
}

export default connect(
  mapStateToProps,
  {

  }
)(MentorPage)