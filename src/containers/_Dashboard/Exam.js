// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Grid,
//   makeStyles,
//   Typography,
//   Button,
//   Checkbox,
//   Hidden,
// } from '@material-ui/core';
// import { connect } from 'react-redux';
// import { toast } from 'react-toastify';
// // import {
// //   doPayment,
// //   ignorePayment,
// // } from '../../redux/actions/account'
// // import {
// //   getExamQuestionsList,
// // } from '../../redux/actions/exam'


// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '90vh',
//     width: '100wh',
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   sadImage: {
//     height: '50vh',
//     background: `url(${process.env.PUBLIC_URL + '/sad.png'})`,
//     backgroundSize: 'contain',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center center',
//   },
//   readyImage: {
//     height: '50vh',
//     background: `url(${process.env.PUBLIC_URL + '/ready.png'})`,
//     backgroundSize: 'contain',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center center',
//   },
//   title: {
//     fontSize: 60,
//     color: '#fbebd1',
//     textShadow: '-2px 2px #888',
//     [theme.breakpoints.down('sm')]: {
//       fontSize: 40,
//     },
//   },
//   header3: {
//     fontSize: 25,
//     lineHeight: '30px',
//     textShadow: '-2px 2px 5px #444444',
//     fontWeight: 'bold',
//     color: '#fbebd1',
//     [theme.breakpoints.down('sm')]: {
//       fontSize: 20,
//     },
//   },

//   normalText: {
//     textAlign: 'justify',
//     color: '#fbebd1',
//   }
// }))


// const ExamTab = ({ isFetching, }) => {
//   const classes = useStyles();

//   const showToast = () => {
//     toast.info('مسابقه هنوز شروع نشده. یکم صبر کنین!');
//   }

//   return (
//     <Container style={{ overflow: 'hidden' }}>
//       <div className={`dashboard-background blur`} />
//       <Grid
//         className={classes.root}
//         container
//         justify='space-evenly'
//         alignItems='center'
//         spacing={4}
//       >
//         <Grid item container justify='center'>
//           <Typography variant='h2' className={classes.title} >
//             آزمون‌ها
//           </Typography>
//         </Grid>
//         <Grid container item direction='row' justify='center' spacing={4}>
//           <Grid item xs={12} sm={6} className={classes.readyImage} />
//           <Grid
//             xs={12} sm={5}
//             item
//             container
//             direction='column'
//             justify='center'
//             alignItems='center'
//             spacing={4}
//           >
//             <Grid item container justify='center'>
//               <Typography variant='h3' className={classes.header3} align='center'>
//                 {'آزمون مرحله اول تموم شده :('}
//                 {/* برای ورود به آزمون مرحله اول آماده‌ای؟ */}
//               </Typography>
//             </Grid>
//             {/* <Grid item container justify='center'>
//               <Button href='/exam/1' target="_blank" variant='contained' color='primary' size='large' disabled={isFetching}>
//                 بزن بریم!
//               </Button>
//             </Grid> */}
//           </Grid>
//           <Hidden xsDown>
//             <Grid item xs={12} sm={1} />
//           </Hidden>
//         </Grid>
//       </Grid>
//     </Container >
//   )
// }

// const mapStateToProps = (state, ownProps) => ({
//   isFetching: state.account.isFetching,
// })

// export default connect(
//   mapStateToProps,
//   {
//     // doPayment,
//     // ignorePayment,
//     // getExamQuestionsList,
//   }
// )(ExamTab);
