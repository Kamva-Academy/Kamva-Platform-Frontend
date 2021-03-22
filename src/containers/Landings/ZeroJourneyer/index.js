import './Style.css';

import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import AuthDialog from '../../../components/Dialog/AuthDialog/AuthDialog';
import FAQ from '../../../components/SpecialComponents/Homepage/FAQ';
import Footer from '../../../components/SpecialComponents/Homepage/Footer';
import LandingOurTeam from '../../../components/SpecialComponents/Homepage/LandingOurTeam';
import WorkshopList from '../../../components/SpecialComponents/Homepage/WorkshopList';
import questions from './FAQs';
import workshops from './Workshops';

export const BOMB_HEIGHT = 500;

const useStyles = makeStyles((theme) => ({
  container: {
    background:
      'linear-gradient(90deg, rgba(6,11,13,1) 0%, rgba(0,16,22,1) 100%)',
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
    maxHeight: '25vh',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: -theme.spacing(12),
      maxHeight: '20vh',
    },
  },
  subtitle: {
    fontSize: 40,
    lineHeight: '40px',
    fontWeight: 600,
    color: '#dbd9d9',
    textShadow: '1px 1px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '20px',
    },
  },

  emptySection: {
    height: `${BOMB_HEIGHT + 100}vh`,
  },
  secondSection: {
    position: 'relative',
    height: '100vh',
    zIndex: 10,
  },
  secondSectionBackground: {
    position: 'absolute',
    // top: `${BOMB_HEIGHT + 100}vh`,
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${process.env.PUBLIC_URL}/ZeroJourneyer/background.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(1px)',
    webkitFilter: 'blur(1px)',
    zIndex: 10,
  },
  scrollIcon: {
    position: 'absolute',
    height: '30vh',
  },
  logo: {
    maxHeight: '95vh',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '50vh',
    },
    zIndex: 10,
  },
  eventDescriptionSection: {
    marginTop: -theme.spacing(1),
    position: 'relative',
    padding: theme.spacing(4, 2),
    backgroundColor: '#00869e',
    color: 'white',
    zIndex: 5,
  },
  RastaDescriptionSection: {
    position: 'relative',
    padding: theme.spacing(4, 2),
    backgroundColor: '#feceab',
    color: '#',
  },
  kaftar: {
    maxHeight: '30vh',
    maxWidth: '100%',
  },
  oldman: {
    maxHeight: '50vh',
    maxWidth: '100%',
  },
  moreButton: {
    margin: theme.spacing(2, 'auto', 0),
    textAlign: 'center',
    display: 'table',
  },
  workshopsSection: {
    position: 'relative',
    padding: theme.spacing(4, 2),
    backgroundColor: '#3f3f56',
    color: 'white',
  },
  FAQSection: {
    position: 'relative',
    padding: theme.spacing(4, 2),
    backgroundColor: '#7DC1D3',
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
  lastEmptySection: {
    height: '100vh',
  },
  h_iframe_aparat_embed_frame: {
    position: 'relative',
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
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
}));

const ZeroJourneyer = () => {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <div className={classes.container}>
      {/* <Grid container justify='center' alignItems='flex-end' className={classes.scrollIcon}>
        <Grid item>
          <img
            src={process.env.PUBLIC_URL + 'scroll.gif'}
            alt="scroll"
            style={{ width: 20 }}
          />
        </Grid>
      </Grid> */}

      {/* <Container className={classes.countDownSection}>
        <BombImage />
      </Container> */}

      {/* <Container className={classes.emptySection} /> */}

      <div className={classes.secondSectionBackground} />
      <Container className={classes.secondSection}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.fullHeight}>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            md={6}>
            <img
              className={classes.logo}
              src={process.env.PUBLIC_URL + '/ZeroJourneyer/logo.png'}
              alt=""
            />
          </Grid>
          <Grid
            direction="column"
            item
            container
            spacing={2}
            alignItems="center"
            justify="space-around"
            className={classes.titleHolder}
            xs={12}
            md={6}>
            <Grid item>
              <img
                src={process.env.PUBLIC_URL + '/ZeroJourneyer/titre.png'}
                className={classes.title}
                alt=""
              />
            </Grid>
            <Grid item>
              <Typography variant="h4" className={classes.subtitle}>
                زمان از نو، صفر می‌شود...
              </Typography>
            </Grid>
            <Grid item>
              <ButtonGroup size="large" variant="contained" color="primary">
                {/* <Button rel="noreferrer" target="_blank" href={process.env.PUBLIC_URL + '/ZeroJourneyer/Question.pdf'} >
                  دریافت سوالات
                </Button> */}
                <Button onClick={() => setAuthDialogOpen(true)}>ورود</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.eventDescriptionSection}>
        <Typography component="h2" variant="h2" gutterBottom>
          چه خبره؟
        </Typography>
        <Grid container justify="space-evenly" alignItems="center" spacing={4}>
          <Grid item container justify="center" spacing={2} xs={12} md={6}>
            <Grid item>
              <Typography variant="subtitle1">
                این رویداد داستانی رو براتون میگه که قراره توش با هم کارهای
                خارق‌العاده‌ای کنیم، در زمان سفر می‌کنیم و تلاش می‌کنیم شهرمون
                رو نجات بدیم.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                از ۲۸ اسفند تا ۶ فروردین یه پیش‌رویداد داریم که شما رو با محیط
                رویداد و سایت و همچنین فضای داستان آشنا می‌کنه و بعدش در ۷، ۸ و
                ۱۰ فروردین، داستان ما رو به کارگاه‌های علمی می‌بره که مشکلات
                سفرمون رو حل کنیم.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                البته در ۹ فروردین هم قراره یه کم استراحت کنیم و برنامه‌های مفرح
                داشته باشیم. روز آخر هم که وقت مسابقه و اختتامیه است.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {
                  'با ما باشید، دوستاتون رو خبر کنید و اگه سوالی داشتید، یکم پایین‌تر بخش «سوال‌های متداول» رو یه نگاهی بندازید یا به کانال رویداد در تلگرام سر بزنید: '
                }
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://t.me/rastaihaOnline"
                  className={classes.telegramLink}
                  style={{ direction: 'ltr', color: 'white' }}>
                  {'@RastaihaOnline'}
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7} md={5}>
            <div className={classes.h_iframe_aparat_embed_frame}>
              <span></span>
              <iframe
                title="رستاخیز: مسافر صفر"
                src="https://www.aparat.com/video/video/embed/videohash/5M9Sp/vt/frame"
                allowFullScreen
                webkitallowfullscreen="true"
                mozallowfullscreen="true"></iframe>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.RastaDescriptionSection}>
        <Typography component="h2" variant="h2" gutterBottom>
          رستا چیه؟
        </Typography>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item container justify="center" xs={12} sm={9} spacing={2}>
            <Grid item>
              <Typography variant="subtitle1">
                رستا جمعی علمی-ترویجی متشکل از دانشجوهای دانشگاه‌های صنعتی
                اصفهان، تهران، شریف، اصفهان، بهشتی و ... هست؛ جمعی که در تلاشه
                تا آموزش تعاملی رو جایگزین آموزش کنکوری و حفظی کنه و با اینکار،
                علاوه بر یاد دادن محتوای علمی به نحوه‌ای موثرتر، تفکر منطقی و
                خلاقیتِ بچه‌ها رو تقویت کنه و با نشون دادنِ توانمندی‌های
                بالقوه‌ی بچه‌ها به خودشون، اعتماد به نفسِ اونهارو افزایش بده.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3} container justify="center">
            <img
              className={classes.kaftar}
              src={process.env.PUBLIC_URL + '/originalLogo.png'}
              alt=""
            />
          </Grid>
        </Grid>
        <Button
          target="_blank"
          variant="contained"
          color="primary"
          className={classes.moreButton}
          href="https://rastaiha.ir">
          اطلاعات بیشتر
        </Button>
      </Container>

      <Container className={classes.workshopsSection}>
        <Typography component="h2" variant="h2" gutterBottom>
          کارگاه‌ها
        </Typography>
        <WorkshopList workshops={workshops} />
      </Container>

      <Container className={classes.FAQSection}>
        <Typography component="h2" variant="h2" gutterBottom align="center">
          پرسش‌های متداول
        </Typography>
        <Container>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <FAQ questions={questions} />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={4}
              justify="center"
              alignItems="center">
              <img
                className={classes.oldman}
                src={process.env.PUBLIC_URL + '/ZeroJourneyer/oldman.png'}
                alt=""
              />
            </Grid>
          </Grid>
        </Container>
      </Container>

      <LandingOurTeam />

      {/* <Container className={classes.lastEmptySection} /> */}

      <Footer />

      <AuthDialog
        open={authDialogOpen}
        handleClose={() => setAuthDialogOpen(false)}
      />
    </div>
  );
};

export default ZeroJourneyer;
