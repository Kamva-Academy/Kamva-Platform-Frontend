import './Style.css';

import {
  Button,
  Container,
  Fab,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ResponsiveAppBar from '../../../components/Appbar/ResponsiveAppBar';
import AuthDialog from '../../../components/Dialog/AuthDialog/AuthDialog';
import ScrollTop from '../../../components/ScrollToTop/ScrollToTop';
import questions from '../../../components/SpecialComponents/Homepage/constants/FAQs';
import FAQ from '../../../components/SpecialComponents/Homepage/FAQ';
import Footer from '../../../components/SpecialComponents/Homepage/Footer';
import LandingOurTeam from '../../../components/SpecialComponents/Homepage/LandingOurTeam';
import WorkshopList from '../../../components/SpecialComponents/Homepage/WorkshopList';
import BombImage from './Bomb';


export const BOMB_HEIGHT = 500;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'black',
    height: '1500vh',
  },
  countDownSection: {
    height: `${BOMB_HEIGHT}vh`,
    position: 'fixed',
    top: 0,
  },
  fullHeight: {
    minHeight: '100vh',
  },
  title: {
    fontSize: 80,
    lineHeight: '80px',
    fontWeight: 900,
    color: '#eee',
    textShadow: '3px 3px #888',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 60,
      lineHeight: '70px',
    },
  },
  emptySection: {
    height: `${BOMB_HEIGHT + 100}vh`,
  },
  secondSection: {
    position: 'relative',
    height: '100vh',
  },
  secondSectionBackground: {
    position: 'absolute',
    top: `${BOMB_HEIGHT + 100}vh`,
    height: '100%',
    width: '100%',
    backgroundImage: `url(${process.env.PUBLIC_URL}/ZeroJourneyer/background.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(6px)',
    webkitFilter: 'blur(6px)',
  },
  logo: {
    maxHeight: '95vh',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '50vh',
    },
  },



  headButton: {
    display: 'inline-block',
    border: '1px solid #2185d0',
    background: 'rgba(33,133,208,.6)',
    borderRadius: '10px',
    transition: '.3s',
    fontSize: 45,
    lineHeight: '45px',
    fontWeight: 800,
    color: '#eee',
    textShadow: '3px 3px #888',
    padding: theme.spacing(2, 3),
    margin: theme.spacing(6, 2),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
      lineHeight: '30px',
      padding: theme.spacing(1, 2),
    },
  },
  goToWorkshop: {
    border: '1px solid #2185d0',
    background: 'rgba(33,133,208,.6)',
    color: '#eee',
    textShadow: '3px 3px #888',
  },
  physicsDayContainer: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  physicsDay: {
    display: 'inline-block',
    borderRadius: '10px',
    transition: '.3s',
    fontSize: 30,
    lineHeight: '30px',
    fontWeight: 700,
    padding: theme.spacing(1, 2),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
      lineHeight: '25px',
      padding: theme.spacing(1, 2),
    },
    border: '1px solid #35be32',
    background: 'rgba(53,190,50,.6)',
    color: '#eee',
    textShadow: '3px 3px #888',
  },
  newton: {
    height: 100,
    [theme.breakpoints.down('sm')]: {
      height: 80,
    },
  },
  section2: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#99b898',
    color: 'white',
  },
  h_iframe_aparat_embed_frame: {
    position: 'relative',
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      boxShadow: '0 2px 4px rgb(0 0 0 / 15%), 0 1px 3px rgb(0 0 0 / 25%)',
      borderRadius: 8,
    },
    '& span': {
      display: 'block',
      paddingTop: '57%',
    },
  },
  telegramLink: {
    display: 'inline-block',
    marginRight: 10,
    color: 'rgb(85, 85, 255)',
  },
  section2Paper: {
    padding: theme.spacing(2),
    '& img': {
      width: '100%',
    },
  },
  section3: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#e84a5f',
    color: 'white',
  },
  moreButton: {
    margin: theme.spacing(2, 'auto', 0),
    textAlign: 'center',
    display: 'table',
  },

  section4: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#feceab',
  },

  section5: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#ededed',
  },
}));


const ZeroJourneyer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container className={classes.countDownSection}>
        <BombImage />
      </Container>

      <Container className={classes.emptySection} />


      <div className={classes.secondSectionBackground} />
      <Container className={classes.secondSection}>
        <Grid
          container
          justify='space-around'
          alignItems='center'
          className={classes.fullHeight}>
          <Grid item container justify='center' alignItems='center' xs={12} md={6}>
            <img className={classes.logo} src={process.env.PUBLIC_URL + '/ZeroJourneyer/logo.png'} alt='' />
          </Grid>
          <Grid item container justify='center' xs={12} md={6} style={{ height: '30vh' }} >
            <Typography variant="h2" align="center" className={classes.title}>
              مسافر صفر
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <section className={classes.section2}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={3}>
          <Grid item container xs={12} spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography component="h2" variant="h2" gutterBottom>
                قضیه چیه؟
              </Typography>
              <Typography variant="subtitle1">
                تابستون هم که داره تموم میشه و حتی اینبار مدرسه‌ها دو هفته زودتر
                قراره باز بشن. با این وضع کرونا هم که نه تفریح درست و حسابی
                کردیم، نه دوستامونو دیدیم، نه فعالیت گروهی نه هیچی.
              </Typography>
              <Typography variant="subtitle1">
                اگر که موارد بالا در مورد شما هم صدق می‌کنه ما یه راه‌حل خوب
                براتون داریم :)
              </Typography>
              <Typography variant="subtitle1">
                به رسم هر ساله، جمع رستا امسال هم رویداد تابستانه خودش رو برگزار
                می‌کنه؛ فقط امسال باتوجه به وضعیت اپیدمی موجود، رویدادمون به
                صورت آنلاین خواهد بود.
              </Typography>
              <Typography variant="subtitle1">
                تیم رستا در چند ماه گذشته تلاش بسیاری کرده تا در بستر آنلاین
                بتونه همون تعامل بین شرکت‌کننده‌ها و منتورها رو ایجاد کنه، البته
                اینبار از قابلیت‌های فضای آنلاین هم برای آموزش هرچه موثرتر
                استفاده می‌کنیم.
              </Typography>
              <Typography variant="subtitle1">
                خلاصه اگه دوست دارید با دوستاتون یه رویداد جذاب و باحال رو این
                آخرای تابستون شرکت کنید و کلی هم مطالب خفن و خوب یاد بگیرین،
                رویداد تابستانه رستا رو از دست ندید.
              </Typography>
              <Typography variant="subtitle1">
                با ما باشید، دوستاتون رو خبر کنید و اگه سوالی هم داشتید همین جا
                بپرسید یا به کانالمون در تلگرام سر بزنید:
                <a
                  // eslint-disable-next-line react/jsx-no-target-blank
                  target="_blank"
                  rel="noreferrer"
                  href="https://t.me/rastaiha"
                  className={classes.telegramLink}
                  style={{ direction: 'ltr' }}>
                  {' @Rastaiha '}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.h_iframe_aparat_embed_frame}>
                <span></span>
                <iframe
                  title="کارگاه‌های رستا"
                  src="https://www.aparat.com/video/video/embed/videohash/qriEx/vt/frame"
                  allowFullScreen
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"></iframe>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper className={classes.section2Paper}>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12} sm={4}>
                  <img
                    src={process.env.PUBLIC_URL + '/edu_student.png'}
                    alt=""
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="h3" align="center" gutterBottom>
                    کارگاه مجازی
                  </Typography>
                  <Typography variant="subtitle1">
                    امسال باتوجه به آنلاین بودن رویداد دو دسته کارگاه طراحی
                    کردیم. در دسته اول منتورها کنارتون حضور دارن و بهتون کمک
                    میکنن و در دسته دوم سعی کردیم یه سری کارگاه طراحی کنیم که
                    بدون حضور منتور و به صورت خودآموز و قدم‌به‌قدم، مطالب رو به
                    شما آموزش بدن.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper className={classes.section2Paper}>
              <Grid container spacing={2} direction="row-reverse">
                <Grid item xs={12} sm={4}>
                  <img src={process.env.PUBLIC_URL + '/edu.png'} alt="" />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="h3" align="center" gutterBottom>
                    ارتباط با منتور
                  </Typography>
                  <Typography variant="subtitle1">
                    بروبچه‌های تیم طراحی و منتورهای کارگاه، برای آموزش‌ هرچه
                    بهتر و کمک به شما در این روند، اینجا منتظرن تا هروقت سوالی
                    ازشون داشتید یا خواستید چیزی رو باهاشون مطرح کنید کمکتون
                    کنن.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper className={classes.section2Paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <img src={process.env.PUBLIC_URL + '/team-work.png'} alt="" />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="h3" align="center" gutterBottom>
                    کار گروهی
                  </Typography>
                  <Typography variant="subtitle1">
                    در رستا، آموزش بر اساس تعامل در کار گروهی و کار بر مسئله‌های
                    چالش‌برانگیز، واقعی و نزدیک به دنیای فکری مخاطبین است. هدف
                    رستا از انتخاب آموزش مسئله و تعامل‌محور، ایجاد خلاقیت و
                    یادگیری عمیق دانش‌آموزان است.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </section>
      <section className={classes.section3}>
        <Typography component="h2" variant="h2" gutterBottom>
          رستا چیه؟
        </Typography>
        <Typography variant="subtitle1">
          رستا جمعی علمی-ترویجی متشکل از دانشجوهای دانشگاه‌های صنعتی اصفهان،
          تهران، شریف، اصفهان، بهشتی و ... هست؛
        </Typography>
        <Typography variant="subtitle1">
          جمعی که در تلاشه تا آموزش تعاملی رو جایگزین آموزش کنکوری و حفظی کنه و
          با اینکار، علاوه بر یاد دادن محتوای علمی به نحوه‌ای موثرتر، تفکر منطقی
          و خلاقیتِ بچه‌ها رو تقویت کنه و با نشون دادنِ توانمندی‌های بالقوه‌ی
          بچه‌ها به خودشون، اعتماد به نفسِ اونهارو افزایش بده.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.moreButton}
          component={Link}
          to="/about_us">
          اطلاعات بیشتر
        </Button>
      </section>
      <section className={classes.section4}>
        <Typography component="h2" variant="h2" gutterBottom>
          کارگاه‌ها
        </Typography>
        <WorkshopList />
      </section>
      <section className={classes.section5}>
        <Typography component="h2" variant="h2" gutterBottom align="center">
          پرسش‌های متداول
        </Typography>
        <Container maxWidth="sm">
          <FAQ questions={questions} />
        </Container>
      </section>

      <LandingOurTeam />
      <Footer />
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({

})

export default connect(
  mapStateToProps,
  {

  }
)(ZeroJourneyer);