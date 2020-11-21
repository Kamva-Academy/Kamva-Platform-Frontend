/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import {
  Button,
  Fab,
  Grid,
  makeStyles,
  Typography,
  Divider,
  Paper,
  Hidden,
} from '@material-ui/core';
import Footer from '../components/Footer/Footer';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import {
  Assignment,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';
import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';
import CustomizedTimeline from '../components/TimeLine/TimeLine';
import FAQ from '../components/FAQ/FAQ';
import { logout } from '../redux/actions/account';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 70,
    lineHeight: '80px',
    color: '#37253f',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      lineHeight: '40px',
    },
  },

  subtitle: {
    fontSize: 30,
    // lineHeight: '40px',
    color: '#37253f',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      // marginBottom: theme.spacing(3),
    },
  },

  sectionTitle: {
    fontSize: 26,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },

  text: {
    textAlign: 'justify',
    textJustify: 'inter-word',
    paddingLeft: '20px',
  },

  divider: {
    boxShadow: '0px 1px 0px 1px #37253F',
    marginTop: '3vh',
    marginBottom: '3vh',
  },

  statImage: {
    background: `url(${process.env.PUBLIC_URL + '/stat.png'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },

  teamWorkImage: {
    background: `url(${process.env.PUBLIC_URL + '/team-work.png'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },

  section1: {
    height: '100vh',
    color: 'black',
    padding: theme.spacing(4, 3, 4),
  },

  // section1Grid: {
  //   height: '50vh',
  // },

  fullHeight: {
    height: '100%',
  },

  section2: {
    opacity: '1',
    boxShadow: '3px 3px 3px 3px black',
    color: '#f7f2f6',
    background: '#410066',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  section3: {
    opacity: '1',
    boxShadow: '3px 0px 3px 0px black',
    color: '#f7f2f6',
    background: '#673CC6',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  section4: {
    opacity: '1',
    background: '#7400B8',
    color: '#f7f2f6',
    boxShadow: '3px 0px 3px 0px black',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  section5: {
    opacity: '1',
    background: '#F0DBED',
    // color: '#f2f2f2',
    boxShadow: '3px 0px 3px 0px black',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  video: {
    width: '100%',
    borderRadius: 10,
    boxShadow: '3px 1px 3px 0px #111',
  },

  formPaper: {
    padding: theme.spacing(2),
    boxShadow: '1px 1px 1px 1px black',
  },

  supportAnnouncement: {
    position: 'sticky',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
  end: {
    fontSize: 60,
    color: 'white',
    textShadow: '2px 2px #333',
    lineHeight: '60px',
  },
  survey: {
    background: '#689F38',
    color: 'white',
    '&:hover': {
      color: '#689F38',
    },
  },
}));

function Homepage({ isLoggedIn, logout }) {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();

  return (
    <>
      <Container className={classes.section1}>
        <div id="back-to-top-anchor"></div>
        <div className="landing-background" />

        <Grid container direction="column" style={{ height: '100%' }}>
          {/* <Grid container item direction="row" style={{ height: '10%' }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAuthDialogOpen(true)}>
                ورود به مسابقه
              </Button>
            </Grid>
            {isLoggedIn && (
              <Grid item>
                <Button variant="outlined" onClick={() => logout()}>
                  خروج
                </Button>
              </Grid>
            )}
          </Grid> */}

          <Grid container item direction="row" style={{ height: '90%' }}>
            <Grid
              item
              container
              xs={12}
              sm={7}
              justify="center"
              alignItems="center"
              direction="column">
              <Grid item>
                <Typography
                  component="h1"
                  variant="h1"
                  className={classes.title}>
                  A-Lympiad
                </Typography>
                <Typography
                  component="h2"
                  variant="h3"
                  className={classes.subtitle}>
                  چهاردهمین دوره مسابقات
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              sm={5}
              justify="center"
              alignItems="center"
              direction="column"
              spacing={5}
              // style={{ overflowY: 'auto', height: '90%' }}
            >
              <Grid item>
                <Typography variant="h2" className={classes.end}>
                  پایان آزمون
                </Typography>
              </Grid>
              <Grid item>
                {isLoggedIn ? (
                  <Button
                    size="large"
                    variant="contained"
                    className={classes.survey}
                    startIcon={<Assignment />}
                    component="a"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfdRqjzxFBTpx9FjYP9UY4VwvaJZ-d8tqupWKOi1v3IG-qxJw/viewform?usp=sf_link"
                    target="_blank">
                    <Typography variant="h3">شرکت در نظرسنجی</Typography>
                  </Button>
                ) : (
                  <Button
                    size="large"
                    variant="contained"
                    className={classes.survey}
                    startIcon={<Assignment />}
                    component={Link}
                    to="/survey">
                    <Typography variant="h3">شرکت در نظرسنجی</Typography>
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section2} ${classes.centerItems}`}>
        <Grid
          container
          direction="row"
          spacing={4}
          alignItems="center"
          justify="center">
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="h2"
              className={classes.sectionTitle}>
              فیلم‌هایی که حتما باید ببینید!
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            sm={8}
            direction="row"
            justify="center"
            spacing={1}>
            <Grid item xs={10} sm={8}>
              <video
                controls
                src="https://res.cloudinary.com/derp8mdew/video/upload/v1605688659/a-lympiad/platform_yhxza6.mp4"
                className={classes.video}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <video
                controls
                src="https://res.cloudinary.com/derp8mdew/video/upload/v1605689080/a-lympiad/pdf_xkoa0q.mp4"
                className={classes.video}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section3} ${classes.centerItems}`}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography
              component="h2"
              variant="h2"
              className={classes.sectionTitle}>
              چرا ای‌لیمپیاد؟
            </Typography>
          </Grid>
          <Grid container item direction="row">
            <Grid container item direciton="column" xs={12} sm={6} spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  A-لیمپیاد با هدف افزایش قدرت تفکر، یادگیری تکنیک‌های مدل‌سازی
                  ریاضی، کارگروهی، تمرین نوشتن یافته‌های علمی و جمع‌بندی و ارائه
                  مطالب در هلند و تعدادی دیگر از کشورها برگزار می‌شود. «حل
                  مسئله» و «مدل‌سازی ریاضی» در محتوای درسی بسیاری از کشورها
                  آورده شده است. تمرین این مهارت‌ها معمولا به ندرت انجام می‌شود
                  زیرا کتاب‌هایی با مثال‌های خوب از مسایل مناسب کم‌تر یافت
                  می‌شوند و نیز معلمان برای تدریس این دروس مشکلات زیادی دارند،
                  A-لیمپیاد تلاش می‌کند بستری برای پرورش و ارتقاء این مهارت‌ها
                  ایجاد نماید.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  دانش‌آموزان در این مسابقه برای حل یک مسئله در زندگی واقعی تلاش
                  می‌کنند و در حقیقت مساله به کمک تکنیک‌های مختلف و فرضیات خود
                  دانش‌آموزان حل می‌شود. دانش‌آموزان بایستی صورت دقیق مسئله را
                  تفسیر کنند، استراتژی مناسبی برای حل بیابند، نتایج به دست آورده
                  را تحلیل کنند و نتایج نهایی را ارائه نمایند. نتیجه نهایی این
                  مسابقه گزارشی نوشته شده است که بایستی به روشنی فرضیات،
                  تحلیل‌ها و جمع‌بندی دانش‌آموزان را نشان دهد.
                </Typography>
              </Grid>
            </Grid>
            <Hidden xsDown="true">
              <Grid item sm={1} />
              <Grid item sm={5} className={classes.statImage}></Grid>
            </Hidden>
          </Grid>
          <Divider variant="middle" className={classes.divider} />
          <Grid container item direction="row">
            <Hidden xsDown="true">
              <Grid item sm={5} className={classes.teamWorkImage}></Grid>
              <Grid item sm={1} />
            </Hidden>
            <Grid container item direciton="column" xs={12} sm={6} spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  این آزمون در بیش از ۹۰ مدرسه در هلند و حدود ۱۷ کشور در دنیا با
                  محوریت موسسه فرودنتال، زیرمجموعه دانشگاه اترخت هلند در حال
                  برگزاری است و در پی پیمان همکاری این موسسه با خانه ریاضیات
                  اصفهان، این آزمون از سال ۱۳۸۶ تا کنون در ایران برگزار می‌گردد.
                  این آزمون ویژگی‌های خاصی دارد:{' '}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>آزمون به صورت گروهی انجام می‌شود.</li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    تیپ سوالات، عموما مسایل واقعی از هر جایی نظیر سازمان‌ها،
                    شرکت‌ها، مراکز پژوهشی و یا مشکلات عمومی یک جامعه است و
                    معمولا این سوال واقعا در جایی مطرح شده است.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    عموما برای ارایه حل برای مساله، یک مدل ریاضی ارائه می‌شود و
                    با یک ایده خاص روی آن بحث می‌شود.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    ایده‌های ارایه شده می‌توانند بسیار متنوع باشند و ممکن است هر
                    کدام مشکلاتی داشته باشند و هیچ‌کدام مساله را ۱۰۰ درصد حل
                    نکنند.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    عموما صورت مساله‌ها طولانی هستند و فرض‌های زیادی دارند و
                    ممکن است یک حل برای یک مساله، از همه فرض‌ها استفاده نکند.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    حل مساله‌ها نیز کوتاه نیست و عموما بحث‌های تحلیلی نیاز دارد
                    که از این باب، مهارت نوشتن -چه از نظر مهارت چیدمان مطالب و
                    چه از نظر نحوه استدلال- بسیار اهمیت داده می‌شود.{' '}
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    بعضی از مسایل صرفا مهارت خواندن موثر فرض‌های مساله و سپس
                    هم‌گردانی، استنتاج و تحلیل آن‌ها و ارایه یک خروجی تحلیل شده
                    را خواسته است.
                  </li>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section4} ${classes.centerItems}`}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography
              component="h2"
              variant="h2"
              className={classes.sectionTitle}>
              سوالات رایج
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FAQ />
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section5} ${classes.centerItems}`}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography
              component="h2"
              variant="h2"
              className={classes.sectionTitle}>
              حامیان
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <AuthDialog
        open={authDialogOpen}
        handleClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, { logout })(Homepage);
