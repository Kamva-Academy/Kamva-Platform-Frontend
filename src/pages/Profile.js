import { Grid, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from 'components/template/GeneralLayout';
import AcademicProfile from 'components/template/profiles/AcademicProfile';
import PersonalProfile from 'components/template/profiles/PersonalProfile'
import StudentProfile from 'components/template/profiles/StudentProfile';
import { getUserProfileAction } from 'redux/slices/account';

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
  userInfo,
  event,
}) => {
  const navigate = useNavigate();
  const { programId, section } = useParams();
  const TabComponent = tabs[SECTIONS[section]].component;

  useEffect(() => {
    if (userInfo?.id) {
      getUserProfile({ id: userInfo.id });
    }
  }, [userInfo?.id]);

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
  userInfo: state.account.userInfo,
  event: state.events.event,
});

export default connect(mapStateToProps, {
  getUserProfile: getUserProfileAction,
})(Profile);