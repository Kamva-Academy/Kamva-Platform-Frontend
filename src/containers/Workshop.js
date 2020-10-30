import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  Fab,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import Widget from '../components/Widget';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
  },
  title: {
    fontSize: 60,
    color: '#555',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
    },
  },
  body: {
    background: '#F7F9FC',
  },
  workshopContent: {
    paddingTop: 30,
  },
  paper: {
    padding: theme.spacing(0, 1),
    overflow: 'hidden',
  },
  mainItem: {
    margin: theme.spacing(1, 0),
  },
  item: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    background: '#fafafa',
  },
  actionPaper: {
    padding: theme.spacing(2, 1),
  },
}));

const Workshop = ({ questions, notQuestions, stateName }) => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.body}>
      <CssBaseline />
      <ResponsiveAppBar mode="WORKSHOP" />
      <Toolbar id="back-to-top-anchor" />
      <Grid
        container
        spacing={2}
        className={classes.workshopContent}
        justify="center">
        {notQuestions.length > 0 && (
          <Grid item xs={12} md={7} lg={7}>
            <Paper className={classes.paper}>
              {notQuestions.map((widget) => (
                <div className={classes.mainItem}>
                  <Widget widget={widget} />
                </div>
              ))}
            </Paper>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={notQuestions.length > 0 ? 4 : 6}
          lg={notQuestions.length > 0 ? 4 : 7}>
          <Paper className={clsx(classes.paper, classes.actionPaper)}>
            <Typography align="center" component="h2" variant="h3" gutterBottom>
              {stateName}
            </Typography>
            {questions.map((widget) => (
              <Paper className={classes.item}>
                <Widget widget={widget} />
              </Paper>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const widgets = [
    {
      type: 'SMALL_ANSWER_QUESTION',
      content: 'بزرگترین عدد کوچکتر از ۵ چند هستش؟',
    },
    {
      type: 'BIG_ANSWER_QUESTION',
      content:
        'با توجه به اطلاعات داده شده، توضیحی کلی در رابطه با جاذبه بنویسید.',
    },
    {
      type: 'UPLOAD_FILE_QUESTION',
      content: 'یک نقاشی بکشید و عکسشو برامون بفرستید.',
      lastFile: {
        src:
          'https://res.cloudinary.com/dclfeq8cv/image/upload//rastaiha/gravityImage.jpg',
        name: 'javab.png',
      },
    },
    {
      type: 'MULTI_CHOICE_QUESTION',
      content: 'جاذبه زمین چقدره؟',
      choices: [
        '۱۰ متر بر مجذور ثانیه',
        '۱ متر بر مجذور ثانیه',
        '۱۰۰ متر بر مجذور ثانیه',
        '۱۰۰۰ متر بر مجذور ثانیه',
      ],
    },
    {
      type: 'VIDEO',
      src:
        'https://res.cloudinary.com/dclfeq8cv/video/upload//rastaiha/gravity.mp4',
    },
    {
      type: 'TEXT',
      content: 'با سرچ تو اینترنت کلی اطلاعات دیگه می‌تونید پیدا کنید.',
    },
    {
      type: 'IMAGE',
      src:
        'https://res.cloudinary.com/dclfeq8cv/image/upload//rastaiha/gravityImage.jpg',
    },
  ];
  return {
    stateName: 'جاذبه‌ی عجیب',
    questions: widgets.filter((widget) => widget.type.includes('QUESTION')),
    notQuestions: widgets.filter((widget) => !widget.type.includes('QUESTION')),
  };
};

export default connect(mapStateToProps)(Workshop);
