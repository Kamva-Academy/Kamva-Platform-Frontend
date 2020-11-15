import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  Button,
  Fab,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
  Paper,
} from '@material-ui/core';
import Footer from '../components/Footer/Footer'
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';
import CustomizedTimeline from '../components/TimeLine/TimeLine'
import FAQ from '../components/FAQ/FAQ';
import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';


const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 60,
    lineHeight: '80px',
    color: '#555',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      lineHeight: '40px',
    },
  },

  subtitle: {
    fontSize: 30,
    // lineHeight: '40px',
    color: '#555',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      // marginBottom: theme.spacing(3),
    },
  },

  text: {
    textAlign: 'justify',
    textJustify: 'inter-word',
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

  img: {
    maxWidth: '80%',
    height: 'auto',
  },

  section1: {
    height: '100vh',
    color: 'black',
    paddingTop: '50px',
    paddingBottom: '50px',
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
    boxShadow: '3px 3px 3px 3px black',
    background: '#5390D9',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  section4: {
    opacity: '1',
    background: '#7400B8',
    boxShadow: '3px 3px 3px 3px black',
    paddingTop: '30px',
    paddingBottom: '30px',
  },


  firstPageImage: {
    width: '100%',
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
  },
}));

export default function Homepage() {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <Container className={`${classes.section1} ${classes.centerItems}`} >
        <CssBaseline />
        <Toolbar id="back-to-top-anchor" />
        <div className='landing-background' />
        <Grid
          container
          spacing={2}
          justify='center'
          direction='row'
          alignItems='center'>

          <Grid item xs={12} sm={8} md={6} justify='center' />

          <Grid
            container
            item
            xs={12}
            sm={8}
            md={6}
            justify="center"
            alignItems="center"
            direction="column"
            spacing={4}>

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
                چهاردمین دوره مسابقات
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setAuthDialogOpen(true)}>
                <Typography component="span" variant="h3">
                  بزن بریم!
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section2} ${classes.centerItems}`} >
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Typography
              component="h2"
              variant="h2">
              ای‌لیمپیاد؟
            </Typography>
          </Grid>
          <Grid container item direction='row'>
            <Grid container item direciton='column' xs={12} sm={6} spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  امروزه مدل‌سازی ریاضی به عنوان ابزاری قوی در رشته‌های مختلف مورد استفاده قرار می‌گیرد. به همین منظور آموزش این شاخه از ریاضیات به دانش‌آموزان در دستور کار بسیاری از نظام‌های آموزشی قرار گرفته است. هرساله چندین مسابقه مدل‌سازی ریاضی در سراسر دنیا برای گروه‌های سنی مختلف برگزار می‌شود. یکی از این مسابقات، A-لیمپیاد است که با هدف افزایش قدرت تفکر، یادگیری تکنیک‌های مدل‌سازی ریاضی، کارگروهی، تمرین نوشتن یافته‌های علمی و جمع‌بندی و ارائه مطالب، در هلند و تعدادی دیگر از کشورها برگزار می‌شود.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  دانش‌آموزان در این مسابقه برای حل یک مسئله در زندگی واقعی تلاش می‌کنند و در حقیقت مساله به کمک تکنیک‌های مختلف و فرضیات خود دانش‌آموزان حل می‌شود. دانش‌آموزان بایستی صورت دقیق مسئله را تفسیر کنند، استراتژی مناسبی برای حل بیابند، نتایج به دست آورده را تحلیل کنند و نتایج نهایی را ارائه نمایند. نتیجه نهایی این مسابقه گزارشی نوشته شده است که بایستی به روشنی فرضیات، تحلیل‌ها و جمع‌بندی دانش‌آموزان را نشان دهد.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.statImage} ></Grid>
          </Grid>
          <Grid container item direction='row'>
            <Grid item xs={12} sm={6} className={classes.teamWorkImage} ></Grid>
            <Grid container item direciton='column' xs={12} sm={6} spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  این آزمون در بیش از ۹۰ مدرسه در هلند و حدود ۱۷ کشور در دنیا با محوریت موسسه فرودنتال، زیرمجموعه دانشگاه اترخت هلند در حال برگزاری است و در پی پیمان همکاری این موسسه با خانه ریاضیات اصفهان، این آزمون از سال ۱۳۸۶ تا کنون در ایران برگزار می‌گردد. این آزمون ویژگی‌های خاصی دارد:                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    آزمون به صورت گروهی انجام می‌شود.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    تیپ سوالات، عموما مسایل واقعی از هر جایی نظیر سازمان‌ها، شرکت‌ها، مراکز پژوهشی و یا مشکلات عمومی یک جامعه است و معمولا این سوال واقعا در جایی مطرح شده است.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    عموما برای ارایه حل برای مساله، یک مدل ریاضی ارائه می‌شود و با یک ایده خاص روی آن بحث می‌شود.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    ایده‌های ارایه شده می‌توانند بسیار متنوع باشند و ممکن است هر کدام مشکلاتی داشته باشند و هیچ‌کدام مساله را ۱۰۰ درصد حل نکنند.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    عموما صورت مساله‌ها طولانی هستند و فرض‌های زیادی دارند و ممکن است یک حل برای یک مساله، از همه فرض‌ها استفاده نکند.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    حل مساله‌ها نیز کوتاه نیست و عموما بحث‌های تحلیلی نیاز دارد که از این باب، مهارت نوشتن -چه از نظر مهارت چیدمان مطالب و چه از نظر نحوه استدلال- بسیار اهمیت داده می‌شود.                    </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    بعضی از مسایل صرفا مهارت خواندن موثر فرض‌های مساله و سپس هم‌گردانی، استنتاج و تحلیل آن‌ها و ارایه یک خروجی تحلیل شده را خواسته است.
                  </li>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section3} ${classes.centerItems}`} >
        <Grid container direction='column'>
          <Grid item>
            <Typography
              component="h2"
              variant="h2">
              زمان‌بندی
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomizedTimeline />
          </Grid>
        </Grid>
      </Container>


      <Container className={`${classes.section4} ${classes.centerItems}`} >
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Typography
              component="h2"
              variant="h2">
              سوالات رایج
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FAQ />
          </Grid>
        </Grid>
      </Container>

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      {/* <Toolbar id="back-to-top-anchor" /> */}
      <Footer />
      <AuthDialog
        open={authDialogOpen}
        handelClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}
