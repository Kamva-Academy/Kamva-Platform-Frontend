import {
  Button,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../../redux/slices/account';
import Layout from '../../Layout';
import PersonalProfile from './PersonalProfile'
import StudentProfile from './StudentProfile';


const useStyles = makeStyles((theme) => ({
  profileImage: {
    maxHeight: '100px',
    borderRadius: '5px',
  },
  logo: {
    height: 100,
  },
  formControl: {
    width: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
}));


const tabs = [
  {
    name: 'personal',
    label: 'مشخصات فردی',
    icon: '',
    component: PersonalProfile,
  },
  {
    name: 'student',
    label: 'مشخصات دانش‌آموزی',
    icon: '',
    component: StudentProfile,
  },
];

const SECTIONS = {
  personal: 0,
  student: 1,
}




const Index = ({
  event,
}) => {
  const { eventId, section } = useParams();
  const history = useHistory();
  const [tabNumber, setTabNumber] = useState(0);

  const classes = useStyles();

  const TabComponent = tabs[SECTIONS[section]].component;

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        spacing={4}>
        <Grid container item xs={12} sm={3} direction='column' spacing={2}>
          <Grid item>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={SECTIONS[section]}
              onChange={(event, newValue) => history.push(eventId ? `/event/${eventId}/profile/${tabs[newValue].name}` : `/profile/${tabs[newValue].name}`)}>
              {
                tabs.map((tab, index) => {
                  return (
                    <Tab key={index} label={tab.label} />
                  )
                })
              }
            </Tabs>
          </Grid>
          {eventId &&
            <>
              <Grid item>
                {event?.audience_type == 'Student' ? (
                  <Typography variant='h3' color='error'>
                    {'تکمیل موارد ستاره‌دار در هر دو قسمت «مشخصات فردی» و «مشخصات دانش‌آموزی» الزامی است.'}
                  </Typography>
                ) : (event?.audience_type == 'Academic' ? (
                  <Typography variant='h3' color='error'>
                    {'تکمیل موارد ستاره‌دار در هر دو قسمت «مشخصات فردی» و «مشخصات دانشجویی» الزامی است.'}
                  </Typography>
                ) : (
                  <Typography variant='h3' color='error'>
                    {'تکمیل موارد ستاره‌دار را الزامی است.'}
                  </Typography>
                ))}
              </Grid>
              <Grid item>
                <Button component={Link} to={`/event/${eventId}/`} fullWidth variant='outlined'>
                  {'بازگشت به رویداد'}
                </Button>
              </Grid>
            </>
          }

        </Grid>
        <Grid container item xs={12} sm={9}>
          <TabComponent />
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  event: state.events.event,
  userAccount: state.account.userAccount,
  userProfile: state.account.userProfile,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
  institutes: state.account.institutes,
});

export default connect(mapStateToProps, {
  updateUserAccount: updateUserAccountAction,
  getUserProfile: getUserProfileAction,
  updateStudentShip: updateStudentShipAction,
  getInstitutes: getInstitutesAction,
})(Index);

// todo: cast english digits to persian
