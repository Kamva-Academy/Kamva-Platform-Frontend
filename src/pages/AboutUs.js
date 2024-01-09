import { Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import Layout from 'components/template/GeneralLayout';

function AboutUs() {

  useEffect(() => {
    document.title = 'کاموا';
  }, [])

  return (
    <Layout appbarMode='DASHBOARD'>
      <Paper sx={{ padding: 2 }}>
        <Typography component="h2" variant="h3" gutterBottom>
          کاموا چیست؟
        </Typography>
        <Typography variant="subtitle1">
          کاموا بستری آنلاین جهت برگزاری رویدادها و کارگاه‌های تعاملی است که توسط جمع علمی-ترویجی رستا در دوران شیوع کرونا طراحی و پیاده‌سازی شده است.
        </Typography>
        <br />

        <Typography component="h2" variant="h3" gutterBottom>
          درباره‌ی ما
        </Typography>
        <Typography variant="subtitle1">
          جمعی از فارغ‌التحصیلان و دانشجویان خانه‌ی ریاضیات اصفهان با برگزاری
          رویداد مدرسه‌ی تابستانه‌ی علوم کامپیوتر در سال ۱۳۹۶، زمینه‌ی
          شکل‌گیری جمعی را فراهم کردند که اکنون پس از حدود پنج سال از تشکیل آن،
          با نام «جمع علمی-ترویجی رستا» یا به اختصار «رستا» شناخته می‌شود.
          فعالیت رستا تاکنون در حوزه‌ی آموزش پرورشی علوم کامپیوتر و ریاضی
          برای دانش آموزان دوره‌‌های متوسطه اول و دوم بوده است.
        </Typography>
        <br />
        <Typography variant="subtitle1">
          گروه ما با هدف کلی رشد و ارتقای جهان‌بینی، فهم و همچنین پایه‌
          ریزی زندگی بهتر و پویاتر برای دانش‌آموزان و دانشجویان کشور، نام
          «رستا» را که قریب به هدف پایانی بیان شده است و البته مبیّن خوبی
          برای کلیات اهداف و رویکرد گروه مذکور است، برای خود برگزید و با توجه
          به خاستگاه مذکور، در تابستان ۱۳۹۶ متشکل از دانشجویان رشته‌های علوم و
          مهندسی کامپیوتر، علوم ریاضی و فلسفه دانشگاه‌های برتر کشور نظیر صنعتی
          شریف، تهران، صنعتی اصفهان و ... تشکیل شد.
        </Typography>
        <br />
        <Typography variant="subtitle1">
          رستا هم‌اکنون داخل دانشگاه صنعتی شریف هم در قالب یک انجمن علمی با عنوان «انجمن علمی رستا» به ثبت رسیده است.
        </Typography>
        <br />

        <Typography component="h3" variant="h3" gutterBottom>
          رسالت و اهداف
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
        <br />

        <Typography component="h3" variant="h3" gutterBottom>
          فعالیت‌ها تاکنون
        </Typography>
        <Typography variant="subtitle1">
          گروه رستا در طول سه سال فعالیت رسمی خود رویدادهای مختلفی را در قالب
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
              اردوی زمستانه‌ی ریاضی‌ورزی، زمستان ٩٨، بوشهر، دانش‌آموزان دوره اول دبیرستان
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              رویداد-مسابقه‌ی آنلاین کابارآمادالاپسته، نوروز ۹۹، دانش‌آموزان دوره دوم دبیرستان
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              چهارمین مدرسه‌ی تابستانه‌ی رستا (رویداد آنلاین)، شهریور ۹۹، دانش‌آموزان دوره دوم دبیرستان
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              رویداد آنلاین رستاخیز: مسافر صفر، نوروز ۱۴۰۰، دانش‌آموزان دوره دوم دبیرستان
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              رویداد آنلاین مدرسه‌ی تابستانه ۱۴۰۰، ویژه‌ی دانش‌آموزان دوره‌ی دوم دبیرستان
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              رویدادهای حضوری و مجازی مدرسه‌ی تابستانه ۱۴۰۱، با همکاری سازمان ملی پرورش استعدادهای درخشان و دانشگاه صنعتی شریف، ویژه‌ی دانش‌آموزان دوره‌ی دوم دبیرستان
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              اردومسابقه‌ی ریاضی‌گردی، زمستان ۱۴۰۱، عباس‌آباد مازندران،
              دانش‌آموزان هفتم تا دهم
            </Typography>
          </li>
        </ul>
        <br />

        <Typography component="h3" variant="h3" gutterBottom>
          ارتباط با ما
        </Typography>
        <Typography variant="subtitle1">
          برای ارتباط با گروه رستا جهت برگزاری رویداد یا جهت ارائه‌ی پیشنهادات و انتقادات، می‌توانید از راه‌های زیر با ما در ارتباط باشید:
        </Typography>
        <ul>
          <li>
            <Typography variant="subtitle1">
              سایت: <a href='//rastaiha.ir'>rastaiha.ir</a>
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              ایمیل: info@rastaiha.ir
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              تلگرام: <a href='//t.me/rastaiha_info'>@Rastaiha_Info</a>
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              اینستاگرام: <a href='//instagram.com/rastaiha'>@Rastaiha</a>
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              شماره‌ی تماس: ۰۹۳۶۳۳۰۲۷۳۸
            </Typography>
          </li>
        </ul>
      </Paper>
    </Layout >
  );
}

export default AboutUs;