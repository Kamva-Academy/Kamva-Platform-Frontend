import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../../redux/slices/account';
import Layout from '../../Layout';
import AcademicProfile from './AcademicProfile';
import PersonalProfile from './PersonalProfile'
import StudentProfile from './StudentProfile';

let tabs = [
  {
    name: 'personal',
    label: 'مشخصات فردی',
    icon: '',
    component: PersonalProfile,
    disabled: false,
  },
  {
    name: 'student',
    label: 'مشخصات دانش‌آموزی',
    icon: '',
    component: StudentProfile,
    disabled: false,

  },
  {
    name: 'academic',
    label: 'مشخصات دانشجویی',
    icon: '',
    component: AcademicProfile,
    disabled: true,
  },
];

const SECTIONS = {
  personal: 0,
  student: 1,
  academic: 2,
}

const Profile = ({
  event,
}) => {
  const navigate = useNavigate();
  const { eventId, section } = useParams();
  const TabComponent = tabs[SECTIONS[section]].component;

  if (event?.audience_type == 'Student') {
    tabs = [tabs[0], tabs[1]];
  } else if (event?.audience_type == 'Academic') {
    tabs = [tabs[0], tabs[2]];
  } else if (event?.audience_type == 'All') {
    tabs = [tabs[0]];
  }

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
              onChange={(event, newValue) => navigate(eventId ? `/event/${eventId}/profile/${tabs[newValue].name}` : `/profile/${tabs[newValue].name}`)}>
              {
                tabs.map((tab, index) => {
                  return (
                    <Tab disabled={tab.disabled} key={index} label={tab.label} />
                  )
                })
              }
            </Tabs>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={9}>
          <TabComponent tabs={tabs.map(tab => tab.name)} />
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
})(Profile);