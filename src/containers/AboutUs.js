import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <>
      <ResponsiveAppBar mode="LANDING" />
      <Container maxWidth="sm" style={{ marginTop: 80 }}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h2" gutterBottom>
            درباره‌ی ما
          </Typography>
          <Typography variant="subtitle1">
            جمعی از فارغ‌التحصیلان و دانشجویان خانه‌ی ریاضیات اصفهان با برگزاری
            رویداد مدرسه‌ی تابستانه‌ی علوم کامپیوتر در سال ۱۳۹۶، زمینه‌ی
            شکل‌گیری جمعی را فراهم کردند که اکنون پس از حدود سه سال از تشکیل آن،
            با نام «جمع علمی-ترویجی رستا» یا به اختصار «رستا» شناخته می‌شود.
            فعالیت رستا تاکنون در حوزه‌ی آموزشِ پرورشیِ علوم کامپیوتر و ریاضی
            برای دانش آموزان دوره‌‌های متوسطه اول و دوم بوده است.
          </Typography>
          <Typography component="h3" variant="h3" gutterBottom>
            رسالت و اهداف رستا
          </Typography>
          <Typography variant="subtitle1">
            رسالت رستا؛ تلاش جهت تحقق «پرورش در دل آموزش صحیح» است.
          </Typography>
          <Typography variant="subtitle1">
            فعالیت‌هایی که در راستای اهداف زیر باشند توسط رستا برنامه‌ریزی،
            اجرا، ارزیابی و حمایت می‌شوند:
          </Typography>
          <ul>
            <li>
              <Typography variant="subtitle1">
                آموزش علم انسان‌ساز ایجاد بسترهای مناسب برای بروز علم (اعم از
                مهارت‌، حل مسائل واقعی و…)
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                پژوهش معطوف به آموزش و روش‌های آموزشی
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">گسترش عدالت آموزشی</Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                شناساندن و ترویج رسالت رستا (گسترش جغرافیایی)
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                ایجاد و افزایش مشارکت و دغدغه نسبت به رسالت رستا
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                رشد اعضا در ابعادی که با فعالیت‌های رستا مرتبط‌اند.
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                ارتباط‌گیری، همکاری و حمایت از افراد، نهادها و گروه‌های دیگری که
                در راستای رسالت رستا فعالیت می‌کنند.
              </Typography>
            </li>
          </ul>
          <Typography component="h3" variant="h3" gutterBottom>
            فعالیت‌های رستا تاکنون
          </Typography>
          <Typography variant="subtitle1">
            تیمِ ما با هدف کلیِ رشد و ارتقاءِ جهان‌بینی، فهم و همچنین پایه‌
            ریزیِ زندگیِ بهتر و پویاتر برای دانش‌آموزان و دانشجویانِ کشور، نام
            «رستا» را که قریب به هدف پایانیِ بیان شده است و البته مبیّن خوبی
            برای کلیات اهداف و رویکرد تیم مذکور است، برای خود برگزید و با توجه
            به خاستگاه مذکور، در تابستان ۱۳۹۶ متشکل از دانشجویان رشته‌های علوم و
            مهندسی کامپیوتر، علوم ریاضی و فلسفه دانشگاه‌های برتر کشور نظیر صنعتی
            شریف، تهران، صنعتی اصفهان و ... تشکیل شد.
          </Typography>
          <Typography variant="subtitle1">
            تیم رستا در طول سه سال فعالیت رسمی خود رویدادهای مختلفی را در قالب
            مدارس تابستانه و زمستانه و اردوهای ریاضی‌ورزی در شهرهای مختلف کشور
            برگزار کرده است. رویداد‌های برگزار شده توسط رستا به شرح زیر است:
          </Typography>
          <ul>
            <li>
              <Typography variant="subtitle1">
                اولین دوره‌ی مدرسه تابستانه علوم کامپیوتر، تابستان ۹۶، اصفهان،
                دانش آموزان دوره دوم دبیرستان
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                دومین دوره‌ی مدارس کشوری تابستانه علوم کامپیوتر، تابستان ۹۷،
                اصفهان و تهران، دانش آموزان دوره دوم دبیرستان
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                سومین دوره‌ی مدارس کشوری تابستانه علوم کامپیوتر، تابستان ۹٨،
                اصفهان و تهران، دانش آموزان دوره دوم دبیرستان
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                اردوی زمستانه‌ی ریاضی‌ورزی ٩٧، زمستان ۹۷، سراوان سیستان و
                بلوچستان، دانش‌آموزان دوره اول دبیرستان
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                اردومسابقه‌ی ریاضی‌گردی، پاییز ٩٨، عباس‌آباد مازندران،
                دانش‌آموزان ششم تا دهمی
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">
                اردوی زمستانه‌ی ریاضی‌ورزی ٩٨، زمستان ٩٨، بوشهر، دانش‌آموزان
                دوره‌ی اول رویداد-مسابقه آنلاین <b>کابارآمادالاپسته</b> فروردین
                ١٣٩٩
              </Typography>
            </li>
          </ul>
        </Paper>
      </Container>
    </>
  );
}

export default AboutUs;
