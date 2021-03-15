
// import
// React, { useState, useEffect } from 'react';
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
// import {
//   // doPayment,
//   // ignorePayment,
// } from '../../redux/actions/account'

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
//     textAlign: 'justify',
//     textJustify: 'inner-character',
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


// const RegistrationTab = ({ doPayment, isFetching, info, ignorePayment, isAllowed, isRegistrationCompleted }) => {
//   const classes = useStyles();
//   const [didPay, setPaymentStatus] = useState(false);

//   const handleRegistration = () => {
//     if (didPay) {
//       ignorePayment();
//       return;
//     } else {
//       doPayment();
//     }
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
//             ثبت‌نام نهایی
//          </Typography>
//         </Grid>
//         <Grid container item direction='row' justify='center' spacing={4}>
//           <Grid item xs={12} sm={6} className={classes.sadImage} />
//           {/* {isAllowed &&
//             <Grid item xs={12} sm={6} className={classes.readyImage} />
//           }
//           {!isAllowed &&
//             <Grid item xs={12} sm={6} className={classes.sadImage} />
//           } */}
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
//                 {'مهلت ثبت‌نام تموم شده :('}
//                 {/* {
//                   isRegistrationCompleted
//                     ? 'خوبه. ثبت‌نام نهایی‌ات با موفقیت انجام شده. ان‌شاالله اطلاعاتت رو بررسی می‌کنیم و اگه مشکلی بود، بهت خبر می‌دیم (;'
//                     : isAllowed
//                       ? 'ایول! اطلاعاتت تکمیله و می‌تونی ثبت‌نامت رو نهایی کنی...'
//                       : 'انگار هنوز اطلاعاتت ناقصه! به بخش «مشخصات من» برو و مشخصاتت رو کامل کن، بعد می‌تونی ثبت‌نامت رو نهایی کنی.'
//                 } */}
//               </Typography>
//             </Grid>
//             {/* {isAllowed && !isRegistrationCompleted &&
//               <>
//                 <Grid item container direction='row' spacing={4} justify='space-around'>
//                   <Grid item xs={1}>
//                     <Checkbox onClick={() => setPaymentStatus(!didPay)} />
//                   </Grid>
//                   <Grid item xs={10} spacing={1} container justify='center' alignItems='center'>
//                     <Typography className={classes.normalText}>
//                       اگر در سال گذشته در مرحله‌ی اول کارسوق ریاضی مهرگان ثبت‌نام کرده بودی، این مورد را تیک بزن.
//                    </Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid item container justify='center'>
//                   <Button variant='contained' color='primary' size='large' onClick={handleRegistration} disabled={isFetching}>
//                     ادامه...
//                   </Button>
//                 </Grid>
//               </>
//             } */}
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
//   info: state.account.info,
//   isFetching: state.account.isFetching,
//   isRegistrationCompleted: ownProps.isRegistrationCompleted,
//   isAllowed: ownProps.isAllowed,
// })

// export default connect(
//   mapStateToProps,
//   {
//     // doPayment,
//     // ignorePayment,
//   }
// )(RegistrationTab);