import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PersonalProfile from './PersonalProfile'
import StudentProfile from './StudentProfile';

import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../../redux/slices/account';
import Iran from '../../../utils/iran';
import { toEnglishNumber } from '../../../utils/translateNumber';
import Layout from '../../Layout';


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
    label: 'مشخصات فردی',
    icon: '',
    component: PersonalProfile,
  },
  {
    label: 'مشخصات دانش‌آموزی',
    icon: '',
    component: StudentProfile,
  },
];

const Index = ({
  updateUserAccount,
  getUserProfile,
  updateStudentShip,
  getInstitutes,
  userAccount,
  userProfile,
  institutes,
}) => {
  const [tabNumber, setTabNumber] = useState(0);
  const classes = useStyles();



  const TabComponent = tabs[tabNumber].component;

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        spacing={3}>
        <Grid container item xs={12} sm={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabNumber}
            onChange={(event, newValue) => setTabNumber(newValue)}>
            {
              tabs.map((tab, index) => {
                return (
                  <Tab key={index} label={tab.label} />
                )
              })
            }
          </Tabs>
        </Grid>
        <Grid container item xs={12} sm={9}>
          <TabComponent />
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
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
