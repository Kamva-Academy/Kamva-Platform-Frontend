import {
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import StatesTabbar from '../components/SpecialComponents/CorrectionPage/StatesTabbar';
import Widget, { MODES } from '../components/Widget';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  tabbar: {
    overflow: 'hidden',
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
}));

function Correction({ answers, fsmId }) {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);

  return (
    <>
      <ResponsiveAppBar mode="MENTOR_DASHBOARD" />
      <Container className={classes.container}>
        <Paper className={classes.tabbar}>
          <StatesTabbar value={tab} setValue={setTab} tabs={['salam']} />
        </Paper>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            {answers.map((widget) => (
              <Grid item key={widget.id} xs={12} sm={4} md={3}>
                <Paper className={classes.item}>
                  <Widget widget={widget} mode={MODES.CORRECTION} />
                  <Divider className={classes.divider} />
                  <TextField
                    className={classes.input}
                    label="نمره"
                    type="number"
                    inputProps={{
                      min: '0',
                      max: '100',
                      step: '1',
                      maxLength: '3',
                    }}
                  />

                  <TextField
                    className={classes.input}
                    label="توضیح"
                    type="text"
                    multiline
                    fullWidth
                    rows={3}
                    variant="outlined"
                  />
                  <Button variant="contained" color="primary" fullWidth>
                    ثبت
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  answers: [
    {
      id: 80,
      answer: {
        id: 418,
        answer_type: 'SmallAnswer',
        text: '؟',
        problem: 80,
      },
      priority: 0,
      widget_type: 'ProblemSmallAnswer',
      name: null,
      text:
        '<p>&nbsp;</p>\n<p><span style="font-weight: 400;">در روستایی 100 خانه وجود دارد که روی هر 3 خانه حداقل 2 انتن وجود دارد و روی هر دو انتن حداقل سه کلاغ وجود دارد. کم ترین تعداد ممکن کلاغ ها را بدست اورید.</span></p>\n<p>&nbsp;</p>',
      state: 27,
      last_submit: {
        id: 2846,
        answer_type: 'SmallAnswer',
        text: 'من اومدم امتحان کنم چندتا کلمه میتونیم بذار بیشتر؟',
        problem: null,
      },
    },
    {
      id: 128,
      choices: [
        {
          text: 'آقای صفروسی پور من صدای شما رو ندارم!',
        },
        {
          text: 'حمله مجدد دشمنان به ابرتارزان!',
        },
        {
          text: 'یه انفجار دیگه رخ داده و دوباره دارن ازمون پنهان می کنن.',
        },
        {
          text: 'بی رنج هستم و همه چی آرومه، دیدن نتایج.',
        },
      ],
      answer: {
        id: 862,
        answer_type: 'MultiChoiceAnswer',
        text: 0,
        problem: 128,
      },
      priority: 0,
      widget_type: 'ProblemMultiChoice',
      name: null,
      text:
        '<p>📣متاسفانه از ساعاتی پیش شاهد مسدود شدن شبکه های اجتماعی در پاراتاکانای بزرگ بوده&rlm;ایم، به نظر شما علت عدم دسترسی به شبکه اجتماعی Zero چیست؟</p>',
      state: 54,
      last_submit: {
        id: 2903,
        answer_type: 'MultiChoiceAnswer',
        text: 3,
        problem: null,
      },
    },
    {
      id: 86,
      answer: {
        id: 424,
        answer_type: 'BigAnswer',
        text: '<p>جوابت رو اینجا بنویس:</p>',
        problem: 86,
      },
      priority: 0,
      widget_type: 'ProblemBigAnswer',
      name: null,
      text:
        '<p>متن &laquo;خوابی که به ز بیداری&lrm;ست&raquo; را از شماره چهارم گاه&lrm;نامه نیم&lrm;خط بخوانید و با توجه به آن به این پرسش فکر کنید:<br />اگر می&lrm;خواستید در یک رویای شفاف با یکی از افکارتان به گفتگو بنشینید چه فکری را انتخاب می&lrm;کردید؟ چگونه با او صحبت می&lrm;کردید؟ درباره گفتگوی خود فکر کنید و برای ما در چند خط بنویسید.&nbsp;<br />توجه: این سوال پاسخ مشخصی ندارد و تمام جواب&lrm;ها درست است. بسته به خلاقیت و جذابیت نوشته&lrm;تان امتیاز بیشتری می&lrm;گیرید!</p>',
      state: 26,
      last_submit: {
        id: 502,
        answer_type: 'BigAnswer',
        text: '<p>تلابیس قفغعنتادلبیقفغ عنتاالبیقفغعن تپلبیثقفغال</p>',
        problem: null,
      },
    },
  ],
  fsmId: ownProps.match.params.fsmId,
});

export default connect(mapStateToProps)(Correction);
