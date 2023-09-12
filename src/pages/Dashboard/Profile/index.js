import { Grid, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from 'redux/slices/account';
import Layout from 'components/template/GeneralLayout';
import AcademicProfile from './AcademicProfile';
import PersonalProfile from './PersonalProfile'
import StudentProfile from './StudentProfile';
import Iran from 'utils/iran';

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
  getUserProfile,
  getInstitutes,
  event,
  userAccount,
}) => {
  const navigate = useNavigate();
  const { programId, section } = useParams();
  const TabComponent = tabs[SECTIONS[section]].component;

  if (event?.audience_type == 'Student') {
    tabs = [tabs[0], tabs[1]];
  } else if (event?.audience_type == 'Academic') {
    tabs = [tabs[0], tabs[2]];
  } else if (event?.audience_type == 'All') {
    tabs = [tabs[0]];
  }

  useEffect(() => {
    if (!userAccount) return;
    getUserProfile({ id: userAccount.id }).then(({ type, payload: { response } }) => {
      if (!type.endsWith('fulfilled')) return;
      // check if user has sat city, then fetch city's institutes
      if (!response.city) return;
      getInstitutes({ cityTitle: Iran.Cities.find(city => response.city == city.title).title });

    });
  }, [userAccount]);

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
              onChange={(event, newValue) => navigate(programId ? `/program/${programId}/profile/${tabs[newValue].name}` : `/profile/${tabs[newValue].name}`)}>
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