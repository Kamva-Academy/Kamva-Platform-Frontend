// import React, { useState, useEffect } from 'react';
// import Announcement from '../../components/Cards/Notification';
// import {
//   Container,
//   Grid,
//   Typography,
// } from '@material-ui/core';
// import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '90vh',
//     width: '100wh',
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   announcements: {
//     height: '55vh',
//     borderRadius: '5px',
//     backgroundColor: 'rgba(76, 173, 211, 70%)',
//     overflowY: 'scroll',
//     margin: 15,
//     boxShadow: '-5px 5px 20px #62b1d1',
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
//     backgroundColor: '#d1d1d1',
//     textShadow: '-1px 1px #888',
//     textAlign: 'center',
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
// }));

// const AnnouncementsTab = ({ status, isRegistrationCompleted, didPaymentFail }) => {
//   const classes = useStyles();

//   return (
//     <Container style={{ overflow: 'hidden' }}>
//       <div className={`dashboard-background blur`} />
//       <Grid
//         className={classes.root}
//         container
//         justify='center'
//         alignItems='center'
//         spacing={4}
//       >
//         <Grid item container justify='center'>
//           <Typography variant='h2' className={classes.title} >
//             اطلاعیه‌ها
//           </Typography>
//         </Grid>
//         <Grid
//           xs={12} sm={8}
//           className={`${classes.announcements} announcements`}
//           item container
//           justify='center'
//           alignItems='center'
//           spacing={2}>

//           <Grid item xs={12}>
//             <Announcement title='نظرسنجی' date='۲۳ اسفند ۹۹' image='survey.png' text='قطعا در برگزاری مرحله اول مشکلاتی داشتیم که بابتش ازتون عذرخواهی می‌کنیم. لطفاً شما هم با پرکردن نظرسنجی زیر به ما برای ادامه‌ی بهتر اینترکارسولار کمک کنید!' linkURL='https://formaloo.com/interkarsolar' linkText='لینک نظرسنجی' />
//           </Grid>

//           <Grid item xs={12}>
//             <Announcement title='پایان مرحله یک' date='۱۲ اسفند ۹۹' image='announcement.jpg' text='خداروشکر مرحله اول کارسوق امسال هم به خوبی و خوشی تموم شد! امیدواریم لذت برده باشین. اخبار بعدیمون رو از طریق کانال کارسوق (@karsooghmehregan) دنبال کنید!' />
//           </Grid>
//           <Grid item xs={12}>
//             <Announcement title='مرحله یک شروع شد!' date='۸ اسفند ۹۹' image='announcement.jpg' text='بالاخره مرحله یک شروع شد! اگه پیش‌تر ثبت‌نام کردی، می‌تونی از همین الان وارد بخش «آزمون‌ها» بشی و مرحله اول رو شروع کنی! اگه سوالی برات پیش اومد، از ادمین کارسوق بپرسین!' />
//           </Grid>
//           <Grid item xs={12}>
//             <Announcement title='داغ‌ترین اخبار!' date='۸ اسفند ۹۹' image='changePassword.png' text='کم‌کم داره مرحله یک شروع میشه. برای اطلاع از آخرین اخبار و اطلاعیه‌های آزمون، عضو کانال کارسوق در تلگرام، بله یا ایتا (@karsooghmehregan) بشید.' />
//           </Grid>
//           {didPaymentFail &&
//             < Grid item xs={12}>
//               <Announcement title='ای بابا!' date='همین چند لحظه پیش' image='ohDad.png' text='به نظر می‌رسه که پرداختت با موفقیت به پایان نرسیده. اگه پولی از حسابت کم شده ولی ثبت‌نامت نهایی نشده، به ادمینِ کاروسق توی بله، اینستاگرام یا تلگرام پیام بده تا پیگیری کنیم :)' />
//             </Grid>
//           }
//           {isRegistrationCompleted &&
//             <Grid item xs={12}>
//               <Announcement title='ثبت‌نامت تکمیله!' date='' image='greenCheck.png' text='ایول! ثبت‌نامت با موفقیت انجام شده و حالا باید منتظر مرحله اول بمونی. ۸ اسفند شروع مرحله یکه!' />
//             </Grid>
//           }
//           {!isRegistrationCompleted &&
//             <Grid item xs={12}>
//               <Announcement title='هنوز ثبت‌نامت نهایی نشده!' date='' image='redX.png' text='سیارک‌دار گرامی توجه کن! ثبت‌نامت هنوز نهایی نشده. برای نهایی‌کردن ثبت‌نام باید به بخش «ثبت‌نام نهایی» بری.' />
//             </Grid>
//           }
//           <Grid item xs={12}>
//             <Announcement title='تمدید مهلت ثبت‌نام' date='۳۰ بهمن ۹۹' image='announcement.jpg' text='خب خبر خوب اینکه مهلت ثبت‌نام مرحله اول تا ۵ ام اسفند تمدید شد!' />
//           </Grid>
//           <Grid item xs={12}>
//             <Announcement title='آغاز ثبت‌نام مرحله یک' date='۲۵بهمن۹۹' image='announcement.jpg' text='بله! بعد از یک سال دوری از شما سیارک‌داران گرامی، دوباره با دوره‌ی دوم رویداد اینترکارسولار در خدمت شما هستیم! ثبت‌نام اینترکارسولار از امروز شروع شده و تا اول اسفند ادامه داره. بدو جا نمونی... ' />
//           </Grid>

//         </Grid>
//       </Grid>
//     </Container >
//   );
// };

// const mapStateToProps = (state, ownProps) => ({
//   status: state.account.info
//     ? state.account.info.status
//     : 0,
//   isFetching: state.account.isFetching,
//   isRegistrationCompleted: ownProps.isRegistrationCompleted,
//   didPaymentFail: ownProps.didPaymentFail,
// })

// export default connect(mapStateToProps, {})(AnnouncementsTab);
