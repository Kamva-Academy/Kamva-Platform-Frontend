import { Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {
  FilterNone as FilterNoneIcon,
  Telegram as TelegramIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
} from '@material-ui/icons';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import ArticleCard2 from '../components/Cards/ArticleCard2';
import Widget from '../components/Widget';
import { getArticleAction } from '../redux/slices/mentor';
import { articleData } from './Landings/PhysicsDay';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    overflow: 'hidden',
  },
  body: {
    background: '#fff',
    paddingTop: theme.spacing(1),
    height: '100vh',
  },
  smFullHeight: {
    [theme.breakpoints.up('sm')]: {
      height: '100%',
    },
  },
  mainPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
  },
  workshopTabsPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
    height: '100%',
  },
}));

const Article = ({ article = {}, articleId, getArticle }) => {
  const history = useHistory();

  const widgets = [...article.widgets];

  widgets.sort((a, b) => a.id - b.id);

  useEffect(() => {
    if (articleId) {
      getArticle({ id: articleId });
    } else {
      history.push('/');
    }
  }, [getArticle, articleId, history]);

  const classes = useStyles();

  return (
    <Container component="main" className={classes.body}>
      <ResponsiveAppBar mode="ARTICLE" />
      {article && (
        <Grid
          container
          justify="center"
          direction="row-reverse"
          spacing={2}
          style={{ marginTop: 70 }}>
          <Grid item xs={12} md={4}>
            <ArticleCard2 {...articleData[articleId]} withoutButton />
            <Grid
              container
              justify="center"
              alignItems="center"
              spacing={1}
              style={{ marginTop: 20 }}>
              <Grid item xs={2}>
                <IconButton
                  component="a"
                  target="_blank"
                  href={`https://telegram.me/share/url?url=${
                    window.location.href
                  }&text=${encodeURIComponent(articleData[articleId].name)}`}>
                  <TelegramIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  component="a"
                  target="_blank"
                  href={`https://twitter.com/share?url=${
                    window.location.href
                  }&text=${encodeURIComponent(articleData[articleId].name)}`}>
                  <TwitterIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  component="a"
                  target="_blank"
                  href={
                    'whatsapp://send?text=' +
                    encodeURIComponent(
                      articleData[articleId].name + ':\n' + window.location.href
                    )
                  }>
                  <WhatsAppIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }>
                  <FilterNoneIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.mainPaper}>
              {widgets.map((widget) => (
                <Widget key={widget.id} widget={widget} />
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: state.mentor.articles.find(
    (article) => +article.id === +ownProps.match.params.articleId
  ),
  articleId: ownProps.match.params.articleId,
});

export default connect(mapStateToProps, { getArticle: getArticleAction })(
  Article
);
