// import React from 'react';
// import {
//   make,
//   Grid,
//   makeStyles,
// } from '@material-ui/core';
// import { useHistory } from "react-router-dom";
// import { connect } from 'react-redux'
// import {
//   logout,
// } from '../../redux/actions/account'
// import FancyPushButton from '../../components/Fancy/PushButton';

// const useStyles = makeStyles((theme) => ({
//   buttonBar: {
//     [theme.breakpoints.up('sm')]: {
//       position: 'fixed',
//       bottom: theme.spacing(4),
//     },
//     [theme.breakpoints.down('xs')]: {
//       marginBottom: theme.spacing(4),
//     }
//   }
// }));

// const ButtonBar = ({ onClick, logout, isRegistrationCompleted }) => {
//   let history = useHistory();
//   const classes = useStyles();
//   return (
//     <Grid
//       container
//       direction='row'
//       justify='space-around'
//       alignItems='flex-end'
//       spacing={2}
//       xs={12}
//       md={10}
//       className={classes.buttonBar}>
//       <Grid container item justify='center' xs={12} sm={3} lg={3}>
//         <FancyPushButton text='اطلاعیه‌ها' onClick={() => {
//           onClick(0);
//           history.push('/dashboard?tab=announcements')
//         }} />
//       </Grid>
//       {!isRegistrationCompleted &&
//         <Grid container item justify='center' xs={12} sm={3} lg={3}>
//           <FancyPushButton text='ثبت‌نام نهایی' color='green' onClick={() => {
//             onClick(1);
//             history.push('/dashboard?tab=registration')
//           }} />
//         </Grid>
//       }
//       {isRegistrationCompleted &&
//         <Grid container item justify='center' xs={12} sm={3} lg={3}>
//           <FancyPushButton text='آزمون‌ها' color='green' onClick={() => {
//             onClick(3);
//             history.push('/dashboard?tab=exam')
//           }} />
//         </Grid>
//       }
//       <Grid container item justify='center' xs={12} sm={3} lg={3}>
//         <FancyPushButton text='مشخصات' color='dark-blue' onClick={() => {
//           onClick(2);
//           history.push('/dashboard?tab=profile')
//         }} />
//       </Grid>
//       <Grid container item justify='center' xs={12} sm={3} lg={3}>
//         <FancyPushButton text='خروج' color='red' onClick={logout} />
//       </Grid>
//     </Grid>
//   )
// }

// const mapStateToProps = (state, ownProps) => ({
//   onClick: ownProps.onClick,
//   isRegistrationCompleted: ownProps.isRegistrationCompleted,
// })

// export default connect(
//   mapStateToProps,
//   {
//     logout,
//   }
// )(ButtonBar);