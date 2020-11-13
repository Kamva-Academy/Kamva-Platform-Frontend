import React, { Component } from 'react';

import NavBar from '../components/NavBar/NavBar';
import { Grid, Header, Segment, Button, Icon } from 'semantic-ui-react';

import '../styles/landing.css';
import FAQ from '../components/FAQ/FAQ';
import { Link } from 'react-router-dom';
import TeamMember from '../components/Cards/TeamMember';
import Footer from '../components/footer/Footer';
import WorkshopCard from '../components/Cards/WorkshopCard';
import _ from 'lodash';
// import getLandinData from '../utils/getLandingData';
// import Timeline from '../components/Timeline/Timeline';
import { checkPayment, getUserInfo } from '../redux/actions/account';
import { connect } from 'react-redux';

class LandingPage extends Component {
  state = {};
  componentDidMount() {
    document.title = 'رستایی‌ها';
    getLandinData().then((response) => {
      this.setState({ ...response });
    });
    this.props.getUserInfo();
  }
  render() {
    let members = [];
    if (this.state.members && this.state.members.length > 0) {
      members = _.sampleSize(this.state.members, 4);
    }
    return (
      <>
        <div className="no-nav-back padded-nav">
          <NavBar
            config={{
              mode: 'landing',
            }}
          >
            <div className="landing-background"></div>
            <div className="landing-first">
              <div className="first-header">
                <div className="sun-pic animate__bounceIn">
                  <img src={process.env.PUBLIC_URL + '/sun2.png'} alt="sun" />
                </div>
                <div className="fruit-pic animate__bounceIn">
                  <img
                    src={process.env.PUBLIC_URL + '/fruit.png'}
                    alt="fruit"
                  />
                </div>
                <div className="animate__bounceIn">مدرسه تابستانه</div>
                {!this.props.isLoggedIn ? (
                  <div className="first-page-center-btns">
                    <div style={{ display: 'inline', position: 'relative' }}>
                      <span>
                        <Link to="#">ثبت‌نام</Link>
                      </span>
                      <div class="end-of-registration"> مهلت تمام شد!</div>
                    </div>

                    <span class="login-btn">
                      <a href="https://rastaakhiz.rastaiha.ir/">ورود به بازی</a>
                    </span>
                  </div>
                ) : (
                  ''
                )}

                <div className="scroll-pic">
                  <img
                    src={process.env.PUBLIC_URL + '/scroll.gif'}
                    alt="scroll"
                  />
                </div>
              </div>
              <div className="question-file-continer">
                <div className="arrow-right rotate-right arrow-pic">
                  <img
                    src={process.env.PUBLIC_URL + '/arrow-curve.png'}
                    alt="arrow"
                  />
                </div>
                <div className="arrow-left rotate-left arrow-pic">
                  <img
                    src={process.env.PUBLIC_URL + '/arrow-curve2.png'}
                    alt="arrow"
                  />
                </div>
                <Button
                  as={this.props.isLoggedIn ? 'a' : Link}
                  target={this.props.isLoggedIn ? 'blank' : null}
                  href={
                    this.props.isLoggedIn
                      ? 'https://docs.google.com/forms/d/e/1FAIpQLSfhh5HaHXPsXp6BXNSHUAKO12qpHVGUg8OQlOTfLHKO_nUjOg/viewform?usp=sf_link'
                      : null
                  }
                  to={this.props.isLoggedIn ? null : '/login'}
                  className="question-btn"
                >
                  <span>شرکت در نظرسنجی</span>

                  <Icon.Group>
                    <Icon name="file text" />
                    <Icon name="write" color="black" corner="top right" />
                  </Icon.Group>
                </Button>
                {this.props.isLoggedIn ? (
                  <div>
                    <Button
                      as={Link}
                      to="/selectWorkshop"
                      className="payment-btn"
                    >
                      <span>ورود به رویداد</span>
                    </Button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="first-footer-image">
                <img
                  src={process.env.PUBLIC_URL + '/students.png'}
                  alt="students"
                />
              </div>
            </div>
            <div className="second-page landing-back">
              <div className="container">
                <Grid reversed="computer">
                  <Grid.Row>
                    <Grid.Column computer={8} mobile={16}>
                      <div class="h_iframe-aparat_embed_frame">
                        <span
                          style={{ display: 'block', paddingTop: '57%' }}
                        ></span>
                        <iframe
                          src="https://www.aparat.com/video/video/embed/videohash/qriEx/vt/frame"
                          allowFullScreen="true"
                          webkitallowfullscreen="true"
                          mozallowfullscreen="true"
                        ></iframe>
                      </div>
                    </Grid.Column>

                    <Grid.Column computer={8} mobile={16}>
                      <Header as="h1" style={{ color: 'white' }}>
                        قضیه چیه؟
                      </Header>
                      <p style={{ fontSize: 16 }}>
                        تابستون هم که داره تموم میشه و حتی اینبار مدرسه‌ها دو
                        هفته زودتر قراره باز بشن.
                        <br />
                        با این وضع کرونا هم که نه تفریح درست و حسابی کردیم، نه
                        دوستامونو دیدیم، نه فعالیت گروهی نه هیچی.
                        <br />
                        اگر که موارد بالا در مورد شما هم صدق می‌کنه ما یه راه‌حل
                        خوب براتون داریم :)
                        <br />
                        به رسم هر ساله، جمع رستا امسال هم رویداد تابستانه خودش
                        رو برگزار می‌کنه؛ فقط امسال باتوجه به وضعیت اپیدمی
                        موجود، رویدادمون به صورت آنلاین خواهد بود.
                        <br />
                        تیم رستا در چند ماه گذشته تلاش بسیاری کرده تا در بستر
                        آنلاین بتونه همون تعامل بین شرکت‌کننده‌ها و منتورها رو
                        ایجاد کنه، البته اینبار از قابلیت‌های فضای آنلاین هم
                        برای آموزش هرچه موثرتر استفاده می‌کنیم.
                        <br />
                        خلاصه اگه دوست دارید با دوستاتون یه رویداد جذاب و باحال
                        رو این آخرای تابستون شرکت کنید و کلی هم مطالب خفن و خوب
                        یاد بگیرین، رویداد تابستانه رستا رو از دست ندید.
                        <br />
                        با ما باشید، دوستاتون رو خبر کنید و اگه سوالی هم داشتید
                        همین جا بپرسید یا به کانالمون در تلگرام سر بزنید:
                        <a
                          target="_blank"
                          href="https://t.me/rastaiha"
                          style={{
                            direction: 'ltr',
                            display: 'inline-block',
                            marginRight: '10px',
                            color: '#5555ff',
                          }}
                        >
                          @Rastaiha
                        </a>
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
              <Segment style={{ maxWidth: 700, margin: '10px auto' }}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={5} mobile={16}>
                      <img
                        style={{ display: 'block', margin: 'auto' }}
                        src={process.env.PUBLIC_URL + '/edu_student.png'}
                        alt="edu"
                      />
                    </Grid.Column>
                    <Grid.Column computer={11} mobile={16}>
                      <Header
                        as="h2"
                        textAlign="center"
                        style={{ marginTop: 10 }}
                      >
                        کارگاه مجازی
                      </Header>
                      <p style={{ color: 'black', fontSize: 18 }}>
                        امسال باتوجه به آنلاین بودن رویداد دو دسته کارگاه طراحی
                        کردیم. در دسته اول منتورها کنارتون حضور دارن و بهتون کمک
                        میکنن و در دسته دوم سعی کردیم یه سری کارگاه طراحی کنیم
                        که بدون حضور منتور و به صورت خودآموز و قدم‌به‌قدم، مطالب
                        رو به شما آموزش بدن.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment style={{ maxWidth: 700, margin: '10px auto' }}>
                <Grid reversed="computer">
                  <Grid.Row>
                    <Grid.Column computer={5} mobile={16}>
                      <img
                        style={{ display: 'block', margin: 'auto' }}
                        src={process.env.PUBLIC_URL + '/edu.png'}
                        alt="edu"
                      />
                    </Grid.Column>
                    <Grid.Column computer={11} mobile={16}>
                      <Header
                        as="h2"
                        textAlign="center"
                        style={{ marginTop: 10 }}
                      >
                        ارتباط با منتور
                      </Header>
                      <p style={{ color: 'black', fontSize: 18 }}>
                        بروبچه‌های تیم طراحی و منتورهای کارگاه، برای آموزش‌ هرچه
                        بهتر و کمک به شما در این روند، اینجا منتظرن تا هروقت
                        سوالی ازشون داشتید یا خواستید چیزی رو باهاشون مطرح کنید
                        کمکتون کنن.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment style={{ maxWidth: 700, margin: '10px auto' }}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={5} mobile={16}>
                      <img
                        style={{ display: 'block', margin: 'auto' }}
                        src={process.env.PUBLIC_URL + '/team_work.png'}
                        alt="edu"
                      />
                    </Grid.Column>
                    <Grid.Column computer={11} mobile={16}>
                      <Header
                        as="h2"
                        textAlign="center"
                        style={{ marginTop: 10 }}
                      >
                        کار گروهی
                      </Header>
                      <p style={{ color: 'black', fontSize: 18 }}>
                        در رستا، آموزش بر اساس تعامل در کار گروهی و کار بر
                        مسئله‌های چالش‌برانگیز، واقعی و نزدیک به دنیای فکری
                        مخاطبین است. هدف رستا از انتخاب آموزش مسئله و
                        تعامل‌محور، ایجاد خلاقیت و یادگیری عمیق دانش‌آموزان است.
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </div>
            <div className="second-2-page">
              <Timeline />
            </div>
            <div className="third-page">
              <div className="container">
                <Header as="h1" style={{ color: 'white' }}>
                  رستا چیه؟
                </Header>
                <p style={{ fontSize: 18 }}>
                  رستا جمعی علمی-ترویجی متشکل از دانشجوهای دانشگاه‌های صنعتی
                  اصفهان، تهران، شریف، اصفهان، بهشتی و ... هست؛
                  <br />
                  جمعی که در تلاشه تا آموزش تعاملی رو جایگزین آموزش کنکوری و
                  حفظی کنه و با اینکار، علاوه بر یاد دادن محتوای علمی به نحوه‌ای
                  موثرتر، تفکر منطقی و خلاقیتِ بچه‌ها رو تقویت کنه و با نشون
                  دادنِ توانمندی‌های بالقوه‌ی بچه‌ها به خودشون، اعتماد به نفسِ
                  اونهارو افزایش بده.
                </p>
                <Button
                  primary
                  style={{ margin: 'auto', display: 'table' }}
                  as={Link}
                  to="/about"
                >
                  اطلاعات بیشتر
                </Button>
              </div>
            </div>
            <div className="third-2-page workshops-list">
              <div className="container">
                <Header as="h1" textAlign="center">
                  کارگاه‌ها
                </Header>
                <div className="card-list">
                  {this.state.teams
                    ? Object.keys(this.state.teams)
                        .filter(
                          (team_id) => !!this.state.teams[team_id].workshops
                        )
                        .map((team_id) => (
                          <WorkshopCard {...this.state.teams[team_id]} />
                        ))
                    : ''}
                </div>
              </div>
            </div>
            <div className="fourth-page">
              <div className="container">
                <Header as="h1">سوالات متداول</Header>
                <FAQ additional={this.state.FAQs} />
              </div>
            </div>
            <div className="fifth-page">
              <div className="container">
                <Header as="h1" textAlign="center" style={{ color: 'white' }}>
                  تیم رویداد
                </Header>
                <div className="card-list">
                  {members.length > 0
                    ? members.map((member) => <TeamMember {...member} />)
                    : ''}
                </div>
                <Button
                  primary
                  style={{
                    margin: '30px auto',
                    padding: '13px 30px',
                    display: 'table',
                  }}
                  as={Link}
                  to="/team"
                >
                  مشاهده تیم رویداد
                </Button>
              </div>
            </div>
            <Footer />
          </NavBar>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, { checkPayment, getUserInfo })(
  LandingPage
);
